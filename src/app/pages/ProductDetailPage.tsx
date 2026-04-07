import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Star, Heart, Minus, Plus, Truck, RotateCcw, Shield, ChevronDown, ChevronUp, Share2, Instagram, Facebook, Twitter, Sparkles } from "lucide-react";
import { getProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { TryOnModal } from "../components/TryOnModal";

const sizeGuide = [
  { size: "XS", bust: "30-32\"", waist: "22-24\"", hips: "32-34\"" },
  { size: "S", bust: "32-34\"", waist: "24-26\"", hips: "34-36\"" },
  { size: "M", bust: "34-36\"", waist: "26-28\"", hips: "36-38\"" },
  { size: "L", bust: "36-38\"", waist: "28-30\"", hips: "38-40\"" },
  { size: "XL", bust: "38-40\"", waist: "30-32\"", hips: "40-42\"" },
  { size: "XXL", bust: "40-42\"", waist: "32-34\"", hips: "42-44\"" },
];

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "sizing" | "reviews">("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [tryOnOpen, setTryOnOpen] = useState(false);

  if (!product) {
    return (
      <div className="bg-primary-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary-taupe mb-4">Product not found</p>
          <Link to="/products" className="text-accent-terracotta hover:underline">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    const color = selectedColor || product.colors[0].name;
    addToCart(product, selectedSize, color, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-primary-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-primary-dark/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-[0.7rem] text-primary-taupe/60">
            <Link to="/" className="hover:text-accent-terracotta transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent-terracotta transition-colors">Shop</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-accent-terracotta transition-colors capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-primary-dark">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <motion.div
              className="relative overflow-hidden bg-white aspect-[4/5]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-accent-terracotta text-white px-3 py-1 text-[0.65rem] tracking-[0.12em] font-bold">NEW</span>
              )}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 w-9 h-9 bg-white/80 border border-primary-dark/10 flex items-center justify-center hover:border-accent-terracotta transition-colors"
              >
                <Heart size={16} className={isInWishlist(product.id) ? "fill-accent-terracotta text-accent-terracotta" : "text-primary-dark"} />
              </button>
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-24 overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-accent-terracotta" : "border-primary-dark/10 hover:border-primary-taupe"}`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-accent-terracotta text-[0.7rem] tracking-[0.15em]">{
                product.subcategory.toUpperCase()}
              </span>
              {product.isBestseller && (
                <span className="bg-primary-cream text-primary-taupe px-2 py-0.5 text-[0.6rem] tracking-[0.1em] border border-primary-taupe/30">
                  BESTSELLER
                </span>
              )}
            </div>

            <h1 className="text-primary-dark mb-3 text-3xl font-light leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className={i < Math.floor(product.rating) ? "fill-accent-terracotta text-accent-terracotta" : "text-primary-taupe/30"} />
                ))}
              </div>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-primary-taupe/60 hover:text-accent-terracotta transition-colors text-sm"
              >
                {product.rating} ({product.reviewCount} reviews)
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent-terracotta text-3xl font-light">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-primary-taupe/50 line-through text-lg">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-50 text-red-600 px-2 py-0.5 text-xs border border-red-200">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="text-primary-taupe/70 mb-6 text-sm leading-relaxed">
              {product.description.slice(0, 200)}...
            </p>

            {/* Color */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-primary-dark text-[0.75rem] tracking-[0.1em] font-semibold">
                  COLOUR: <span className="text-accent-terracotta">{selectedColor || product.colors[0].name}</span>
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${(selectedColor || product.colors[0].name) === c.name ? "border-accent-terracotta" : "border-primary-dark/20 hover:border-primary-taupe"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-primary-dark text-[0.75rem] tracking-[0.1em] font-semibold">
                  SIZE{selectedSize && `: ${selectedSize}`}
                </span>
                <button
                  onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                  className="flex items-center gap-1 text-accent-terracotta hover:text-primary-dark transition-colors text-[0.7rem]"
                >
                  SIZE GUIDE {sizeGuideOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              </div>
              {sizeError && !selectedSize && (
                <p className="text-red-500 mb-2 text-[0.75rem]">Please select a size</p>
              )}
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSize(s); setSizeError(false); }}
                    className={`px-3 py-2 border min-w-[3rem] transition-colors text-[0.75rem] ${selectedSize === s
                        ? "border-accent-terracotta text-accent-terracotta bg-accent-terracotta/5"
                        : "border-primary-dark/20 text-primary-taupe hover:border-primary-taupe hover:text-primary-dark"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Size guide table */}
              {sizeGuideOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 border border-primary-dark/10 overflow-x-auto"
                >
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-dark/10 bg-primary-cream">
                        {["Size", "Bust", "Waist", "Hips"].map((h) => (
                          <th key={h} className="px-4 py-2 text-left text-primary-taupe text-[0.7rem] tracking-[0.1em]">{h.toUpperCase()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map((row) => (
                        <tr key={row.size} className="border-b border-primary-dark/5 hover:bg-primary-cream/50 transition-colors">
                          <td className="px-4 py-2 text-accent-terracotta text-sm font-semibold">{row.size}</td>
                          <td className="px-4 py-2 text-primary-dark/70 text-sm">{row.bust}</td>
                          <td className="px-4 py-2 text-primary-dark/70 text-sm">{row.waist}</td>
                          <td className="px-4 py-2 text-primary-dark/70 text-sm">{row.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-primary-dark/20">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-primary-taupe hover:text-primary-dark transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-primary-dark text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-primary-taupe hover:text-primary-dark transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-primary-taupe/60 text-xs">
                {product.inStock ? "In stock — ships in 2-3 days" : "Out of stock"}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 transition-colors text-[0.8rem] tracking-[0.15em] font-bold ${addedToCart
                    ? "bg-accent-sage text-white"
                    : "bg-accent-terracotta text-white hover:bg-accent-terracotta/90"
                  }`}
              >
                {addedToCart ? "✓ ADDED TO BAG" : "ADD TO BAG"}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="w-14 h-14 border border-primary-dark/20 flex items-center justify-center hover:border-accent-terracotta transition-colors flex-shrink-0"
              >
                <Heart size={18} className={isInWishlist(product.id) ? "fill-accent-terracotta text-accent-terracotta" : "text-primary-taupe"} />
              </button>
            </div>

            {/* Virtual Try-On */}
            <button
              onClick={() => setTryOnOpen(true)}
              className="w-full py-3 border-2 border-accent-terracotta/30 text-accent-terracotta hover:bg-accent-terracotta hover:text-white transition-all text-[0.75rem] tracking-[0.15em] font-bold flex items-center justify-center gap-2 mb-6"
            >
              <Sparkles size={16} />
              TRY IT ON
            </button>
            <TryOnModal
              open={tryOnOpen}
              onClose={() => setTryOnOpen(false)}
              garmentImageUrl={product.images[selectedImage]}
              productName={product.name}
              garmentDescription={product.description.slice(0, 100)}
            />

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, text: "Free shipping over $120" },
                { icon: RotateCcw, text: "30-day returns" },
                { icon: Shield, text: "Secure checkout" },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2">
                  <t.icon size={14} className="text-accent-sage flex-shrink-0" />
                  <span className="text-primary-taupe/60 text-xs">{t.text}</span>
                </div>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 pt-4 border-t border-primary-dark/10">
              <span className="text-primary-taupe/50 text-[0.7rem] tracking-[0.1em]">SHARE:</span>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="text-primary-taupe/40 hover:text-accent-terracotta transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16 border-t border-primary-dark/10">
          <div className="flex border-b border-primary-dark/10">
            {(["details", "sizing", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 border-b-2 transition-colors capitalize text-[0.75rem] tracking-[0.12em] ${activeTab === tab
                    ? "border-accent-terracotta text-accent-terracotta"
                    : "border-transparent text-primary-taupe/60 hover:text-primary-dark"
                  }`}
              >
                {tab === "reviews" ? `REVIEWS (${product.reviewCount})` : tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "details" && (
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-primary-dark mb-4 text-xl font-medium">Product Details</h3>
                  <p className="text-primary-taupe/70 mb-6 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="border-t border-primary-dark/10 pt-4 space-y-3">
                    <div className="flex justify-between py-2 border-b border-primary-dark/5">
                      <span className="text-primary-taupe/60 text-sm">Material</span>
                      <span className="text-primary-dark text-sm">{product.material}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-primary-dark/5">
                      <span className="text-primary-taupe/60 text-sm">Care</span>
                      <span className="text-primary-dark text-sm">Machine wash cold</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-primary-taupe/60 text-sm">Origin</span>
                      <span className="text-primary-dark text-sm">Crafted in Thailand</span>
                    </div>
                  </div>

                  {/* Material Story */}
                  <div className="mt-6 p-4 bg-primary-cream border-l-2 border-accent-terracotta">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent-terracotta text-[0.65rem] tracking-widest font-semibold">✦ MATERIAL STORY</span>
                    </div>
                    <p className="text-primary-taupe/70 text-xs leading-relaxed">
                      This piece is crafted from <strong className="text-primary-dark">premium Thai-sourced performance fabric</strong> — a proprietary blend of recycled nylon and elastane woven by artisan mills in Chiang Mai. The fabric undergoes a traditional 3-stage finishing process that enhances moisture-wicking properties while maintaining the soft, second-skin feel Thai textile masters are known for.
                    </p>
                    <p className="text-primary-taupe/70 text-xs leading-relaxed mt-2">
                      Every yard of fabric is produced in facilities that meet <strong className="text-primary-dark">OEKO-TEX® Standard 100</strong> certification, ensuring no harmful substances during production or wear.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-primary-dark mb-4 text-xl font-medium">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-accent-terracotta mt-1 flex-shrink-0">✦</span>
                        <span className="text-primary-taupe/70 text-sm leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "sizing" && (
              <div>
                <h3 className="text-primary-dark mb-4 text-xl font-medium">Size Guide</h3>
                <p className="text-primary-taupe/70 mb-6 text-sm leading-relaxed">
                  Our pieces are designed with an athletic fit in mind. If you're between sizes, we recommend sizing up for a more relaxed fit. All measurements are approximate.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-dark/10 bg-primary-cream">
                        {["Size", "Bust", "Waist", "Hips", "US Size"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-primary-taupe/60 text-[0.7rem] tracking-widest">{h.toUpperCase()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map((row, i) => (
                        <tr key={row.size} className={`border-b border-primary-dark/5 ${i % 2 === 0 ? "" : "bg-primary-cream/50"}`}>
                          <td className="px-5 py-3 text-accent-terracotta text-sm font-semibold">{row.size}</td>
                          <td className="px-5 py-3 text-primary-dark/70 text-sm">{row.bust}</td>
                          <td className="px-5 py-3 text-primary-dark/70 text-sm">{row.waist}</td>
                          <td className="px-5 py-3 text-primary-dark/70 text-sm">{row.hips}</td>
                          <td className="px-5 py-3 text-primary-dark/70 text-sm">{["0-2", "4-6", "8-10", "12-14", "16-18", "20-22"][i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 bg-primary-cream border-l-2 border-accent-sage">
                  <p className="text-primary-taupe/80 text-xs leading-relaxed">
                    <strong className="text-primary-dark">Fit Tip:</strong> SLICKK garments are designed with a Thai aesthetic in mind — a slightly shorter rise and longer torso length compared to Western sizing. For tops, our fit expert recommends measuring your natural waist rather than bust for the best fit.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-primary-dark mb-1 text-xl font-medium">Customer Reviews</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-accent-terracotta text-accent-terracotta" : "text-primary-taupe/20"} />
                        ))}
                      </div>
                      <span className="text-primary-dark text-xl">{product.rating}</span>
                      <span className="text-primary-taupe/60 text-sm">
                        based on {product.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-primary-dark/10 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-primary-dark text-sm font-semibold">{review.author}</span>
                            {review.verified && (
                              <span className="text-accent-sage text-[0.65rem] tracking-widest">✓ VERIFIED</span>
                            )}
                          </div>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} className={i < review.rating ? "fill-accent-terracotta text-accent-terracotta" : "text-primary-taupe/20"} />
                            ))}
                          </div>
                        </div>
                        <span className="text-primary-taupe/50 text-xs">
                          {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <p className="text-primary-taupe/70 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Complete the Look – Related Products */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-primary-dark/10 pt-12">
            <div className="text-center mb-8">
              <span className="text-accent-terracotta text-[0.7rem] tracking-widest font-semibold">STYLING</span>
              <h2 className="text-primary-dark mt-2 text-3xl font-light">
                Complete the Look
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-white aspect-[3/4]">
                    <Link to={`/products/${p.id}`}>
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </Link>
                  </div>
                  <div className="mt-3">
                    <Link to={`/products/${p.id}`}>
                      <h4 className="text-primary-dark hover:text-accent-terracotta transition-colors text-sm font-medium">{p.name}</h4>
                      <span className="text-accent-terracotta text-sm font-semibold">${p.price}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
