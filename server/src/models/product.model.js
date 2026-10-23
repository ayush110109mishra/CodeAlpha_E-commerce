import mongoose from 'mongoose'

/**
 * Forma Product Schema
 * 
 * Based directly on the frontend product schema in src/data/products.js.
 * Preserves all fields actively used by the catalogue, product detail, and cart pages.
 */
const productSchema = new mongoose.Schema(
  {
    // Custom stable identifier (e.g. 'forma-01')
    id: {
      type: String,
      required: [true, 'Product ID is required'],
      unique: true,
      trim: true,
      index: true
    },

    // URL-friendly slug (e.g. 'komorebi-mechanical-keyboard')
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },

    // Product Title
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },

    // Short descriptive subtitle
    tagline: {
      type: String,
      trim: true,
      default: ''
    },

    // Retail Department / Category
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
      index: true
    },

    // Numeric price in Indian Rupees (INR)
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be a positive number']
    },

    // Optional original price before discount (INR)
    originalPrice: {
      type: Number,
      default: null
    },

    // High-resolution image URL
    image: {
      type: String,
      required: [true, 'Product image URL is required'],
      trim: true
    },

    // Detailed product overview
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true
    },

    // Array of key product features
    features: {
      type: [String],
      default: []
    },

    // Key-value specifications map (e.g. Dimensions, Weight, Battery, Finish)
    specs: {
      type: Map,
      of: String,
      default: {}
    },

    // Flag for homepage featured showcase
    featured: {
      type: Boolean,
      default: false,
      index: true
    },

    // Stock availability flag
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    toJSON: {
      // Clean up MongoDB internal fields when converting to JSON
      transform: (doc, ret) => {
        delete ret.__v
        return ret
      }
    }
  }
)

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
