import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { Product } from '../models/product.model.js'
import { PRODUCTS_SEED_DATA } from '../data/products.seed.js'

// Load environment variables from server/.env
dotenv.config()

/**
 * Forma Database Seeding Script
 * 
 * Safely seeds the 16 core catalogue products into MongoDB.
 * Uses upsert (findOneAndUpdate by slug) to prevent duplicates
 * and preserve unrelated database collections.
 */
const seedProducts = async () => {
  console.log(`\n=================================================`)
  console.log(`🌱 Forma Database Seed Script`)
  console.log(`=================================================`)

  // 1. Check MONGODB_URI
  const uri = process.env.MONGODB_URI
  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.error(`\n❌ Error: Valid MONGODB_URI not found in server/.env.`)
    console.error(`👉 Set a valid MongoDB Atlas connection string in server/.env, for example:`)
    console.error(`   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/forma?retryWrites=true&w=majority\n`)
    process.exit(1)
  }

  // 2. Connect to MongoDB
  const connected = await connectDB()
  if (!connected) {
    console.error(`\n❌ Failed to establish connection to MongoDB. Seeding aborted.`)
    process.exit(1)
  }

  try {
    console.log(`📦 Processing ${PRODUCTS_SEED_DATA.length} products for database upsert...`)

    let insertedOrUpdated = 0
    for (const item of PRODUCTS_SEED_DATA) {
      await Product.findOneAndUpdate(
        { slug: item.slug }, // Identify record by unique slug
        item,                // Update with source of truth data
        {
          upsert: true,       // Insert if not present, update if already exists
          new: true,
          runValidators: true // Enforce schema rules
        }
      )
      insertedOrUpdated++
    }

    // Verify total count in database
    const totalCount = await Product.countDocuments()
    console.log(`\n✅ Seeding complete!`)
    console.log(`📊 Products processed: ${insertedOrUpdated}`)
    console.log(`🔢 Total products in database: ${totalCount}`)

    // Inspect one sample product from the database
    const sampleProduct = await Product.findOne().select('id slug name category price inStock')
    if (sampleProduct) {
      console.log(`\n🔎 Sample Document from MongoDB:`)
      console.log(`   ID:       ${sampleProduct.id}`)
      console.log(`   Name:     ${sampleProduct.name}`)
      console.log(`   Category: ${sampleProduct.category}`)
      console.log(`   Price:    ₹${sampleProduct.price}`)
      console.log(`   Slug:     ${sampleProduct.slug}`)
      console.log(`   In Stock: ${sampleProduct.inStock}`)
    }

    console.log(`\n=================================================\n`)
  } catch (error) {
    console.error(`\n❌ Seeding error:`, error.message)
    process.exitCode = 1
  } finally {
    // Cleanly close connection when script finishes
    await mongoose.connection.close()
    console.log(`🔒 MongoDB connection closed.`)
  }
}

seedProducts()
