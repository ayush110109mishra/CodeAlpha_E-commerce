import mongoose from 'mongoose'

/**
 * Utility to safely mask database credentials in connection strings before logging
 */
export const maskMongoURI = (uri) => {
  if (!uri) return ''
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')
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
  const uri = process.env.MONGODB_URI

  // Check if URI is missing or still contains default unconfigured placeholders
  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn('\n⚠️  [Database]: MONGODB_URI is not configured in server/.env.')
    console.warn('👉  Please provide your MongoDB Atlas connection string in server/.env')
    console.warn('ℹ️   Server will continue running for health-check and non-database routes.\n')
    return false
  }

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

    if (
      error.message?.includes('80') ||
      error.message?.includes('tlsv1 alert') ||
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
