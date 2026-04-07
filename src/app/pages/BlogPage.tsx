import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { blogPosts } from "../data/blog";

export function BlogListPage() {
  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Header */}
      <div className="relative py-20 overflow-hidden border-b border-[#2A2A2A]">
        <img
          src="https://images.unsplash.com/photo-1687184144779-51a366352458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600"
          alt="Blog header"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 mb-4" style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif", color: "#666666" }}>
            <Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#888888]">Journal</span>
          </nav>
          <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "Inter, sans-serif" }}>THE SLCKK JOURNAL</span>
          <h1 className="text-white mt-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300 }}>
            Stories, Training & Heritage
          </h1>
          <p className="text-[#AAAAAA] mt-3 max-w-xl" style={{ fontSize: "0.9rem", fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}>
            Insights on training, culture, and the stories behind our collections. Explore the intersection of Southeast Asian heritage and modern performance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border transition-colors ${activeCategory === cat ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10" : "border-[#2A2A2A] text-[#888888] hover:border-[#888888] hover:text-white"}`}
              style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {filtered.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden aspect-video">
              <Link to={`/blog/${filtered[0].slug}`}>
                <img
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#C9A84C] text-[#0A0A0A] px-2 py-0.5" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                  FEATURED
                </span>
                <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
                  {filtered[0].category.toUpperCase()}
                </span>
              </div>
              <Link to={`/blog/${filtered[0].slug}`}>
                <h2 className="text-white hover:text-[#C9A84C] transition-colors mb-3" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 400, lineHeight: "1.3" }}>
                  {filtered[0].title}
                </h2>
              </Link>
              <p className="text-[#AAAAAA] mb-6" style={{ fontSize: "0.875rem", fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}>
                {filtered[0].excerpt}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <img src={filtered[0].authorAvatar} alt={filtered[0].author} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-[#CCCCCC]" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>{filtered[0].author}</span>
                </div>
                <span className="text-[#555555]">·</span>
                <div className="flex items-center gap-1 text-[#888888]">
                  <Clock size={12} />
                  <span style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>{filtered[0].readTime} min read</span>
                </div>
              </div>
              <Link
                to={`/blog/${filtered[0].slug}`}
                className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white transition-colors"
                style={{ fontSize: "0.75rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}
              >
                READ ARTICLE →
              </Link>
            </div>
          </motion.div>
        )}

        {/* Other posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
                  <span className="text-[#C9A84C]" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
                    {post.category.toUpperCase()}
                  </span>
                  <span className="text-[#444444]">·</span>
                  <div className="flex items-center gap-1 text-[#666666]">
                    <Clock size={10} />
                    <span style={{ fontSize: "0.7rem", fontFamily: "Inter, sans-serif" }}>{post.readTime} min</span>
                  </div>
                </div>
                <h3 className="text-white group-hover:text-[#C9A84C] transition-colors mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.15rem", fontWeight: 500, lineHeight: "1.4" }}>
                  {post.title}
                </h3>
                <p className="text-[#888888] mb-4" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}>
                  {post.excerpt.slice(0, 120)}...
                </p>
                <div className="flex items-center gap-2">
                  <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-[#888888]" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>{post.author}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#888888] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Post not found</p>
          <Link to="/blog" className="text-[#C9A84C] hover:underline" style={{ fontFamily: "Inter, sans-serif" }}>Back to Journal</Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link
          to="/blog"
          className="flex items-center gap-2 text-[#888888] hover:text-[#C9A84C] transition-colors mb-8"
          style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>

        {/* Category & Title */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#C9A84C]" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", fontFamily: "Inter, sans-serif" }}>
            {post.category.toUpperCase()}
          </span>
        </div>
        <h1 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, lineHeight: "1.2" }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" />
            <div>
              <div className="text-white" style={{ fontSize: "0.8rem", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{post.author}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#888888]">
            <Calendar size={12} />
            <span style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#888888]">
            <Clock size={12} />
            <span style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>{post.readTime} min read</span>
          </div>
          <button className="ml-auto text-[#888888] hover:text-[#C9A84C] transition-colors flex items-center gap-1" style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}>
            <Share2 size={14} /> Share
          </button>
        </div>

        {/* Article Content */}
        <div
          className="prose-content text-[#CCCCCC]"
          style={{ fontSize: "0.95rem", fontFamily: "Inter, sans-serif", lineHeight: "1.9" }}
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/<h2>/g, '<h2 style="font-family: Cormorant Garamond, serif; font-size: 1.5rem; font-weight: 400; color: white; margin-top: 2rem; margin-bottom: 1rem;">')
              .replace(/<p>/g, '<p style="margin-bottom: 1.25rem;">')
              .replace(/<ul>/g, '<ul style="list-style: none; padding: 0; margin-bottom: 1.25rem;">')
              .replace(/<li>/g, '<li style="display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.5rem; color: #CCCCCC;"><span style="color: #C9A84C; flex-shrink: 0;">✦</span><span>'),
          }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[#2A2A2A]">
          {post.tags.map((tag) => (
            <span key={tag} className="border border-[#2A2A2A] text-[#888888] px-3 py-1" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-white mb-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 400 }}>Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                  <div className="overflow-hidden aspect-video mb-3">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-[#C9A84C]" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>{p.category.toUpperCase()}</span>
                  <h4 className="text-white group-hover:text-[#C9A84C] transition-colors mt-1" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem", fontWeight: 500, lineHeight: "1.4" }}>
                    {p.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
