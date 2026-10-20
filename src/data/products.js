/**
 * Forma — Mock Product Catalogue
 * Centralized dataset representing premium lifestyle & tech accessories.
 */

export const CATEGORIES = [
  'All',
  'Workstation',
  'Audio',
  'Carry',
  'Living'
]

export const PRODUCTS = [
  {
    id: 'forma-01',
    slug: 'komorebi-mechanical-keyboard',
    name: 'Komorebi Mechanical Keyboard',
    tagline: 'Milled aluminum chassis with silent tactile keystrokes',
    category: 'Workstation',
    price: 240,
    originalPrice: 280,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    description: 'Precision-machined from a single block of aerospace aluminum. Features factory-lubricated silent tactile switches, double-shot PBT keycaps, and seamless Bluetooth 5.2 multipoint pairing.',
    features: [
      'CNC anodized unibody aluminum case',
      'Hot-swappable PCB with south-facing RGB',
      'Acoustic gasket mount with multi-layer dampening foam',
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
    id: 'forma-02',
    slug: 'studio-monolith-wireless-headphones',
    name: 'Studio Monolith Headphones',
    tagline: 'Brushed magnesium frame with spatial acoustic clarity',
    category: 'Audio',
    price: 360,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed for quiet concentration and refined sonic fidelity. Custom 40mm beryllium drivers deliver deep, textured sub-bass and pristine treble without artificial coloration.',
    features: [
      'Custom 40mm tuned beryllium dynamic drivers',
      'Adaptive active hybrid noise cancellation',
      'Perforated lambskin memory foam ear cushions',
      'Tactile rotary crown for volume and ANC blend'
    ],
    specs: {
      Weight: '275 g',
      Playback: '38 hours on single charge',
      Frequency: '10 Hz – 40,000 Hz',
      Codecs: 'LDAC, AAC, aptX Adaptive'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-03',
    slug: 'folio-leather-laptop-sleeve',
    name: 'Folio Leather Laptop Sleeve',
    tagline: 'Vegetable-tanned Italian leather with magnetic closure',
    category: 'Carry',
    price: 135,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    description: 'Minimalist envelope sleeve crafted from rich Tuscan vachetta leather that develops a unique natural patina over time. Lined with microfiber felt to shield against scratches.',
    features: [
      'Full-grain vegetable-tanned Tuscan leather',
      'Hidden quad-magnet snap closure',
      'Ultra-soft 3mm bonded microfiber interior',
      'External slip pocket for notebook or documents'
    ],
    specs: {
      Compatibility: 'MacBook Pro 14" & 16" or similar ultrabooks',
      Thickness: '7 mm unloaded',
      Origin: 'Artisan handcrafted in Florence, Italy'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-04',
    slug: 'atlas-magsafe-desk-stand',
    name: 'Atlas MagSafe Desk Stand',
    tagline: 'Solid micro-suction base with 360-degree rotation',
    category: 'Workstation',
    price: 95,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
    description: 'Weighted desk stand crafted with geometric precision. Positions your device at the optimal ergonomic angle for desk work, FaceTime calls, and standby clock mode.',
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
    id: 'forma-05',
    slug: 'oblique-ceramic-coffee-tumbler',
    name: 'Oblique Ceramic Tumbler',
    tagline: 'Double-walled stoneware with matte graphite glaze',
    category: 'Living',
    price: 48,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-thrown aesthetic meets thermal innovation. Keeps your pour-over or matcha piping hot for hours without the metallic taste of stainless steel.',
    features: [
      'Double-wall insulated ceramic construction',
      'Pure taste guarantee — non-reactive glazed interior',
      'Splash-resistant Tritan lid with silicone ring seal',
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
    id: 'forma-06',
    slug: 'sylvan-solid-walnut-desk-mat',
    name: 'Sylvan Walnut Desk Mat',
    tagline: 'Sustainably harvested American walnut with cork underlay',
    category: 'Workstation',
    price: 110,
    originalPrice: 125,
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
    description: 'A tactile workspace canvas that grounds your desk setup. Layered with natural water-resistant oil treatment and backed by high-density Portuguese cork.',
    features: [
      'Flexible real hardwood veneer construction',
      'High-traction acoustic dampening cork backing',
      'Gentle beveled edges for comfortable forearm rest',
      'Natural grain variation makes every piece one-of-a-kind'
    ],
    specs: {
      Dimensions: '900 × 400 × 3.5 mm',
      Weight: '720 g',
      Origin: 'Crafted in Portland, Oregon'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-07',
    slug: 'strata-ambient-desk-lamp',
    name: 'Strata Ambient Desk Lamp',
    tagline: 'Solid brass column with frosted 2700K diffuser',
    category: 'Living',
    price: 185,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    description: 'Sculptural accent lighting designed for late-night creativity. Stepless brass knurled dial lets you calibrate light temperature from a candle-like amber glow to focused daylight.',
    features: [
      'Solid machined brass base with raw finish patina',
      'Mouth-blown opaline frosted glass diffuser',
      'Touch-sensitive stepless dimmer control',
      '95+ CRI warm white LED array'
    ],
    specs: {
      Power: 'USB-C rechargeable & direct wall power',
      Dimensions: '130 mm diameter × 260 mm height',
      LumenOutput: '450 lm peak'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-08',
    slug: 'nomad-ballistic-tech-organizer',
    name: 'Nomad Ballistic Organizer',
    tagline: 'Weatherproof Cordura case with magnetic fold-out compartments',
    category: 'Carry',
    price: 78,
    originalPrice: 90,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    description: 'Streamline your daily essentials. Built with ultra-durable 1680D ballistic nylon to house power adapters, styluses, memory cards, and charging cables with military-grade resilience.',
    features: [
      '1680D water-repellent ballistic nylon exterior',
      'Waterproof YKK Aquaguard taped zippers',
      'Origami-style fold-out interior organization',
      'External quick-grab passport/phone slip'
    ],
    specs: {
      Dimensions: '230 × 140 × 65 mm',
      Weight: '220 g',
      Zippers: 'YKK Aquaguard matte finish'
    },
    featured: false,
    inStock: true
  }
]

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
  if (!category || category === 'All') return PRODUCTS
  return PRODUCTS.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}
