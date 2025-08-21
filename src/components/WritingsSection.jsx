import { useMemo, useState } from "react";
import { Calendar, BookOpen, Compass, Lightbulb, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { writings as writingsData } from "@/data/writings";
import WritingCard from "@/components/WritingCard";
import { baseCategories } from "@/data/categories";

// categories imported

const writings = writingsData;

function formatDate(isoDate) {
  try {
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function CategoryTabs({ activeKey, counts, onChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {baseCategories.map(({ key, label, icon: Icon }) => {
        const isActive = activeKey === key;
        const count = counts[key] ?? 0;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              isActive
                ? "bg-primary text-primary-foreground border-transparent shadow-sm"
                : "bg-card text-foreground/90 hover:bg-primary/10"
            }`}
            aria-pressed={isActive}
          >
            <span className="inline-flex items-center gap-2 text-sm md:text-base">
              {Icon ? <Icon size={16} /> : null}
              <span>{label}</span>
              <span className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-foreground/60"}`}>
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

// card moved to shared component

export const WritingsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const countsByCategory = useMemo(() => {
    const counts = { all: writings.length };
    for (const { category } of writings) {
      counts[category] = (counts[category] ?? 0) + 1;
    }
    // Ensure base categories exist even if 0
    for (const { key } of baseCategories) {
      counts[key] = counts[key] ?? (key === "all" ? writings.length : 0);
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    const result = writings
      .filter((w) =>
        activeCategory === "all" ? true : w.category === activeCategory
      )
      .filter((w) =>
        lower
          ? [w.title, w.excerpt, ...(w.tags ?? [])]
              .join(" ")
              .toLowerCase()
              .includes(lower)
          : true
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    // In the "all" tab with no search query, show only the top 3 most recent
    if (activeCategory === "all" && !lower) {
      return result.slice(0, 3);
    }
    return result;
  }, [activeCategory, query]);

  return (
    <section id="writings" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          Writings <span className="text-primary">& Journal</span>
        </h2>

        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          A growing collection of notes on books I love, philosophies I’m testing,
          and places that changed how I see. Simple, honest, and always evolving.
        </p>

        <div className="flex flex-col items-center gap-4 md:gap-6 mb-10">
          <CategoryTabs
            activeKey={activeCategory}
            counts={countsByCategory}
            onChange={setActiveCategory}
          />

          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, idea, or tag…"
              className="w-full pl-10 pr-4 py-2 rounded-md border bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Search writings"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            Nothing here yet — check back soon. I’m likely reading, thinking, or planning a small adventure.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <WritingCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link className="cosmic-button w-fit inline-flex items-center gap-2" to="/writings">
            See all writings <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WritingsSection;


