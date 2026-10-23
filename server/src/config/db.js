import mongoose from 'mongoose'

/**
 * Utility to safely mask database credentials in connection strings before logging
 */
export const maskMongoURI = (uri) => {
  if (!uri || typeof uri !== 'string') return ''
  return uri.replace(/(\/\/[^:]+:)(?:[^@]+)(@)/, '$1****$2')
}

/**
 * Safely sanitizes MongoDB connection string:
 * - Trims leading/trailing whitespace and newlines
 * - Strips wrapping quotes ("" or '')
 * - Safely encodes reserved password characters (e.g. @, #, %, :) if not already encoded
 * - Ensures authSource=admin is present for Atlas SCRAM authentication
 */
export const sanitizeMongoURI = (rawUri) => {
  if (!rawUri || typeof rawUri !== 'string') return ''

  let uri = rawUri.trim()

  // Strip wrapping single or double quotes
  if (
    (uri.startsWith('"') && uri.endsWith('"')) ||
    (uri.startsWith("'") && uri.endsWith("'"))
  ) {
    uri = uri.slice(1, -1).trim()
  }

  // Parse protocol
  const protoMatch = uri.match(/^(mongodb(?:\+srv)?):\/\//i)
  if (!protoMatch) return uri

  const proto = protoMatch[1].toLowerCase()
  const rest = uri.slice(protoMatch[0].length)

  // Find the LAST '@' before the path/query to separate credentials from hosts
  const slashIdx = rest.indexOf('/')
  const questionIdx = rest.indexOf('?')
  const hostEndCandidates = [slashIdx, questionIdx].filter((idx) => idx !== -1)
  const hostEndIdx = hostEndCandidates.length > 0 ? Math.min(...hostEndCandidates) : rest.length

  const hostSection = rest.slice(0, hostEndIdx)
  const pathSection = rest.slice(hostEndIdx)

  const lastAtIdx = hostSection.lastIndexOf('@')
  if (lastAtIdx === -1) {
    return `${proto}://${rest}`
  }

  const userPassSection = hostSection.slice(0, lastAtIdx)
  const hosts = hostSection.slice(lastAtIdx + 1)

  const firstColonIdx = userPassSection.indexOf(':')
  if (firstColonIdx === -1) {
    return `${proto}://${rest}`
  }

  const rawUser = userPassSection.slice(0, firstColonIdx)
  const rawPass = userPassSection.slice(firstColonIdx + 1)

  // Decode first in case user partially encoded, then re-encode reserved characters
  let safeUser = rawUser
  let safePass = rawPass
  try {
    safeUser = encodeURIComponent(decodeURIComponent(rawUser))
    safePass = encodeURIComponent(decodeURIComponent(rawPass))
  } catch {
    // If decoding throws (malformed percent encoding), keep raw
    safeUser = encodeURIComponent(rawUser)
    safePass = encodeURIComponent(rawPass)
  }

  // Ensure authSource=admin is present for MongoDB Atlas users
  let finalPath = pathSection
  if (!finalPath.includes('authSource=')) {
    if (!finalPath || finalPath === '/') {
      finalPath = '/?authSource=admin'
    } else if (finalPath.includes('?')) {
      finalPath = `${finalPath}&authSource=admin`
    } else {
      finalPath = `${finalPath}?authSource=admin`
    }
  }

  return `${proto}://${safeUser}:${safePass}@${hosts}${finalPath}`
}

// Track if event listeners have been attached once to prevent duplicates
let listenersAttached = false

const setupConnectionListeners = () => {
  if (listenersAttached) return
  listenersAttached = true

  mongoose.connection.on('connected', () => {
    console.log(`✅ [Database]: MongoDB connection established: ${mongoose.connection.host}/${mongoose.connection.name}`)
  })

  mongoose.connection.on('disconnected', () => {
    console.warn(`⚠️  [Database]: MongoDB disconnected from cluster.`)
  })

  mongoose.connection.on('reconnected', () => {
    console.log(`🔄 [Database]: MongoDB reconnected successfully.`)
  })

  mongoose.connection.on('error', (err) => {
    console.error(`❌ [Database Error]: Connection event error: ${err.message}`)
  })
}

let activeConnectionPromise = null

/**
 * Reusable MongoDB Connection Module using Mongoose
 * 
 * Safely handles connection attempts, credentials masking,
 * lifecycle event logging, and reports status without leaking secrets.
 */
export const connectDB = async () => {
  const rawUri = process.env.MONGODB_URI

  // Check if URI is missing or still contains default unconfigured placeholders
  if (!rawUri || rawUri.includes('<username>') || rawUri.includes('<password>')) {
    console.warn('\n⚠️  [Database]: MONGODB_URI is not configured in environment variables.')
    console.warn('👉  Please provide your MongoDB Atlas connection string in MONGODB_URI')
    console.warn('ℹ️   Server will continue running for health-check and non-database routes.\n')
    return false
  }

  const uri = sanitizeMongoURI(rawUri)

  setupConnectionListeners()

  try {
    const masked = maskMongoURI(uri)
    console.log(`📡 [Database]: Connecting to MongoDB (${masked})...`)

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    })

    console.log(`✅ [Database]: MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}\n`)
    return true
  } catch (error) {
    console.error(`❌ [Database Error]: Could not connect to MongoDB: ${error.message}\n`)

    const errMsg = error.message ? error.message.toLowerCase() : ''

    if (errMsg.includes('bad auth') || errMsg.includes('authentication failed')) {
      console.error(`🔒 [Atlas Authentication Failed]: MongoDB Atlas rejected credentials (bad auth).`)
      console.error(`👉 Troubleshooting steps for Render:`)
      console.error(`   1. Verify database username and password in MongoDB Atlas -> Security -> Database Access.`)
      console.error(`   2. In Render Dashboard -> Environment -> MONGODB_URI: ensure the password matches Atlas.`)
      console.error(`   3. If the password has special characters, our URI sanitizer has encoded it. Ensure no extra quotes or spaces were pasted.`)
      console.error(`   4. Verify authSource=admin is included in the query string.\n`)
    } else if (
      errMsg.includes('80') ||
      errMsg.includes('tlsv1 alert') ||
      error.name === 'MongooseServerSelectionError'
    ) {
      console.warn(`🔒 [Atlas Network Access]: MongoDB Atlas rejected the TLS connection (SSL Alert 80).`)
      console.warn(`👉 This typically indicates the client IP is not whitelisted in Atlas Network Access.`)
      console.warn(`👉 To resolve: In MongoDB Atlas Dashboard -> Network Access -> Add IP Address.\n`)
    }

    return false
  }
}

/**
 * Ensures MongoDB is connected, attempting reconnect if disconnected.
 * Prevents redundant concurrent connection attempts.
 */
export const ensureDatabaseConnected = async () => {
  if (mongoose.connection.readyState === 1) {
    return true
  }

  if (activeConnectionPromise) {
    return activeConnectionPromise
  }

  activeConnectionPromise = connectDB().finally(() => {
    activeConnectionPromise = null
  })

  return activeConnectionPromise
}

/**
 * Helper to return accurate, live database connection status for health check
 */
export const getDatabaseStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }
  return states[mongoose.connection.readyState] || 'unknown'
}
