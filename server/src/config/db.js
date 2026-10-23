import mongoose from 'mongoose'

/**
 * Utility to safely mask database credentials in connection strings before logging
 */
export const maskMongoURI = (uri) => {
  if (!uri) return ''
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')
}

/**
 * Reusable MongoDB Connection Module using Mongoose
 * 
 * Safely handles connection attempts, credentials masking,
 * and reports status without leaking secrets.
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

  try {
    const masked = maskMongoURI(uri)
    console.log(`📡 [Database]: Connecting to MongoDB (${masked})...`)

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5-second timeout to prevent hanging if host is unreachable
    })

    console.log(`✅ [Database]: MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}\n`)
    return true
  } catch (error) {
    console.error(`❌ [Database Error]: Could not connect to MongoDB: ${error.message}\n`)
    return false
  }
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
