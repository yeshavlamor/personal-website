export const writings = [
  {
    id: "stoic-notes",
    slug: "stoic-notes",
    title: "Notes on Stoicism for Modern Days",
    excerpt:
      "How a few simple ideas — control, virtue, and perspective — help me navigate work, relationships, and the quiet in‑betweens.",
    date: "2024-11-12",
    category: "philosophies",
    tags: ["stoicism", "mindset"],
    readTimeMinutes: 6,
    content: [
      "I came to Stoicism during a noisy season of life — loud calendars, quiet doubts. The philosophy wasn’t a cure‑all, but a focusing tool.",
      "The most practical lesson for me has been the dichotomy of control: to place energy only where my actions matter, and to release the rest with grace.",
      "Virtue, reframed for modern life, looks like consistency: doing the kind, useful thing even when nobody is scoring it.",
    ],
  },
  {
    id: "book-alchemist",
    slug: "book-alchemist",
    title: "Rereading The Alchemist",
    excerpt:
      "On personal legends, detours that weren’t detours at all, and finding quiet courage when the map runs out.",
    date: "2024-10-03",
    category: "books",
    tags: ["reflection", "fiction"],
    readTimeMinutes: 4,
    content: [
      "On a second read, I noticed the spaces between events more than the events themselves. Waiting, wandering, working — these became the story.",
      "Sometimes you don’t need a new map. You need a clearer reason to keep walking.",
    ],
  },
  {
    id: "kyoto-first-light",
    slug: "kyoto-first-light",
    title: "Kyoto at First Light",
    excerpt:
      "Temple bells before the city wakes, the soft weight of morning air, and why travel is mostly about noticing.",
    date: "2024-09-18",
    category: "travels",
    tags: ["japan", "noticing"],
    readTimeMinutes: 5,
    content: [
      "Kyoto is gentle in the morning. A city that teaches you to arrive early and speak softly.",
      "Travel, to me, is a practice of paying attention. The more I notice, the more the world seems to introduce itself back.",
    ],
  },
];

export function getWritingBySlug(slug) {
  return writings.find((w) => w.slug === slug);
}


