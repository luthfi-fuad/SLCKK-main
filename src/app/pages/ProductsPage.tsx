import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Filter, X, SlidersHorizontal, Star, Heart, ChevronDown } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const CATEGORIES = ["All", "Women", "Men", "Accessories"];
const SUBCATEGORIES = {
  women: ["Sports Bras", "Leggings", "Shorts", "Tops", "Hoodies"],
  men: ["T-Shirts", "Shorts", "Joggers", "Hoodies", "Compression Shorts"],
  accessories: ["Bags", "Drinkware"],
};
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "new" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
];

// Kranok flame divider (light version for dark bg)
const KranokDivider = () => (
  <div className="flex items-center justify-center py-4 gap-4 overflow-hidden">
    <div className="flex-1 h-px bg-white/10" />
    <svg width="80" height="18" viewBox="0 0 80 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30 flex-shrink-0">
      {[0, 16, 32, 48, 64].map((x, i) => (
        <g key={i} transform={`translate(${x}, 0)`}>
          <path
            d="M8 17 C8 17 2 12 2 7.5 C2 3.5 4.5 1 8 1 C11.5 1 14 3.5 14 7.5 C14 12 8 17 8 17Z"
            fill="#C9A84C"
            opacity="0.7"
          />
          <ellipse cx="8" cy="6" rx="2.5" ry="3" fill="#E8D5B0" opacity="0.5" />
        </g>
      ))}
    </svg>
    <div className="flex-1 h-px bg-white/10" />
  </div>
);

function ProductCard({ product }: { product: typeof products[0] }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const hasHeritageTag = product.tags.includes("Performance + Heritage");

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-[#111111] aspect-[3/4]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images[hovered && product.images[1] ? 1 : 0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#0A0A0A] px-2 py-0.5" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
            NEW
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span className="absolute top-3 left-3 bg-[#333333] text-white px-2 py-0.5" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
            BESTSELLER
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-0.5" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
            SALE
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 w-8 h-8 bg-[#0A0A0A]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={14} className={isInWishlist(product.id) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-white"} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A]/90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product, product.sizes[1] || product.sizes[0], product.colors[0].name)}
            className="w-full text-white hover:text-[#C9A84C] transition-colors"
            style={{ fontSize: "0.65rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            QUICK ADD
          </button>
        </div>
      </div>
      <div className="mt-3">
        <Link to={`/products/${product.id}`}>
          <p className="text-[#888888]" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
            {product.subcategory.toUpperCase()}
          </p>
          <div className="flex justify-between items-start mt-0.5">
            <div className="flex-1 pr-2">
              <h3 className="text-white hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", fontWeight: 500 }}>
                {product.name}
              </h3>
              {(product as any).subtitle && (
                <p className="text-[#666666] italic mt-0.5" style={{ fontSize: "0.65rem", fontFamily: "Inter, sans-serif" }}>
                  {(product as any).subtitle}
                </p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              {product.originalPrice && (
                <div className="text-[#666666] line-through" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>฿{product.originalPrice.toLocaleString()}</div>
              )}
              <div className="text-[#C9A84C]" style={{ fontSize: "0.85rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>฿{product.price.toLocaleString()}</div>
            </div>
          </div>

          {/* Performance + Heritage badge */}
          {hasHeritageTag && (
            <div className="mt-1.5">
              <span
                className="inline-block px-2 py-0.5 border border-[#C9A84C]/30 text-[#C9A84C]"
                style={{ fontSize: "0.55rem", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", background: "rgba(201,168,76,0.08)" }}
              >
                ✦ PERFORMANCE + HERITAGE
              </span>
            </div>
          )}

          {/* Thai motif description */}
          {(product as any).thaiMotif && (
            <p className="text-[#555555] mt-1" style={{ fontSize: "0.6rem", fontFamily: "Inter, sans-serif", fontStyle: "italic" }}>
              {(product as any).thaiMotif}
            </p>
          )}

          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={9} className={i < Math.floor(product.rating) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-[#333333]"} />
            ))}
            <span className="text-[#666666] ml-1" style={{ fontSize: "0.65rem", fontFamily: "Inter, sans-serif" }}>({product.reviewCount})</span>
          </div>
        </Link>
        <div className="flex gap-1.5 mt-1.5">
          {product.colors.map((c) => (
            <div key={c.name} title={c.name} className="w-3 h-3 rounded-full border border-[#333333] cursor-pointer hover:border-[#C9A84C] transition-colors" style={{ backgroundColor: c.hex }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 7000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const categoryParam = searchParams.get("category") || "";
  const subParam = searchParams.get("sub") || "";
  const filterParam = searchParams.get("filter") || "";
  const searchParam = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(
    categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : "All"
  );
  const [activeSub, setActiveSub] = useState(subParam || "");

  useEffect(() => {
    setActiveCategory(categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : "All");
    setActiveSub(subParam || "");
  }, [categoryParam, subParam]);

  const allColors = useMemo(() => {
    const colorSet = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => colorSet.set(c.name, c.hex)));
    return Array.from(colorSet.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory.toLowerCase());
    }

    if (activeSub) {
      result = result.filter((p) => p.subcategory === activeSub);
    }

    if (filterParam === "new") result = result.filter((p) => p.isNew);
    if (filterParam === "bestseller") result = result.filter((p) => p.isBestseller);
    if (filterParam === "sale") result = result.filter((p) => !!p.originalPrice);

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)));
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    }

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "new": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return result;
  }, [activeCategory, activeSub, filterParam, searchParam, priceRange, selectedSizes, selectedColors, sortBy]);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const toggleColor = (c: string) =>
    setSelectedColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  const clearFilters = () => {
    setPriceRange([0, 7000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setActiveCategory("All");
    setActiveSub("");
    setSearchParams({});
  };

  const title = searchParam
    ? `Search: "${searchParam}"`
    : filterParam === "new"
      ? "New Arrivals"
      : filterParam === "bestseller"
        ? "Bestsellers"
        : filterParam === "sale"
          ? "Sale"
          : activeCategory === "All"
            ? "All Products"
            : `${activeCategory}'s Collection`;

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#2A2A2A] py-10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-4" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif", color: "#666666" }}>
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#888888]">{title}</span>
          </nav>
          <h1 className="text-white" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.5rem", fontWeight: 300 }}>
            {title}
          </h1>
          <p className="text-[#888888] mt-1" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Heritage tagline */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#C9A84C] text-[0.6rem] tracking-[0.15em]">✦</span>
            <span className="text-[#666666] text-[0.65rem] tracking-[0.1em] italic" style={{ fontFamily: "Inter, sans-serif" }}>
              ผ้าไทยมรดก · Crafted with Thai Heritage Materials
            </span>
          </div>
        </div>
      </div>

      {/* Kranok divider under header */}
      <div className="border-b border-[#1A1A1A]">
        <KranokDivider />
      </div>

      {/* Category Tabs */}
      <div className="border-b border-[#2A2A2A] overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveSub("");
                if (cat === "All") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category: cat.toLowerCase() });
                }
              }}
              className={`px-5 py-3.5 border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeCategory === cat
                  ? "border-[#C9A84C] text-[#C9A84C]"
                  : "border-transparent text-[#888888] hover:text-white"
                }`}
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 border border-[#2A2A2A] text-[#888888] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors px-4 py-2"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
            >
              <SlidersHorizontal size={14} />
              FILTERS
            </button>
            {activeCategory !== "All" && activeCategory !== "Accessories" && (
              <div className="hidden sm:flex gap-2">
                {(SUBCATEGORIES[activeCategory.toLowerCase() as keyof typeof SUBCATEGORIES] || []).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSub(activeSub === sub ? "" : sub)}
                    className={`px-3 py-1.5 border transition-colors ${activeSub === sub
                        ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
                        : "border-[#2A2A2A] text-[#666666] hover:border-[#888888] hover:text-white"
                      }`}
                    style={{ fontSize: "0.65rem", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
            {(selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 7000) && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-[#888888] hover:text-red-400 transition-colors" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 border border-[#2A2A2A] text-[#888888] hover:border-[#888888] hover:text-white transition-colors px-4 py-2"
              style={{ fontSize: "0.75rem", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
            >
              {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              <ChevronDown size={12} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-[#111111] border border-[#2A2A2A] z-10">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-[#1A1A1A] transition-colors ${sortBy === opt.value ? "text-[#C9A84C]" : "text-[#888888]"}`}
                    style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block flex-shrink-0 overflow-hidden"
              >
                <div className="w-60 space-y-6">
                  {/* Price Range */}
                  <div className="border-b border-[#2A2A2A] pb-6">
                    <h4 className="text-white mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                      PRICE RANGE (฿)
                    </h4>
                    <div className="space-y-2">
                      {[[0, 2000], [2000, 3500], [3500, 5000], [5000, 7000]].map(([min, max]) => (
                        <button
                          key={`${min}-${max}`}
                          onClick={() => setPriceRange([min, max])}
                          className={`w-full text-left px-3 py-2 transition-colors ${priceRange[0] === min && priceRange[1] === max ? "text-[#C9A84C] bg-[#C9A84C]/10" : "text-[#888888] hover:text-white"}`}
                          style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}
                        >
                          ฿{min.toLocaleString()} — {max === 7000 ? "฿7,000+" : `฿${max.toLocaleString()}`}
                        </button>
                      ))}
                      <button
                        onClick={() => setPriceRange([0, 7000])}
                        className={`w-full text-left px-3 py-2 transition-colors ${priceRange[0] === 0 && priceRange[1] === 7000 ? "text-[#C9A84C] bg-[#C9A84C]/10" : "text-[#888888] hover:text-white"}`}
                        style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}
                      >
                        All Prices
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="border-b border-[#2A2A2A] pb-6">
                    <h4 className="text-white mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                      SIZE
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["XS", "S", "M", "L", "XL", "XXL", "XXXL", "One Size", "500ml", "750ml"].map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleSize(s)}
                          className={`px-2.5 py-1.5 border text-xs transition-colors ${selectedSizes.includes(s)
                              ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
                              : "border-[#2A2A2A] text-[#888888] hover:border-[#888888]"
                            }`}
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Heritage Materials Filter */}
                  <div className="border-b border-[#2A2A2A] pb-6">
                    <h4 className="text-white mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                      HERITAGE MATERIALS
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "🪡 Khram Indigo Cotton", tag: "karen cotton" },
                        { label: "✦ Mudmee Silk Details", tag: "mudmee" },
                        { label: "🧵 Karen Cotton Blend", tag: "karen cotton" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-[#666666] text-xs px-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40 flex-shrink-0" />
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h4 className="text-white mb-4" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                      COLOR
                    </h4>
                    <div className="space-y-2">
                      {allColors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => toggleColor(c.name)}
                          className="flex items-center gap-3 w-full"
                        >
                          <div
                            className={`w-5 h-5 rounded-sm border ${selectedColors.includes(c.name) ? "border-[#C9A84C]" : "border-[#333333]"}`}
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className={`${selectedColors.includes(c.name) ? "text-[#C9A84C]" : "text-[#888888]"}`} style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Filter size={48} className="text-[#333333] mx-auto mb-4" />
                <p className="text-[#888888]" style={{ fontFamily: "Inter, sans-serif" }}>No products match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[#C9A84C] hover:underline" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 sm:gap-6 ${filterOpen ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                <AnimatePresence mode="popLayout">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
