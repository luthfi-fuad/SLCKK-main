import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw, Award } from "lucide-react";
import { products, getFeaturedProducts, getNewArrivals } from "../data/products";
import { blogPosts } from "../data/blog";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

// Image references
const bannerImg = "/images/image (1).webp";
const img2 = "/images/image (2).webp";
const img3 = "/images/image (3).webp";
const img4 = "/images/image (4).webp";
const img6 = "/images/image (6).webp";
const img7 = "/images/image (7).webp";
const img8 = "/images/image (8).webp";
const img9 = "/images/image (9).webp";
const img10 = "/images/image (10).webp";
const img11 = "/images/image (11).webp";
const imgCopy = "/images/image copy.png";

// Thai geometric SVG pattern for backgrounds
const ThaiPattern = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.03]"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: "none" }}
  >
    <defs>
      <pattern id="thai-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="60" height="60" fill="none" stroke="#C4B5A0" strokeWidth="0.5" />
        <rect x="15" y="15" width="30" height="30" fill="none" stroke="#C4B5A0" strokeWidth="0.5" transform="rotate(45 30 30)" />
        <circle cx="30" cy="30" r="5" fill="none" stroke="#C4B5A0" strokeWidth="0.5" />
        <line x1="0" y1="30" x2="14" y2="30" stroke="#C4B5A0" strokeWidth="0.5" />
        <line x1="46" y1="30" x2="60" y2="30" stroke="#C4B5A0" strokeWidth="0.5" />
        <line x1="30" y1="0" x2="30" y2="14" stroke="#C4B5A0" strokeWidth="0.5" />
        <line x1="30" y1="46" x2="30" y2="60" stroke="#C4B5A0" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#thai-pattern)" />
  </svg>
);

// Kranok flame divider — subtle Thai flame motif between sections
const KranokDivider = ({ light = false }: { light?: boolean }) => (
  <div className="flex items-center justify-center py-6 gap-4 overflow-hidden">
    <div className={`flex-1 h-px ${light ? "bg-white/10" : "bg-primary-dark/10"}`} />
    <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 flex-shrink-0">
      {/* Kranok flame chain pattern */}
      {[0, 20, 40, 60, 80, 100].map((x, i) => (
        <g key={i} transform={`translate(${x}, 0)`}>
          <path
            d="M10 22 C10 22 4 16 4 10 C4 5 7 2 10 2 C13 2 16 5 16 10 C16 16 10 22 10 22Z"
            fill={light ? "#E8D5B0" : "#8B4513"}
            opacity="0.6"
          />
          <ellipse cx="10" cy="8" rx="3" ry="4" fill={light ? "#C9A84C" : "#C4714B"} opacity="0.5" />
        </g>
      ))}
    </svg>
    <div className={`flex-1 h-px ${light ? "bg-white/10" : "bg-primary-dark/10"}`} />
  </div>
);

function ProductCard({ product }: { product: typeof products[0] }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const hasHeritagTag = product.tags.includes("Performance + Heritage");

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-primary-cream/20 aspect-[3/4]">
        <img
          src={product.images[hovered && product.images[1] ? 1 : 0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-accent-terracotta text-white px-2 py-0.5 text-[0.65rem] tracking-[0.1em] font-bold">
            NEW
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-0.5 text-[0.65rem] tracking-[0.1em] font-bold">
            SALE
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 w-8 h-8 bg-primary-cream/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <Heart
            size={15}
            className={isInWishlist(product.id) ? "fill-accent-terracotta text-accent-terracotta" : "text-primary-dark"}
          />
        </button>
        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary-dark/90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product, product.sizes[1] || product.sizes[0], product.colors[0].name)}
            className="w-full text-primary-cream hover:text-accent-terracotta transition-colors text-[0.7rem] tracking-[0.15em] font-semibold"
          >
            QUICK ADD — {product.sizes.slice(0, 4).join(" / ")}
          </button>
        </div>
      </div>
      <div className="mt-3 px-1">
        <Link to={`/products/${product.id}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary-taupe text-[0.7rem] tracking-[0.1em]">
                {product.subcategory.toUpperCase()}
              </p>
              <h3 className="text-primary-dark mt-0.5 hover:text-accent-terracotta transition-colors text-base font-medium">
                {product.name}
              </h3>
              {(product as any).subtitle && (
                <p className="text-primary-taupe/60 text-[0.65rem] italic mt-0.5">{(product as any).subtitle}</p>
              )}
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              {product.originalPrice && (
                <p className="text-primary-taupe/60 line-through text-sm">
                  ฿{product.originalPrice.toLocaleString()}
                </p>
              )}
              <p className="text-accent-terracotta text-sm font-semibold">
                ฿{product.price.toLocaleString()}
              </p>
            </div>
          </div>
          {hasHeritagTag && (
            <div className="mt-1.5">
              <span className="inline-block bg-accent-terracotta/10 border border-accent-terracotta/30 text-accent-terracotta text-[0.55rem] tracking-[0.1em] px-2 py-0.5 font-semibold">
                ✦ PERFORMANCE + HERITAGE
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? "fill-accent-terracotta text-accent-terracotta" : "text-primary-taupe/30"}
              />
            ))}
            <span className="text-primary-taupe/50 ml-1 text-[0.7rem]">
              ({product.reviewCount})
            </span>
          </div>
        </Link>
        {/* Color swatches */}
        <div className="flex gap-1.5 mt-2">
          {product.colors.map((c) => (
            <div
              key={c.name}
              title={c.name}
              className="w-3.5 h-3.5 rounded-full border border-primary-taupe/30 cursor-pointer hover:border-accent-terracotta transition-colors"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    { tagline: "Heritage in Motion", cta: "Explore Collection", href: "/products" },
    { tagline: "Where Heritage Meets Movement", cta: "Shop Women's", href: "/products?category=women" },
  ];

  useEffect(() => {
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % 2), 7000);
    return () => clearInterval(t);
  }, []);

  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="bg-primary-cream min-h-screen">

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <img
          src={bannerImg}
          alt="Where Heritage Meets Movement"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlays for banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <motion.div
              key={`tagline-${heroIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent-terracotta" />
                <span className="text-accent-terracotta text-[0.75rem] tracking-[0.2em] font-semibold">
                  THAI-INSPIRED GYMWEAR · เสื้อออกกำลังกาย
                </span>
              </div>
            </motion.div>

            <motion.h1
              key={`headline-${heroIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, lineHeight: "1.1", letterSpacing: "0.02em" }}
            >
              Where Heritage
              <br /> <em className="italic">Meets Movement</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-white/75 mb-8 max-w-sm text-sm leading-relaxed"
            >
              Premium athleisure rooted in Thai culture — designed for the fashion-conscious generation that refuses to choose between performance and identity.
            </motion.p>

            <motion.div
              key={`cta-${heroIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex gap-4 flex-wrap"
            >
              <Link
                to="/products"
                className="bg-accent-terracotta text-white px-8 py-3.5 hover:bg-accent-terracotta/90 transition-colors flex items-center gap-2 text-[0.8rem] tracking-[0.15em] font-bold"
              >
                SHOP COLLECTION
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/blog"
                className="border border-white/40 text-white px-8 py-3.5 hover:border-white hover:bg-white/10 transition-colors text-[0.8rem] tracking-[0.15em]"
              >
                OUR STORY
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero navigation dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-0.5 transition-all duration-300 ${i === heroIndex ? "w-8 bg-accent-terracotta" : "w-4 bg-white/40"}`}
            />
          ))}
        </div>
        <button onClick={() => setHeroIndex((heroIndex - 1 + 2) % 2)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:border-accent-terracotta hover:text-accent-terracotta transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setHeroIndex((heroIndex + 1) % 2)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:border-accent-terracotta hover:text-accent-terracotta transition-colors">
          <ChevronRight size={18} />
        </button>
      </section>

      {/* ── PROMO MARQUEE ── */}
      <section className="relative bg-black border-y border-accent-terracotta/20 py-3.5 overflow-hidden">
        {/* Textile pattern background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: "none" }}>
          <defs>
            <pattern id="textile-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="120" height="120" fill="none" stroke="#E8D5B0" strokeWidth="1" />
              <circle cx="30" cy="30" r="8" fill="none" stroke="#E8D5B0" strokeWidth="1" />
              <circle cx="90" cy="30" r="8" fill="none" stroke="#E8D5B0" strokeWidth="1" />
              <circle cx="30" cy="90" r="8" fill="none" stroke="#E8D5B0" strokeWidth="1" />
              <circle cx="90" cy="90" r="8" fill="none" stroke="#E8D5B0" strokeWidth="1" />
              <path d="M60 0 L60 120 M0 60 L120 60" stroke="#E8D5B0" strokeWidth="0.5" opacity="0.5" />
              <polyline points="0,0 30,20 60,0 90,20 120,0" fill="none" stroke="#E8D5B0" strokeWidth="1" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#textile-pattern)" />
        </svg>
        <div className="relative flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8 px-8 text-accent-terracotta text-[0.75rem] tracking-[0.2em]">
              <span>✦ HERITAGE10 — 10% OFF FIRST ORDER</span>
              <span>✦ จัดส่งฟรีเมื่อซื้อครบ ฿3,500</span>
              <span>✦ NEW THAI COLLECTION NOW LIVE</span>
              <span>✦ คืนสินค้าภายใน 30 วัน</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section className="relative py-24 overflow-hidden">
        <ThaiPattern />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent-terracotta text-[0.7rem] tracking-[0.25em] font-semibold">THE COLLECTION · คอลเลกชัน</span>
            <h2 className="mt-2 text-primary-dark text-4xl font-light">Designed for Every Move</h2>
            <div className="w-16 h-px bg-accent-terracotta mx-auto mt-4" />
          </div>

          {/* Main product feature */}
          <div className="grid lg:grid-cols-2 gap-3 mb-3">
            <motion.div
              className="relative overflow-hidden group aspect-[3/4] lg:aspect-auto lg:h-[600px]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img src={img3} alt="Kranok Tube Top" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-accent-terracotta text-[0.65rem] tracking-widest">TOPS · เสื้อ</span>
                <h3 className="text-white text-2xl font-light mt-1">Kranok Tube Top</h3>
                <p className="text-white/60 text-[0.7rem] italic mt-0.5">Inspired by Kranok flame motifs</p>
                <Link to="/products?category=women&sub=Tops" className="inline-flex items-center gap-2 mt-3 text-white/80 hover:text-white text-[0.75rem] tracking-widest transition-colors">
                  SHOP NOW <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-rows-2 gap-3">
              <motion.div
                className="relative overflow-hidden group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img src={img4} alt="Heritage Leggings" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-accent-terracotta text-[0.65rem] tracking-widest">BOTTOMS · กางเกง</span>
                  <h3 className="text-white text-xl font-light mt-1">Heritage Leggings</h3>
                  <p className="text-white/60 text-[0.7rem] italic mt-0.5">Inspired by Mudmee tie-dye silk</p>
                  <Link to="/products?category=women&sub=Leggings" className="inline-flex items-center gap-2 mt-2 text-white/80 hover:text-white text-[0.75rem] tracking-widest transition-colors">
                    SHOP NOW <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>

              {/* Detail shots row */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div className="relative overflow-hidden group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
                  <img src={img6} alt="Crossover Tank" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary-dark/20 group-hover:bg-primary-dark/10 transition-colors" />
                  <div className="absolute top-3 left-3">
                    <span className="text-white/80 text-[0.6rem] tracking-widest bg-primary-dark/40 px-2 py-1">DETAIL</span>
                  </div>
                </motion.div>
                <motion.div className="relative overflow-hidden group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
                  <img src={img7} alt="Asymmetric Sports Bra" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary-dark/20 group-hover:bg-primary-dark/10 transition-colors" />
                  <div className="absolute top-3 left-3">
                    <span className="text-white/80 text-[0.6rem] tracking-widest bg-primary-dark/40 px-2 py-1">CRAFT</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/products" className="inline-flex items-center gap-2 border border-primary-dark text-primary-dark px-10 py-3.5 hover:bg-primary-dark hover:text-primary-cream transition-colors text-[0.8rem] tracking-[0.15em]">
              VIEW ALL PRODUCTS <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="py-10 bg-primary-dark border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", sub: "On orders over ฿3,500" },
              { icon: RotateCcw, title: "Easy Returns", sub: "30-day hassle-free" },
              { icon: Shield, title: "SSL Secured", sub: "Your data protected" },
              { icon: Award, title: "Premium Quality", sub: "Thai-crafted materials" },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-accent-terracotta/40 flex items-center justify-center flex-shrink-0">
                  <b.icon size={18} className="text-accent-terracotta" />
                </div>
                <div>
                  <div className="text-primary-cream text-sm font-semibold">{b.title}</div>
                  <div className="text-primary-taupe/60 text-xs">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KRANOK DIVIDER ── */}
      <div className="bg-primary-cream px-4">
        <KranokDivider />
      </div>

      {/* ── HERITAGE MATERIALS SECTION ── */}
      <section className="relative py-20 overflow-hidden bg-primary-cream">
        <ThaiPattern />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent-terracotta text-[0.7rem] tracking-[0.25em] font-semibold">วัตถุดิบมรดก · HERITAGE MATERIALS</span>
            <h2 className="mt-2 text-primary-dark text-4xl font-light">Woven From the Land</h2>
            <p className="text-primary-taupe mt-3 max-w-lg mx-auto text-sm leading-relaxed">
              Every SLICKK fabric tells a story of Thailand's ancient textile traditions — materials that have clothed artisans, warriors, and royalty for centuries.
            </p>
            <div className="w-16 h-px bg-accent-terracotta mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🪡",
                thai: "ผ้าฝ้ายคราม",
                name: "Khram Indigo Cotton",
                desc: "Hand-dyed with fermented indigo leaves from Northern Thailand. Used for centuries to create the deep blue that defines Thai hill-tribe identity.",
                color: "#1C2B5E",
              },
              {
                icon: "✦",
                thai: "ผ้าไหมมัดหมี่",
                name: "Mudmee Silk Details",
                desc: "The ancient tie-dye silk weaving technique from Isan — each thread bound and dyed before weaving to create intricate patterns only revealed at loom.",
                color: "#7A1A1A",
              },
              {
                icon: "🧵",
                thai: "ผ้าฝ้ายปกาเกอะญอ",
                name: "Karen Cotton Blend",
                desc: "Handwoven by Karen hill-tribe artisans of the highland borderlands, blended with performance fibres to bring traditional craftsmanship into activewear.",
                color: "#5C3D1E",
              },
            ].map((fabric) => (
              <motion.div
                key={fabric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative border border-primary-dark/10 bg-white/60 p-8 hover:border-accent-terracotta/40 transition-colors"
              >
                {/* Color swatch accent */}
                <div className="w-full h-1 mb-6" style={{ backgroundColor: fabric.color, opacity: 0.6 }} />
                <div className="text-3xl mb-3">{fabric.icon}</div>
                <p className="text-primary-taupe text-[0.65rem] tracking-[0.1em] mb-1">{fabric.thai}</p>
                <h3 className="text-primary-dark text-lg font-semibold mb-3">{fabric.name}</h3>
                <p className="text-primary-taupe/80 text-sm leading-relaxed">{fabric.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-terracotta scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KRANOK DIVIDER ── */}
      <div className="bg-primary-cream px-4">
        <KranokDivider />
      </div>

      {/* ── LIFESTYLE GALLERY ── */}
      <section className="relative py-24 overflow-hidden bg-primary-cream">
        <ThaiPattern />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent-sage text-[0.7rem] tracking-[0.25em] font-semibold">LIFESTYLE · ไลฟ์สไตล์</span>
            <h2 className="mt-2 text-primary-dark text-4xl font-light">Live in SLICKK</h2>
            <p className="text-primary-taupe mt-3 max-w-md mx-auto text-sm leading-relaxed">
              From city streets to training grounds — Thai-inspired design that moves with you everywhere.
            </p>
          </div>

          {/* 3-column lifestyle grid */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <motion.div
              className="relative overflow-hidden group aspect-[3/4]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img src={img2} alt="Casual market scene" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors" />
            </motion.div>
            <motion.div
              className="relative overflow-hidden group aspect-[3/4] mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img src={img8} alt="Sleek Crop Top" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors" />
            </motion.div>
            <motion.div
              className="relative overflow-hidden group aspect-[3/4]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img src={img9} alt="Urban Track Jacket" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <motion.div
              className="relative overflow-hidden group h-64"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img src={img10} alt="Meridian Set Burgundy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors" />
            </motion.div>
            <motion.div
              className="relative overflow-hidden group h-64"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img src={img11} alt="Meridian Set Wine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors" />
            </motion.div>
          </div>

          <div className="text-center">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-taupe hover:text-accent-terracotta transition-colors text-[0.75rem] tracking-widest">
              FOLLOW @SLICKK.OFFICIAL <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="relative py-24 bg-primary-dark overflow-hidden">
        <ThaiPattern />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: brand image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={img8}
                alt="Performance meets culture"
                className="w-full h-96 lg:h-[520px] object-cover"
              />
              {/* Decorative corner border */}
              <div className="absolute -bottom-4 -right-4 w-40 h-40 border border-accent-terracotta/30 hidden lg:block pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-40 h-40 border border-accent-terracotta/15 hidden lg:block pointer-events-none" />
            </motion.div>

            {/* Right: story text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent-terracotta" />
                <span className="text-accent-terracotta text-[0.7rem] tracking-[0.2em]">เรื่องราวของเรา · OUR STORY</span>
              </div>
              <h2 className="text-primary-cream mb-6 text-4xl font-light leading-tight">
                Born From Tradition,<br />
                <em>Built For Today</em>
              </h2>
              <p className="text-primary-taupe/80 mb-4 text-sm leading-relaxed">
                SLICKK was born at the crossroads of Thai heritage and modern performance. We believe that the rich athletic and cultural traditions of Thailand deserve to be celebrated in every garment, every stitch, every movement.
              </p>
              <p className="text-primary-taupe/80 mb-8 text-sm leading-relaxed">
                Our pieces are engineered for peak performance and infused with heritage-inspired design — a tribute to the artisans and athletes who crafted Thailand's legacy of excellence.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: "Countries", value: "7+" },
                  { label: "Athletes", value: "5K+" },
                  { label: "Heritage Patterns", value: "23" },
                ].map((s) => (
                  <div key={s.label} className="border-l border-accent-terracotta/40 pl-4">
                    <div className="text-primary-cream text-2xl font-light">{s.value}</div>
                    <div className="text-primary-taupe/50 text-[0.7rem] tracking-widest mt-0.5">{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border border-accent-terracotta text-accent-terracotta px-6 py-3 hover:bg-accent-terracotta hover:text-white transition-colors text-[0.75rem] tracking-[0.15em]"
              >
                READ OUR STORY <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* Founder section */}
          <div className="mt-20 pt-20 border-t border-white/10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-accent-sage" />
                  <span className="text-accent-sage text-[0.7rem] tracking-[0.2em]">THE TEAM</span>
                </div>
                <h2 className="text-primary-cream mb-4 text-3xl font-light">
                  Crafted with Purpose,<br />Worn with Pride
                </h2>
                <p className="text-primary-taupe/80 mb-6 text-sm leading-relaxed">
                  Every member of the SLICKK team is deeply connected to Thai culture and athletic excellence. We draw from traditional textile arts, silhouette design, and performance engineering to create something truly unique.
                </p>
                <Link to="/blog" className="inline-flex items-center gap-2 text-primary-taupe/70 hover:text-accent-terracotta transition-colors text-[0.75rem] tracking-widest">
                  MEET THE TEAM <ArrowRight size={12} />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group"
              >
                <img src={imgCopy} alt="SLICKK team and model showcase" className="w-full h-80 object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="relative py-24 overflow-hidden">
        <ThaiPattern />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent-terracotta text-[0.7rem] tracking-[0.2em] font-semibold">COMMUNITY FAVOURITES · ยอดนิยม</span>
              <h2 className="text-primary-dark mt-2 text-4xl font-light">Bestsellers</h2>
            </div>
            <Link
              to="/products?filter=bestseller"
              className="hidden sm:flex items-center gap-2 text-accent-terracotta hover:text-primary-dark transition-colors text-[0.75rem] tracking-[0.1em]"
            >
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL WIDTH EDITORIAL BANNER ── */}
      <section className="relative py-28 overflow-hidden">
        <img
          src={bannerImg}
          alt="SLICKK editorial"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-accent-terracotta text-[0.7rem] tracking-[0.25em]">LIMITED EDITION · คอลเลกชันพิเศษ</span>
            <h2 className="text-primary-cream mt-3 mb-4 text-4xl lg:text-5xl font-light leading-tight">
              The Thai Heritage Collection
            </h2>
            <p className="text-primary-taupe/80 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Co-created with master textile artisans from Chiang Mai. Each piece carries centuries of craftsmanship into a modern silhouette. Limited quantities available.
            </p>
            <Link
              to="/products?filter=new"
              className="inline-flex items-center gap-2 bg-accent-terracotta text-white px-10 py-4 hover:bg-accent-terracotta/90 transition-colors text-[0.8rem] tracking-[0.15em] font-bold"
            >
              SHOP THE COLLECTION <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="py-24 bg-primary-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent-terracotta text-[0.7rem] tracking-[0.2em] font-semibold">JUST DROPPED · ใหม่ล่าสุด</span>
              <h2 className="text-primary-dark mt-2 text-4xl font-light">New Arrivals</h2>
            </div>
            <Link
              to="/products?filter=new"
              className="hidden sm:flex items-center gap-2 text-accent-terracotta hover:text-primary-dark transition-colors text-[0.75rem] tracking-[0.1em]"
            >
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── KRANOK DIVIDER (dark) ── */}
      <div className="bg-primary-dark px-4">
        <KranokDivider light />
      </div>

      {/* ── CULTURAL STORYTELLING SECTION ── */}
      <section className="relative py-24 bg-primary-dark overflow-hidden">
        <ThaiPattern />
        {/* Subtle deep-red accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #7A1A1A 0%, #C4714B 50%, #1C2B5E 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent-terracotta text-[0.7rem] tracking-[0.25em] font-semibold">ช่างฝีมือไทย · THAI ARTISANS</span>
            <h2 className="mt-3 mb-2 text-primary-cream text-3xl lg:text-4xl font-light leading-snug">
              จากช่างฝีมือไทย สู่นักกีฬาสมัยใหม่
            </h2>
            <h3 className="text-primary-taupe/70 text-xl font-light italic mb-4">
              From Thai Artisans to Modern Athletes
            </h3>
            <div className="w-16 h-px bg-accent-terracotta mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                number: "01",
                thai: "ความร่วมมือ",
                title: "Chaipattana Foundation",
                desc: "Crafted in collaboration with the Chaipattana Foundation — His Majesty King Bhumibol's legacy project empowering Thai rural artisans. Our partnership ensures every purchase directly supports traditional craftspeople.",
                accent: "#7A1A1A",
              },
              {
                number: "02",
                thai: "เรื่องราว",
                title: "Each Piece Tells a Story",
                desc: "Each piece tells a story of Thai craftsmanship — from the indigo-dyed fields of the North to the silk looms of Northeast Isan. When you wear SLICKK, you wear centuries of tradition.",
                accent: "#1C2B5E",
              },
              {
                number: "03",
                thai: "มรดก",
                title: "Heritage in Every Stitch",
                desc: "Our master weavers and artisan partners are named in every garment's label. แต่ละชิ้นมีชื่อช่างที่สร้างสรรค์ผืนผ้า — each garment bears the name of the artisan who wove its fabric.",
                accent: "#5C3D1E",
              },
            ].map((item) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-[3rem] font-light leading-none mb-4" style={{ color: item.accent, opacity: 0.4 }}>{item.number}</div>
                <div className="h-0.5 w-12 mb-4" style={{ backgroundColor: item.accent }} />
                <p className="text-primary-taupe/50 text-[0.65rem] tracking-[0.15em] mb-1">{item.thai}</p>
                <h3 className="text-primary-cream text-xl font-light mb-3">{item.title}</h3>
                <p className="text-primary-taupe/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Quote block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative border border-accent-terracotta/20 p-10 text-center max-w-3xl mx-auto"
          >
            <div className="absolute -top-px left-1/2 -translate-x-1/2 px-6 bg-primary-dark">
              <span className="text-accent-terracotta text-[0.65rem] tracking-[0.2em]">✦ SLICKK PHILOSOPHY ✦</span>
            </div>
            <p className="text-primary-cream/90 text-xl lg:text-2xl font-light italic leading-relaxed mb-4">
              "Performance is not separate from identity. It is identity."
            </p>
            <p className="text-primary-taupe/60 text-sm">
              "สมรรถภาพไม่ใช่สิ่งแยกจากตัวตน มันคือตัวตน"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-primary-dark relative overflow-hidden border-t border-white/5">
        <ThaiPattern />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent-sage text-[0.7rem] tracking-[0.2em] font-semibold">COMMUNITY VOICES · เสียงจากชุมชน</span>
            <h2 className="text-primary-cream mt-2 text-4xl font-light">What Our Athletes Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Aisha K.",
                location: "Bangkok, TH",
                quote: "Finally a brand that understands both performance and cultural identity. The Heritage Leggings are the best I've ever worn — ใส่ดีมากค่ะ.",
                rating: 5,
                product: "Heritage Leggings",
              },
              {
                name: "Rahim S.",
                location: "Singapore, SG",
                quote: "SLICKK delivers on every level — the fabric technology is exceptional and the Thai-inspired design makes it so much more than just gymwear.",
                rating: 5,
                product: "Urban Track Jacket",
              },
              {
                name: "Priya N.",
                location: "Chiang Mai, TH",
                quote: "I love how SLICKK honors Thai artisans while creating genuinely world-class activewear. งานสวยมาก — this is representation done right.",
                rating: 5,
                product: "Meridian Set (Burgundy)",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="fill-accent-terracotta text-accent-terracotta" />
                  ))}
                </div>
                <p className="text-primary-taupe/80 mb-6 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-primary-cream text-sm font-semibold">{t.name}</div>
                  <div className="text-primary-taupe/50 text-xs mt-0.5">{t.location} · {t.product}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG SECTION ── */}
      <section className="py-20 relative overflow-hidden">
        <ThaiPattern />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-accent-terracotta text-[0.7rem] tracking-[0.2em] font-semibold">JOURNAL · บันทึก</span>
              <h2 className="text-primary-dark mt-2 text-4xl font-light">From the Blog</h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:flex items-center gap-2 text-accent-terracotta hover:text-primary-dark transition-colors text-[0.75rem] tracking-[0.1em]"
            >
              ALL ARTICLES <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="overflow-hidden aspect-video mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent-terracotta text-[0.65rem] tracking-[0.15em]">{post.category.toUpperCase()}</span>
                    <span className="text-primary-taupe/40">·</span>
                    <span className="text-primary-taupe/60 text-[0.7rem]">{post.readTime} min read</span>
                  </div>
                  <h3 className="text-primary-dark group-hover:text-accent-terracotta transition-colors mb-2 text-lg font-medium leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-primary-taupe/70 text-sm leading-relaxed">
                    {post.excerpt.slice(0, 100)}...
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
