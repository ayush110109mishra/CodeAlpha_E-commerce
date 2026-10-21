/**
 * Forma — Product Catalogue
 * Centralized dataset representing modern everyday essentials, tech accessories & lifestyle goods.
 * All prices denominated in Indian Rupees (INR) for India-ready storefront.
 */

export const CATEGORIES = [
  'All',
  'Tech & Audio',
  'Bags & Accessories',
  'Home Essentials'
]

export const CATEGORY_METADATA = [
  {
    name: 'Tech & Audio',
    tagline: 'Keyboards, desk accessories, headphones & audio gear',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Bags & Accessories',
    tagline: 'Laptop sleeves, commuter backpacks, organizers & wallets',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Home Essentials',
    tagline: 'Ambient desk lighting, stoneware tumblers & catchall trays',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80'
  }
]

export const PRODUCTS = [
  // --- TECH & AUDIO ---
  {
    id: 'forma-01',
    slug: 'komorebi-mechanical-keyboard',
    name: 'Komorebi Mechanical Keyboard',
    tagline: 'Milled aluminum chassis with silent tactile keystrokes',
    category: 'Tech & Audio',
    price: 18900,
    originalPrice: 21900,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    description: 'Precision-machined aluminum chassis. Features factory-lubricated silent tactile switches, double-shot PBT keycaps, and seamless Bluetooth 5.2 multipoint pairing.',
    features: [
      'Anodized unibody aluminum case',
      'Hot-swappable PCB with south-facing RGB',
      'Gasket mount with multi-layer dampening foam',
      'Multi-device pairing with quick toggle'
    ],
    specs: {
      Dimensions: '320 × 115 × 34 mm',
      Weight: '1,120 g',
      Battery: '4,000 mAh (up to 200 hours)',
      Connectivity: 'Bluetooth 5.2 / 2.4GHz / USB-C'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-04',
    slug: 'atlas-magsafe-desk-stand',
    name: 'Atlas MagSafe Desk Stand',
    tagline: 'Solid micro-suction base with 360-degree rotation',
    category: 'Tech & Audio',
    price: 4800,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
    description: 'Weighted desk stand crafted with geometric precision. Positions your device at the optimal ergonomic angle for desk work, video calls, and standby clock mode.',
    features: [
      'Heavy weighted base stays rooted on one-handed lifts',
      'Dual-axis friction hinge engineered for zero wobble',
      'Integrated cable routing channel on reverse spine',
      'Matte silicone face protects device finish'
    ],
    specs: {
      BaseFootprint: '90 × 90 mm',
      Weight: '460 g',
      Material: 'Sandblasted 6063 Aluminum',
      Compatibility: 'All MagSafe iPhones & cases'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-06',
    slug: 'sylvan-solid-walnut-desk-mat',
    name: 'Sylvan Walnut Desk Mat',
    tagline: 'Hardwood veneer desk surface with natural cork underlay',
    category: 'Tech & Audio',
    price: 5600,
    originalPrice: 6400,
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
    description: 'A smooth workspace surface that grounds your desk setup. Layered with water-resistant oil treatment and backed by high-density cork for stability.',
    features: [
      'Smooth hardwood veneer construction',
      'High-traction acoustic dampening cork backing',
      'Gentle beveled edges for comfortable forearm rest',
      'Natural grain variation across each piece'
    ],
    specs: {
      Dimensions: '900 × 400 × 3.5 mm',
      Weight: '720 g',
      Finish: 'Natural protective oil coating'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-09',
    slug: 'apex-precision-trackball',
    name: 'Apex Precision Trackball',
    tagline: 'Sculpted wireless trackball with fluid optical bearings',
    category: 'Tech & Audio',
    price: 7400,
    originalPrice: 8500,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Ergonomically sculpted at an 18-degree tilt angle to relieve forearm strain during prolonged work sessions. Precision synthetic bearings provide smooth glide.',
    features: [
      'Low-friction synthetic bearing cup for smooth rotation',
      'High-resolution 4,000 DPI adjustable optical sensor',
      'USB-C quick charge with extended battery life',
      'Low-latency 2.4GHz and Bluetooth dual-channel connectivity'
    ],
    specs: {
      Dimensions: '135 × 100 × 51 mm',
      Weight: '215 g',
      Sensor: 'PixArt Optical Sensor',
      Angle: '18-degree natural handshake tilt'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-02',
    slug: 'studio-monolith-wireless-headphones',
    name: 'Studio Monolith Headphones',
    tagline: 'Over-ear wireless headphones with active noise cancellation',
    category: 'Tech & Audio',
    price: 24500,
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed for quiet concentration and clear sound reproduction. Custom 40mm dynamic drivers deliver deep bass and clear treble across genres.',
    features: [
      'Custom 40mm tuned dynamic drivers',
      'Adaptive active hybrid noise cancellation',
      'Soft memory foam ear cushions for long listening sessions',
      'Tactile rotary crown for volume and ANC control'
    ],
    specs: {
      Weight: '275 g',
      Playback: 'Up to 38 hours on single charge',
      Frequency: '20 Hz – 20,000 Hz',
      Codecs: 'AAC, SBC, aptX'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-10',
    slug: 'sonus-brass-desktop-monitors',
    name: 'Sonus Desktop Studio Monitors',
    tagline: 'Pair of compact powered nearfield desktop monitors',
    category: 'Tech & Audio',
    price: 32000,
    originalPrice: 36500,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    description: 'Desktop reference audio engineered with acoustic chamber dampening. Custom waveguides produce clear stereo imaging and accurate midrange detail.',
    features: [
      'Custom 1-inch silk dome tweeter with acoustic horn',
      '4-inch composite transducer for punchy low-end',
      'Integrated Class-D 80W RMS bi-amplification',
      'Optical, RCA, and balanced TRS inputs'
    ],
    specs: {
      FrequencyResponse: '48 Hz – 22,000 Hz',
      Dimensions: '210 × 140 × 175 mm each',
      Weight: '6.4 kg (pair)',
      Enclosure: 'High-density acoustic enclosure'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-11',
    slug: 'vektor-titanium-anc-earbuds',
    name: 'Vektor Titanium ANC Earbuds',
    tagline: 'Machined titanium housing with active transparency',
    category: 'Tech & Audio',
    price: 14500,
    originalPrice: 16900,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    description: 'Compact wireless earbuds housed in lightweight titanium. Features dual microphones for clear calls, active noise cancellation, and balanced sound reproduction.',
    features: [
      'Machined titanium acoustic enclosures',
      'IPX5 sweat and splash water resistance',
      'Wireless Qi charging compact storage dock',
      'Multipoint pairing across laptop and mobile'
    ],
    specs: {
      Weight: '5.2 g per earbud',
      BatteryLife: '8 hours (32 hours total with charging case)',
      Driver: '10mm dynamic diaphragm'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-16',
    slug: 'resonance-aluminum-dac-amplifier',
    name: 'Resonance Aluminum DAC',
    tagline: 'Balanced desktop digital-to-analog converter and amplifier',
    category: 'Tech & Audio',
    price: 19800,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    description: 'High-resolution headphone amplifier and digital converter. Built with dual DAC chips and smooth analog potentiometer for clean, low-distortion audio output.',
    features: [
      'Dual balanced DAC converter chips',
      '4.4mm balanced and 3.5mm headphone outputs',
      'High-resolution 32-bit audio decoding',
      'Sturdy aluminum chassis shields against interference'
    ],
    specs: {
      OutputPower: '1,200 mW into 32 ohms',
      Dimensions: '160 × 120 × 45 mm',
      Weight: '880 g',
      Inputs: 'USB-C, Optical, Coaxial S/PDIF'
    },
    featured: false,
    inStock: true
  },

  // --- BAGS & ACCESSORIES ---
  {
    id: 'forma-03',
    slug: 'folio-leather-laptop-sleeve',
    name: 'Folio Leather Laptop Sleeve',
    tagline: 'Smooth leather sleeve with magnetic closure',
    category: 'Bags & Accessories',
    price: 7900,
    originalPrice: 8900,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    description: 'Minimalist envelope sleeve crafted from smooth genuine leather with soft microfiber lining to protect laptops against scratches.',
    features: [
      'Smooth genuine leather exterior',
      'Hidden magnetic snap closure',
      'Soft microfiber interior lining',
      'External slip pocket for documents or notebook'
    ],
    specs: {
      Compatibility: 'Laptops up to 14" & 16"',
      Thickness: '7 mm unloaded',
      Closure: 'Magnetic snap'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-08',
    slug: 'nomad-ballistic-tech-organizer',
    name: 'Nomad Ballistic Organizer',
    tagline: 'Durable nylon case with fold-out compartments',
    category: 'Bags & Accessories',
    price: 3900,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    description: 'Streamline your daily gear. Built with durable 1680D nylon to organize power adapters, styluses, memory cards, and charging cables with dependable everyday protection.',
    features: [
      'Durable 1680D water-repellent nylon exterior',
      'Smooth weather-resistant zippers',
      'Fold-out interior elastic loops and mesh dividers',
      'External quick-grab slip pocket'
    ],
    specs: {
      Dimensions: '230 × 140 × 65 mm',
      Weight: '220 g',
      Zippers: 'Matte water-resistant zippers'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-12',
    slug: 'atelier-leather-card-wallet',
    name: 'Atelier Leather Card Wallet',
    tagline: 'Slim leather cardholder with RFID-blocking pocket',
    category: 'Bags & Accessories',
    price: 3400,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
    description: 'Pocket-sized cardholder cut from durable smooth leather with clean, burnished edges. Accommodates up to 8 cards and folded currency with minimal pocket bulk.',
    features: [
      'Reinforced perimeter stitching',
      'Central pocket for folded currency',
      'Integrated aluminum RFID-blocking shield',
      'Multiple quick-access card slots'
    ],
    specs: {
      Dimensions: '100 × 70 × 6 mm',
      Weight: '42 g',
      Capacity: '6–8 cards + notes'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-15',
    slug: 'meridian-waxed-canvas-duffle',
    name: 'Meridian Waxed Canvas Weekender',
    tagline: 'Durable waxed canvas duffle with sturdy leather handles',
    category: 'Bags & Accessories',
    price: 13500,
    originalPrice: 15500,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    description: 'A dependable travel duffle built for weekend trips and daily transit. Heavyweight waxed cotton sheds light moisture, while solid brass hardware and reinforced leather handles offer everyday durability.',
    features: [
      'Heavyweight water-resistant waxed cotton canvas',
      'Solid brass hardware and reinforced rivets',
      'Padded internal 15-inch laptop compartment',
      'Removable wide-webbing shoulder strap'
    ],
    specs: {
      Capacity: '38 Litres (Overnight / Weekender)',
      Dimensions: '500 × 280 × 260 mm',
      Weight: '1,450 g'
    },
    featured: true,
    inStock: true
  },

  // --- HOME ESSENTIALS ---
  {
    id: 'forma-05',
    slug: 'oblique-ceramic-coffee-tumbler',
    name: 'Oblique Ceramic Tumbler',
    tagline: 'Double-walled ceramic tumbler with matte finish',
    category: 'Home Essentials',
    price: 2400,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    description: 'Double-walled ceramic mug that keeps coffee or tea hot while staying comfortable to hold. Features a smooth glazed interior and secure travel lid.',
    features: [
      'Double-wall insulated ceramic construction',
      'Non-reactive glazed interior',
      'Splash-resistant lid with silicone seal',
      'Fits standard automotive cup holders'
    ],
    specs: {
      Capacity: '350 ml (12 fl oz)',
      Dimensions: '82 mm diameter × 145 mm height',
      Care: 'Dishwasher safe, microwave safe without lid'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-07',
    slug: 'strata-ambient-desk-lamp',
    name: 'Strata Ambient Desk Lamp',
    tagline: 'Brass desk lamp with warm 2700K diffuser',
    category: 'Home Essentials',
    price: 11200,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    description: 'Sculptural accent lighting designed for your desk or nightstand. Stepless knurled dial lets you calibrate light intensity from an ambient amber glow to focused warm white.',
    features: [
      'Solid brass base with protective finish',
      'Frosted glass diffuser for soft ambient light',
      'Stepless rotary dimmer control',
      'Energy-efficient warm white LED array'
    ],
    specs: {
      Power: 'USB-C rechargeable & direct power adapter',
      Dimensions: '130 mm diameter × 260 mm height',
      ColorTemp: '2700K warm white'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-13',
    slug: 'kanso-anodized-catchall-tray',
    name: 'Kanso Anodized Catchall',
    tagline: 'Machined aluminum organizer tray with non-slip silicone feet',
    category: 'Home Essentials',
    price: 2800,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    description: 'A dedicated tray for your daily carry. Precision-machined with gentle compartments to keep keys, watch, wallet, and stationery in order.',
    features: [
      'Machined from solid aluminum',
      'Smooth satin anodized finish resists micro-scratches',
      'Underside silicone feet prevent surface slipping',
      'Calibrated partition wells for watches and eyewear'
    ],
    specs: {
      Dimensions: '240 × 120 × 16 mm',
      Weight: '380 g',
      Finish: 'Matte Space Gray Anodized'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-14',
    slug: 'kyoto-stoneware-teapot',
    name: 'Kyoto Stoneware Teapot & Cup Set',
    tagline: 'Ceramic brewing teapot with stainless steel infuser',
    category: 'Home Essentials',
    price: 4200,
    originalPrice: 4800,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    description: 'Classic ceramic teapot designed for your daily routine. Features an integrated fine-mesh stainless steel infuser for whole-leaf green and herbal teas.',
    features: [
      'Matte glazed stoneware ceramic body',
      'Fine stainless steel micro-mesh infuser basket',
      'Heat-resistant wooden handle grip',
      'Includes two matching double-walled cups'
    ],
    specs: {
      PotCapacity: '450 ml',
      CupCapacity: '80 ml each',
      Material: 'Stoneware ceramic & stainless steel'
    },
    featured: false,
    inStock: true
  }
]

/**
 * Normalizes category values to ensure full backward compatibility
 * with legacy queries (Workstation, Audio, Carry, Living).
 */
export function normalizeCategory(category) {
  if (!category || category.toLowerCase() === 'all') return 'All'
  const c = category.toLowerCase().trim()
  if (c === 'tech & audio' || c === 'workstation' || c === 'audio' || c === 'tech') return 'Tech & Audio'
  if (c === 'bags & accessories' || c === 'carry' || c === 'bags' || c === 'accessories') return 'Bags & Accessories'
  if (c === 'home essentials' || c === 'living' || c === 'home') return 'Home Essentials'
  return category
}

// Query helper functions
export function getAllProducts() {
  return PRODUCTS
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((product) => product.featured)
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id)
}

export function getProductsByCategory(category) {
  const normalized = normalizeCategory(category)
  if (normalized === 'All') return PRODUCTS
  return PRODUCTS.filter((product) => product.category.toLowerCase() === normalized.toLowerCase())
}

/**
 * Returns category metadata with dynamic item counts reflecting the catalogue
 */
export function getCategoryMetadata() {
  return CATEGORY_METADATA.map((cat) => ({
    ...cat,
    itemCount: PRODUCTS.filter(
      (product) => product.category.toLowerCase() === cat.name.toLowerCase()
    ).length
  }))
}
