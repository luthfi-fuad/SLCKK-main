export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "b001",
    title: "Training with Purpose: How Southeast Asian Heritage Shapes Our Approach to Fitness",
    slug: "training-with-purpose",
    excerpt:
      "At SLCKK, we believe fitness is more than physical — it's a cultural practice. Discover how the principles of balance, endurance, and community embedded in Southeast Asian traditions can transform your training.",
    content: `
      <p>When we founded SLCKK, we wanted to create more than just gymwear. We wanted to honor the rich physical traditions of Southeast Asia — from the graceful martial arts of silat in Malaysia, to the powerful movements of muay thai in Thailand, to the disciplined practice of pencak silat across Indonesia.</p>
      <p>These traditions share common values: discipline, community, and the understanding that physical training is inseparable from mental and spiritual growth. This philosophy shapes every product we design and every collection we release.</p>
      <h2>The Philosophy of Balance</h2>
      <p>Traditional Southeast Asian martial arts emphasize balance — not just physical balance, but the balance between strength and flexibility, power and grace, effort and recovery. This is something Western fitness culture is only beginning to understand.</p>
      <p>In your own training, consider incorporating this philosophy. Not every session needs to be maximum intensity. Some days call for deep mobility work, meditation, or active recovery. The goal is sustainable performance over time.</p>
      <h2>Community as Foundation</h2>
      <p>Training with community is deeply embedded in Southeast Asian culture. The gym, like the village, is a place where individuals come together to support each other's growth. When you train with others, you push harder and recover better.</p>
      <p>SLCKK activewear is designed for both solo and group training environments — because we believe in both the quiet discipline of individual work and the electric energy of training with your community.</p>
    `,
    image: "https://images.unsplash.com/photo-1687184144779-51a366352458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    author: "Amir Hassan",
    authorAvatar: "https://images.unsplash.com/photo-1540473901296-a6413c3e4aaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    date: "2026-02-10",
    category: "Culture & Fitness",
    readTime: 6,
    tags: ["culture", "training", "philosophy", "heritage"],
  },
  {
    id: "b002",
    title: "5 High-Intensity Workouts You Can Do in Your SLCKK Leggings",
    slug: "5-hiit-workouts",
    excerpt:
      "Put your Obsidian Leggings to the test with these five science-backed HIIT workouts designed to torch calories and build lean muscle.",
    content: `
      <p>Your activewear should work as hard as you do. That's why we designed the Obsidian Leggings with four-way stretch and advanced moisture-wicking technology — so nothing holds you back during your most intense sessions.</p>
      <h2>Workout 1: The Archipelago Circuit</h2>
      <p>Named after the islands of Southeast Asia, this circuit is designed to be performed on a continuous loop with minimal rest.</p>
      <p>Perform each exercise for 45 seconds, rest 15 seconds, then move to the next:</p>
      <ul>
        <li>Jump squats</li>
        <li>Burpees</li>
        <li>Mountain climbers</li>
        <li>High knees</li>
        <li>Plank to downward dog</li>
      </ul>
      <p>Complete 4 rounds with 2 minutes rest between rounds.</p>
      <h2>Workout 2: The Dragon Protocol</h2>
      <p>This lower-body focused HIIT protocol is inspired by the powerful, low-stance movements of traditional dragon dance performers.</p>
      <p>40 seconds on, 20 seconds off:</p>
      <ul>
        <li>Sumo squat jumps</li>
        <li>Lateral lunges</li>
        <li>Squat holds with pulses</li>
        <li>Box jumps</li>
        <li>Wall sit</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1666888735943-196a95605e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    author: "Priya Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1768929096134-f45af7839e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    date: "2026-02-03",
    category: "Workouts",
    readTime: 8,
    tags: ["hiit", "workout", "leggings", "training"],
  },
  {
    id: "b003",
    title: "The Story Behind the Batik Print: Heritage in Every Thread",
    slug: "story-behind-batik",
    excerpt:
      "How we worked with master batik artisans from Java to translate 500-year-old patterns into performance activewear fabric. A story of culture, collaboration, and craft.",
    content: `
      <p>When we first conceived of the Batik Heritage collection, we knew we had a responsibility. Batik is not just a pattern — it is a UNESCO-recognized form of cultural expression that has been practiced in Java for over 500 years.</p>
      <p>We spent six months working with master batik artisans in Solo (Surakarta), Java, to understand the meanings behind the patterns and develop a respectful, authentic way to translate these designs into performance activewear.</p>
      <h2>The Collaboration</h2>
      <p>We partnered with three generations of the Wijaya family, who have been creating batik in Solo for over 100 years. Together, we identified motifs that carry universal meanings of strength, protection, and harmony — values central to the SLCKK mission.</p>
      <p>The parang motif, traditionally worn by Javanese royalty, represents strength and courage. The kawung pattern, one of the oldest batik designs, symbolizes balance and the four cardinal directions.</p>
      <h2>The Technical Challenge</h2>
      <p>Translating these intricate wax-resist dye patterns into high-performance fabric required significant technical innovation. We developed a proprietary sublimation printing process that preserves the visual depth and cultural integrity of the original designs while meeting our strict performance standards.</p>
    `,
    image: "https://images.unsplash.com/photo-1758186150174-3b3f7954f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    author: "Siti Rahma",
    authorAvatar: "https://images.unsplash.com/photo-1678356188535-1c23c93b0746?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    date: "2026-01-25",
    category: "Brand Story",
    readTime: 7,
    tags: ["batik", "heritage", "culture", "design"],
  },
  {
    id: "b004",
    title: "Recovery Like a Champion: Post-Workout Routines from Southeast Asian Athletes",
    slug: "recovery-routines",
    excerpt:
      "We spoke with professional athletes from across Southeast Asia about their post-workout recovery practices. Here's what they shared.",
    content: `
      <p>Recovery is where growth happens. We spoke with five professional athletes — a Muay Thai champion, a professional badminton player, a CrossFit competitor, a marathon runner, and a powerlifter — all from across Southeast Asia, about their approach to recovery.</p>
      <h2>Contrast Therapy: Ancient Practice, Modern Science</h2>
      <p>Several athletes mentioned alternating between hot and cold exposure as a core recovery practice. This technique, common in traditional Southeast Asian wellness practices, is now backed by substantial research showing reduced inflammation and improved recovery time.</p>
      <h2>The Role of Nutrition</h2>
      <p>Traditional Southeast Asian cuisine, with its emphasis on anti-inflammatory herbs and spices — turmeric, lemongrass, ginger, galangal — is a natural performance nutrition system that modern sports science is beginning to validate.</p>
    `,
    image: "https://images.unsplash.com/photo-1630225758612-8c511aad6c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    author: "Dr. Kavita Menon",
    authorAvatar: "https://images.unsplash.com/photo-1669502299593-5dbb23edfdb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    date: "2026-01-15",
    category: "Performance",
    readTime: 9,
    tags: ["recovery", "athletes", "performance", "wellness"],
  },
];
