export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  thaiMotif?: string;
  category: "women" | "men" | "accessories";
  subcategory: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  material: string;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "w001",
    name: "Kranok Tube Top",
    subtitle: "Heritage Performance Top",
    thaiMotif: "Inspired by Kranok flame motifs",
    category: "women",
    subcategory: "Tops",
    price: 2890,
    images: [
      "/images/image (3).webp",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Indigo", hex: "#2C3E6B" },
      { name: "Deep Red", hex: "#7A1A1A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Khram Indigo Cotton Blend, 80% Nylon, 20% Spandex",
    description:
      "กล้ามผ้า inspired by the sacred Kranok flame patterns etched into temple facades across Thailand. The Kranok Tube Top channels ancient fire energy into a modern silhouette — sculpted for performance, worn as a statement of cultural pride.",
    features: [
      "4-way stretch for unrestricted movement",
      "Moisture-wicking & quick-dry technology",
      "Kranok flame-stitch detailing at hem",
      "UPF 30+ sun protection",
      "Squat-proof opaque fabric",
      "Flatlock seams to prevent chafing",
    ],
    rating: 4.9,
    reviewCount: 214,
    reviews: [
      {
        id: "r1",
        author: "Nattaya P.",
        rating: 5,
        date: "2026-01-15",
        comment:
          "รักมากเลยค่ะ! The Kranok stitching is so beautiful and subtle. I wear this to both the gym and brunch. The fabric is buttery smooth.",
        verified: true,
      },
      {
        id: "r2",
        author: "Priya S.",
        rating: 5,
        date: "2026-01-22",
        comment:
          "Fits perfectly and the heritage detail makes it so unique. True to size, very flattering.",
        verified: true,
      },
    ],
    isNew: true,
    isBestseller: true,
    inStock: true,
    tags: ["top", "tube top", "heritage", "kranok", "Performance + Heritage", "thai"],
  },
  {
    id: "w002",
    name: "Heritage Leggings",
    subtitle: "Mudmee Silk–Inspired Leggings",
    thaiMotif: "Inspired by Mudmee tie-dye silk weaving",
    category: "women",
    subcategory: "Leggings",
    price: 3490,
    images: [
      "/images/image (4).webp",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Midnight Navy", hex: "#1B2A4A" },
      { name: "Deep Burgundy", hex: "#6B1A2A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "Mudmee Silk Details, 80% Nylon, 20% Spandex",
    description:
      "กางเกงเลกกิ้ง crafted in homage to the ancient Mudmee tie-dye silk technique from Isan, Northeast Thailand. The tonal texture embedded into our SLCKK-Flex fabric mirrors the interlocked threads of traditional Mudmee looms — heritage you can feel against your skin.",
    features: [
      "4-way stretch for unrestricted movement",
      "Moisture-wicking & quick-dry technology",
      "High-waist compression support",
      "Hidden waistband pocket",
      "Squat-proof opaque fabric",
      "Flatlock seams to prevent chafing",
    ],
    rating: 4.8,
    reviewCount: 312,
    reviews: [
      {
        id: "r3",
        author: "Aisha M.",
        rating: 5,
        date: "2026-01-15",
        comment:
          "These are the best leggings I've ever owned. The fabric is incredibly smooth and they don't budge during HIIT. The subtle texture is gorgeous.",
        verified: true,
      },
      {
        id: "r4",
        author: "Mei Lin",
        rating: 4,
        date: "2026-02-01",
        comment:
          "Beautiful quality. Slightly long in the leg for my height (5'2\") but the material is exceptional.",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    tags: ["leggings", "yoga", "hiit", "bestseller", "mudmee", "Performance + Heritage", "thai"],
  },
  {
    id: "w003",
    name: "Crossover Tank",
    subtitle: "Karen Cotton Crossover",
    thaiMotif: "Inspired by Karen woven cotton patterns",
    category: "women",
    subcategory: "Tops",
    price: 2690,
    images: [
      "/images/image (6).webp",
    ],
    colors: [
      { name: "Natural Earth", hex: "#8B7355" },
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Indigo Deep", hex: "#1C2B5E" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Karen Cotton Blend, 88% Polyester, 12% Elastane",
    description:
      "เสื้อกล้าม inspired by the geometric crossover weaving patterns of the Karen hill tribe artisans in Northern Thailand. The crossover front detail mirrors traditional Karen loom-work — a garment that carries the spirit of the highland craftswomen with every wear.",
    features: [
      "Crossover front panel for secure fit",
      "Karen-inspired geometric trim detail",
      "Moisture-wicking inner lining",
      "Racerback for full shoulder mobility",
      "Soft, tagless construction",
      "Karen cotton blend for natural breathability",
    ],
    rating: 4.7,
    reviewCount: 167,
    reviews: [
      {
        id: "r5",
        author: "Zara K.",
        rating: 5,
        date: "2026-02-05",
        comment:
          "I love the crossover detail — so flattering and the Karen cotton blend feels amazing on skin. Unique and beautiful!",
        verified: true,
      },
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    tags: ["top", "tank", "karen cotton", "crossover", "heritage", "Performance + Heritage", "thai"],
  },
  {
    id: "w004",
    name: "Asymmetric Sports Bra",
    subtitle: "Lai Dok Phikul Asymmetric Bra",
    thaiMotif: "Inspired by Dok Phikul (temple flower) asymmetric patterns",
    category: "women",
    subcategory: "Sports Bras",
    price: 2490,
    images: [
      "/images/image (7).webp",
    ],
    colors: [
      { name: "Gold Koi", hex: "#C9A84C" },
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Terracotta", hex: "#C4714B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "76% Nylon, 24% Spandex",
    description:
      "บราออกกำลังกาย drawing inspiration from the asymmetrical petal arrangements of the Dok Phikul — Thailand's temple flower — this bra celebrates imperfect beauty. The offset strap design is not a flaw but a feature, echoing the organic forms found in Thai floral embroidery.",
    features: [
      "Medium-high impact support",
      "Removable cups with molded edges",
      "Asymmetric strap design (intentional)",
      "Racerback for full shoulder mobility",
      "Moisture-wicking inner lining",
      "Soft, tagless construction",
    ],
    rating: 4.7,
    reviewCount: 183,
    reviews: [
      {
        id: "r6",
        author: "Siti N.",
        rating: 4,
        date: "2026-01-28",
        comment:
          "Great support and beautiful asymmetric design. The gold color is stunning in person.",
        verified: true,
      },
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    tags: ["sports bra", "heritage", "asymmetric", "dok phikul", "Performance + Heritage", "thai"],
  },
  {
    id: "w005",
    name: "Sleek Crop Top",
    subtitle: "Lai Thai Geometric Crop",
    thaiMotif: "Inspired by Lai Thai geometric temple architecture",
    category: "women",
    subcategory: "Tops",
    price: 2390,
    images: [
      "/images/image (8).webp",
    ],
    colors: [
      { name: "Cloud White", hex: "#F0EDE8" },
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Dusk Rose", hex: "#B8826A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "92% Polyester, 8% Elastane",
    description:
      "เสื้อครอป inspired by the geometric Lai Thai patterns found on ancient temple architecture. The sleek minimalist silhouette echoes sacred design — symmetry, proportion, and precision refined over centuries by Thai artisans.",
    features: [
      "Cropped length with strategic ventilation",
      "Flatlock stitching prevents irritation",
      "UPF 50+ sun protection",
      "Moisture transport system",
      "Lai Thai geometric trim at neckline",
    ],
    rating: 4.5,
    reviewCount: 121,
    reviews: [
      {
        id: "r7",
        author: "Nurul A.",
        rating: 5,
        date: "2026-02-10",
        comment:
          "Super lightweight and the temple-inspired detail is gorgeous. Gets so many compliments at the gym!",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    tags: ["top", "crop", "heritage", "lai thai", "Performance + Heritage", "thai"],
  },
  {
    id: "w006",
    name: "Urban Track Jacket",
    subtitle: "Pha Yok Track Jacket",
    thaiMotif: "Inspired by Pha Yok silk gold-thread weaving",
    category: "women",
    subcategory: "Hoodies",
    price: 4890,
    images: [
      "/images/image (9).webp",
    ],
    colors: [
      { name: "Ash Grey", hex: "#8A8A8A" },
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Deep Navy", hex: "#1A2340" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "60% Cotton, 40% Polyester",
    description:
      "แจ็คเก็ต channeling the luxurious Pha Yok silk — a fabric woven with real gold threads, historically reserved for Thai royalty. The Urban Track Jacket translates this regal heritage into a modern athletic silhouette, featuring subtle gold-thread accent stitching at the cuffs.",
    features: [
      "Premium cotton-poly blend",
      "Gold-thread accent stitching at cuffs",
      "Full-zip with split hem",
      "Thumb holes for layering",
      "Pha Yok inspired woven label",
      "Ribbed cuffs and hem",
    ],
    rating: 4.9,
    reviewCount: 289,
    reviews: [
      {
        id: "r8",
        author: "Fatima R.",
        rating: 5,
        date: "2026-01-30",
        comment:
          "The gold accent stitching is such a beautiful touch — so subtle but so premium. This jacket is stunning.",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    tags: ["jacket", "track jacket", "pha yok", "heritage", "bestseller", "Performance + Heritage", "thai"],
  },

  {
    id: "w008",
    name: "Meridian Set (Wine)",
    subtitle: "Siamese Lotus Matching Set",
    thaiMotif: "Inspired by the Siamese lotus blossom",
    category: "women",
    subcategory: "Sports Bras",
    price: 5990,
    images: [
      "/images/image (11).webp",
    ],
    colors: [
      { name: "Wine", hex: "#5C1A2E" },
      { name: "Mulberry", hex: "#4A1535" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "80% Nylon, 20% Spandex",
    description:
      "เซ็ตออกกำลังกาย inspired by the wine-dark colours of the lotus blossom — Siam's most sacred flower, symbolising purity rising from the mud. The Meridian Set (Wine) is the sister colourway to the Burgundy edition: equally powerful, deeper in tone, rooted in the same heritage story.",
    features: [
      "Includes matching bra + leggings",
      "High-waist legging with side pocket",
      "Medium-high impact bra support",
      "4-way stretch fabric",
      "Moisture-wicking throughout",
      "Lotus blossom emboss at waistband",
    ],
    rating: 4.8,
    reviewCount: 176,
    reviews: [
      {
        id: "r10",
        author: "Pimchanok R.",
        rating: 5,
        date: "2026-02-14",
        comment:
          "The wine colour is even more beautiful in person. Absolutely obsessed with this set — every session feels elevated.",
        verified: true,
      },
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    tags: ["set", "matching set", "sports bra", "leggings", "lotus", "heritage", "Performance + Heritage", "thai"],
  },
  {
    id: "m001",
    name: "Warrior Performance Tee",
    subtitle: "Muay Thai Heritage Tee",
    thaiMotif: "Inspired by Muay Thai warrior traditions",
    category: "men",
    subcategory: "T-Shirts",
    price: 2390,
    images: [
      "https://images.unsplash.com/photo-1752778597829-9e92e6d8b42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1540473901296-a6413c3e4aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Stone Grey", hex: "#6B6B6B" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    material: "94% Polyester, 6% Elastane",
    description:
      "The Warrior Tee channels the spirit of ancient Thai warriors — disciplined, powerful, and precise. Built with our advanced moisture-management fabric, it keeps you dry and focused through the most intense training sessions.",
    features: [
      "Advanced moisture-management technology",
      "Anti-odor treatment",
      "Muscle-fit cut for athletic builds",
      "Flatlock seams reduce friction",
      "Stretch fabric allows full range of motion",
    ],
    rating: 4.7,
    reviewCount: 198,
    reviews: [
      {
        id: "r11",
        author: "Rahim H.",
        rating: 5,
        date: "2026-01-18",
        comment:
          "Perfect fit, stays dry during heavy lifting. The quality feels premium and the design is clean.",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    tags: ["tshirt", "performance", "training", "bestseller", "Performance + Heritage", "thai"],
  },
  {
    id: "m002",
    name: "Dragon Training Shorts",
    subtitle: "Naga Scale Training Shorts",
    thaiMotif: "Inspired by Naga serpent scales",
    category: "men",
    subcategory: "Shorts",
    price: 2190,
    images: [
      "https://images.unsplash.com/photo-1680759170077-e9e2d838a34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1540473901296-a6413c3e4aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Cobalt", hex: "#1C3F7A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Recycled Polyester",
    description:
      "The Dragon Shorts are crafted from 100% recycled polyester, honoring our commitment to sustainability. The Naga serpent scale motif — a symbol of power across Thai and Khmer traditions — is subtly embossed on the waistband.",
    features: [
      "7\" inseam for gym and court versatility",
      "Built-in compression liner",
      "Naga scale embossed waistband",
      "Zippered pockets",
      "Made from recycled materials",
      "Quick-dry fabric",
    ],
    rating: 4.6,
    reviewCount: 154,
    reviews: [
      {
        id: "r12",
        author: "Kevin L.",
        rating: 5,
        date: "2026-01-25",
        comment:
          "Best gym shorts I've tried. Love that they're made from recycled materials. The compression liner is a nice touch.",
        verified: true,
      },
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    tags: ["shorts", "training", "sustainable", "naga", "Performance + Heritage", "thai"],
  },
  {
    id: "m003",
    name: "Shadow Tactical Joggers",
    subtitle: "Doi Inthanon Trail Joggers",
    thaiMotif: "Inspired by Doi Inthanon highland forests",
    category: "men",
    subcategory: "Joggers",
    price: 3590,
    images: [
      "https://images.unsplash.com/photo-1540473901296-a6413c3e4aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1752778597829-9e92e6d8b42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Camo Green", hex: "#3D4A2F" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "85% Nylon, 15% Elastane",
    description:
      "Inspired by the misty shadows of Doi Inthanon — Thailand's highest mountain — these tactical joggers are engineered for those who train hard and move fast. Four-pocket utility design meets premium athletic construction.",
    features: [
      "Four-pocket tactical design",
      "Tapered leg with adjustable ankle",
      "Water-resistant DWR coating",
      "Deep side zip pockets",
      "Elastic waistband with internal drawcord",
    ],
    rating: 4.8,
    reviewCount: 176,
    reviews: [
      {
        id: "r13",
        author: "Darren C.",
        rating: 5,
        date: "2026-02-08",
        comment:
          "These joggers are incredible. Perfect for the gym and look great outside too. The water resistance is a bonus.",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    tags: ["joggers", "tactical", "training", "water-resistant", "Performance + Heritage", "thai"],
  },
  {
    id: "m004",
    name: "Kris Blade Compression Shorts",
    subtitle: "Sacred Kris Compression",
    thaiMotif: "Inspired by the sacred Kris dagger of the Malay world",
    category: "men",
    subcategory: "Shorts",
    price: 1890,
    images: [
      "https://images.unsplash.com/photo-1680759170077-e9e2d838a34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Midnight Navy", hex: "#1B2A4A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "78% Nylon, 22% Elastane",
    description:
      "Named after the kris — the sacred asymmetrical dagger revered across Thai and Malay culture — these compression shorts are designed to cut through resistance. Graduated compression improves blood flow and reduces muscle fatigue.",
    features: [
      "Graduated compression support",
      "4-inch inseam",
      "Flatlock seams prevent irritation",
      "Built-in anti-roll gripper at leg",
      "Moisture-wicking",
    ],
    rating: 4.5,
    reviewCount: 92,
    reviews: [
      {
        id: "r14",
        author: "Marcus T.",
        rating: 5,
        date: "2026-01-12",
        comment:
          "Great compression shorts. The fit is snug but not restrictive and they stay in place perfectly.",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    tags: ["compression", "shorts", "performance", "Performance + Heritage", "thai"],
  },
  {
    id: "m005",
    name: "Heritage Strength Hoodie",
    subtitle: "Batik Embroidered Heritage Hoodie",
    thaiMotif: "Inspired by batik embroidery traditions",
    category: "men",
    subcategory: "Hoodies",
    price: 4590,
    images: [
      "https://images.unsplash.com/photo-1758521960947-a439d1920ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1540473901296-a6413c3e4aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Cream", hex: "#F5F0E8" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    material: "65% Cotton, 35% Polyester",
    description:
      "The Heritage Strength Hoodie pays homage to Thai batik embroidery traditions. Heavy-gauge fleece construction and our signature batik-inspired embroidery on the chest make this a street-to-gym statement piece.",
    features: [
      "Heavy-gauge French terry fleece",
      "Batik-inspired embroidery on chest",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Adjustable drawstring hood",
    ],
    rating: 4.9,
    reviewCount: 267,
    reviews: [
      {
        id: "r15",
        author: "Brandon W.",
        rating: 5,
        date: "2026-02-15",
        comment:
          "Absolutely love this hoodie. The embroidery is premium and the fabric weight is perfect.",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: true,
    inStock: true,
    tags: ["hoodie", "heritage", "fleece", "bestseller", "Performance + Heritage", "thai"],
  },
  {
    id: "a001",
    name: "SLCKK Pro Gym Bag",
    category: "accessories",
    subcategory: "Bags",
    price: 4290,
    images: [
      "https://images.unsplash.com/photo-1628829706300-d1ed475bfc9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Ash Grey", hex: "#8A8A8A" },
    ],
    sizes: ["One Size"],
    material: "1000D Ballistic Nylon",
    description:
      "The SLCKK Pro Gym Bag is built to last — constructed from military-grade ballistic nylon with heritage-inspired woven details. Separate wet/dry compartments, laptop sleeve, and multiple organization pockets.",
    features: [
      "1000D ballistic nylon construction",
      "Separate wet/dry compartment",
      "Padded laptop sleeve (fits 15\")",
      "Ventilated shoe compartment",
      "Water bottle side pocket",
      "YKK zippers throughout",
    ],
    rating: 4.8,
    reviewCount: 143,
    reviews: [
      {
        id: "r16",
        author: "Tara M.",
        rating: 5,
        date: "2026-01-20",
        comment:
          "This bag is incredibly well made. Fits everything I need for the gym plus my laptop. The quality is exceptional.",
        verified: true,
      },
    ],
    isNew: false,
    isBestseller: false,
    inStock: true,
    tags: ["bag", "gym", "accessories"],
  },
  {
    id: "a002",
    name: "Thermal Insulated Water Bottle",
    category: "accessories",
    subcategory: "Drinkware",
    price: 1590,
    images: [
      "https://images.unsplash.com/photo-1628829706300-d1ed475bfc9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Gold", hex: "#C9A84C" },
      { name: "Slate", hex: "#708090" },
    ],
    sizes: ["500ml", "750ml"],
    material: "18/8 Stainless Steel",
    description:
      "Keep your hydration on point with the SLCKK Thermal Bottle. Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12 hours. Laser-engraved with our heritage motif.",
    features: [
      "Double-wall vacuum insulation",
      "24h cold / 12h hot",
      "Leak-proof lid",
      "Laser-engraved SLCKK heritage motif",
      "BPA-free stainless steel",
    ],
    rating: 4.7,
    reviewCount: 89,
    reviews: [
      {
        id: "r17",
        author: "Laila T.",
        rating: 5,
        date: "2026-02-01",
        comment:
          "Beautiful bottle. Keeps my water ice cold for hours at the gym. The heritage engraving is a lovely detail.",
        verified: true,
      },
    ],
    isNew: true,
    isBestseller: false,
    inStock: true,
    tags: ["bottle", "hydration", "accessories"],
  },
];

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const getFeaturedProducts = () =>
  products.filter((p) => p.isBestseller).slice(0, 4);

export const getNewArrivals = () =>
  products.filter((p) => p.isNew).slice(0, 4);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);
