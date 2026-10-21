/**
 * Forma — Mock Product Catalogue
 * Centralized dataset representing premium lifestyle & tech accessories.
 * All prices denominated in Indian Rupees (INR) for India-ready storefront.
 */

export const CATEGORIES = [
  'All',
  'Workstation',
  'Audio',
  'Carry',
  'Living'
]

export const CATEGORY_METADATA = [
  {
    name: 'Workstation',
    tagline: 'Precision tools, anodized docks & tactile desk surfaces',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Audio',
    tagline: 'High-fidelity acoustic drivers & spatial tuning',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Carry',
    tagline: 'Vegetable-tanned leather & weatherproof organizers',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Living',
    tagline: 'Sculptural ambient lighting & double-walled ceramics',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80'
  }
]

export const PRODUCTS = [
  // --- WORKSTATION ---
  {
    id: 'forma-01',
    slug: 'komorebi-mechanical-keyboard',
    name: 'Komorebi Mechanical Keyboard',
    tagline: 'Milled aluminum chassis with silent tactile keystrokes',
    category: 'Workstation',
    price: 18900,
    originalPrice: 21900,
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
    id: 'forma-04',
    slug: 'atlas-magsafe-desk-stand',
    name: 'Atlas MagSafe Desk Stand',
    tagline: 'Solid micro-suction base with 360-degree rotation',
    category: 'Workstation',
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
    tagline: 'Sustainably harvested American walnut with cork underlay',
    category: 'Workstation',
    price: 5600,
    originalPrice: 6400,
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
    id: 'forma-09',
    slug: 'apex-precision-trackball',
    name: 'Apex Precision Trackball',
    tagline: 'Sculpted aluminum wireless trackball with fluid optical bearings',
    category: 'Workstation',
    price: 7400,
    originalPrice: 8500,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Ergonomically sculpted at an 18-degree tilt angle to relieve forearm strain during prolonged design and editing sessions. Precision synthetic ruby bearings provide frictionless glide.',
    features: [
      'Synthetic ruby bearing cup for near-frictionless rotation',
      'High-resolution 4,000 DPI adjustable optical sensor',
      'USB-C quick charge with 90-day battery stamina',
      'Low-latency 2.4GHz and Bluetooth dual-channel connectivity'
    ],
    specs: {
      Dimensions: '135 × 100 × 51 mm',
      Weight: '215 g',
      Sensor: 'PixArt PMW3360 Optical',
      Angle: '18-degree natural handshake tilt'
    },
    featured: false,
    inStock: true
  },

  // --- AUDIO ---
  {
    id: 'forma-02',
    slug: 'studio-monolith-wireless-headphones',
    name: 'Studio Monolith Headphones',
    tagline: 'Brushed magnesium frame with spatial acoustic clarity',
    category: 'Audio',
    price: 24500,
    originalPrice: 28000,
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
    id: 'forma-10',
    slug: 'sonus-brass-desktop-monitors',
    name: 'Sonus Brass Studio Monitors',
    tagline: 'Pair of nearfield acoustic monitors with spun brass waveguides',
    category: 'Audio',
    price: 32000,
    originalPrice: 36500,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    description: 'Desktop reference audio engineered with acoustic chamber dampening. Spun brass waveguides produce pinpoint soundstaging, while woven Kevlar woofers ensure linear midrange detail.',
    features: [
      'Custom 1-inch silk dome tweeter with spun brass horn',
      '4-inch woven Kevlar low-frequency composite transducer',
      'Integrated Class-D 80W RMS bi-amplification',
      'Optical, RCA, and balanced TRS studio inputs'
    ],
    specs: {
      FrequencyResponse: '48 Hz – 22,000 Hz',
      Dimensions: '210 × 140 × 175 mm each',
      Weight: '6.4 kg (pair)',
      Enclosure: 'High-density MDF with solid ash baffles'
    },
    featured: true,
    inStock: true
  },
  {
    id: 'forma-11',
    slug: 'vektor-titanium-anc-earbuds',
    name: 'Vektor Titanium ANC Earbuds',
    tagline: 'Milled aerospace titanium housing with active transparency',
    category: 'Audio',
    price: 14500,
    originalPrice: 16900,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    description: 'Compact listening instruments milled from Grade 5 titanium. Engineered with dual-feedforward microphones for wind-shielded noise cancellation and pure, natural vocal reproduction.',
    features: [
      'Grade 5 CNC titanium acoustic enclosures',
      'IPX5 sweat and rainfall weather resistance',
      'Wireless Qi charging aluminum storage dock',
      'Multipoint pairing across laptop and mobile'
    ],
    specs: {
      Weight: '5.2 g per earbud',
      BatteryLife: '8 hours (32 hours total with case)',
      Driver: '10mm carbon-graphene diaphragm'
    },
    featured: false,
    inStock: true
  },
  {
    id: 'forma-16',
    slug: 'resonance-aluminum-dac-amplifier',
    name: 'Resonance Aluminum DAC',
    tagline: 'Cast aluminum balanced desktop digital-to-analog converter',
    category: 'Audio',
    price: 19800,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    description: 'Audiophile-grade headphone amplifier and digital converter. Built with dual ESS Sabre PRO DAC chips and a motorized analog potentiometer for zero channel imbalance at whisper levels.',
    features: [
      'Dual ESS Sabre ES9038Q2M balanced converters',
      '4.4mm balanced and 6.35mm single-ended headphone outputs',
      'Bit-perfect 32-bit/768kHz and native DSD512 decoding',
      'Hefty CNC aluminum chassis blocks electromagnetic interference'
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

  // --- CARRY ---
  {
    id: 'forma-03',
    slug: 'folio-leather-laptop-sleeve',
    name: 'Folio Leather Laptop Sleeve',
    tagline: 'Vegetable-tanned Italian leather with magnetic closure',
    category: 'Carry',
    price: 7900,
    originalPrice: 8900,
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
    id: 'forma-08',
    slug: 'nomad-ballistic-tech-organizer',
    name: 'Nomad Ballistic Organizer',
    tagline: 'Weatherproof Cordura case with magnetic fold-out compartments',
    category: 'Carry',
    price: 3900,
    originalPrice: 4500,
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
  },
  {
    id: 'forma-12',
    slug: 'atelier-leather-card-wallet',
    name: 'Atelier Minimalist Card Wallet',
    tagline: 'Beveled vegetable-tanned bridle leather with RFID shield',
    category: 'Carry',
    price: 3400,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
    description: 'Pocket-sized leather engineering. Cut from full-grain bridle leather with beveled, wax-burnished edges. Accommodates up to 8 cards and folded currency with zero pocket bulk.',
    features: [
      'Saddle-stitched by hand with waxed linen thread',
      'Central slot for quick-draw primary currency',
      'Integrated aerospace aluminum RFID-blocking core',
      'Deep aniline dye develops rich individualized patina'
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
    tagline: 'Weatherproof Scottish canvas duffle with bridle leather handles',
    category: 'Carry',
    price: 13500,
    originalPrice: 15500,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    description: 'An enduring weekend companion built for transit. Heavyweight paraffin-waxed cotton sheds rainfall, while solid brass hardware and continuous leather handle wraps ensure decades of resilience.',
    features: [
      '18oz Scottish paraffin-waxed cotton canvas',
      'Solid forged brass hardware and rivets',
      'Padded internal 16-inch laptop compartment',
      'Removable wide-webbing shoulder strap with leather pad'
    ],
    specs: {
      Capacity: '38 Litres (Overnight / Weekender)',
      Dimensions: '500 × 280 × 260 mm',
      Weight: '1,450 g'
    },
    featured: true,
    inStock: true
  },

  // --- LIVING ---
  {
    id: 'forma-05',
    slug: 'oblique-ceramic-coffee-tumbler',
    name: 'Oblique Ceramic Tumbler',
    tagline: 'Double-walled stoneware with matte graphite glaze',
    category: 'Living',
    price: 2400,
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
    id: 'forma-07',
    slug: 'strata-ambient-desk-lamp',
    name: 'Strata Ambient Desk Lamp',
    tagline: 'Solid brass column with frosted 2700K diffuser',
    category: 'Living',
    price: 11200,
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
    id: 'forma-13',
    slug: 'kanso-anodized-catchall-tray',
    name: 'Kanso Anodized Catchall',
    tagline: 'Bead-blasted aluminum organizer with micro-suction feet',
    category: 'Living',
    price: 2800,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
    description: 'A dedicated sanctuary for your everyday carry. Milled with gentle ergonomic concavities to nest your keys, watch, rings, and fountain pen in harmonious order.',
    features: [
      'CNC machined from solid 6000-series billet aluminum',
      'Bead-blasted satin anodized finish resists micro-scratches',
      'Underside silicone dampening feet prevent desk scuffs',
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
    tagline: 'Handcrafted Banko-yaki clay brewing teapot with precision infuser',
    category: 'Living',
    price: 4200,
    originalPrice: 4800,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    description: 'Centuries of Japanese ceramic mastery condensed for your daily desk ritual. High-iron clay softens water astringency, producing smoother green and oolong tea extractions.',
    features: [
      'Handcrafted natural unglazed Banko-yaki purple clay',
      'Laser-perforated stainless steel micro-mesh basket',
      'Heat-resistant carved cedar handle grip',
      'Includes two matching double-walled sipping cups'
    ],
    specs: {
      PotCapacity: '450 ml',
      CupCapacity: '80 ml each',
      Origin: 'Yokkaichi, Mie Prefecture, Japan'
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

/**
 * Returns category metadata with live dynamic item counts reflecting the catalogue
 */
export function getCategoryMetadata() {
  return CATEGORY_METADATA.map((cat) => ({
    ...cat,
    itemCount: PRODUCTS.filter(
      (product) => product.category.toLowerCase() === cat.name.toLowerCase()
    ).length
  }))
}
