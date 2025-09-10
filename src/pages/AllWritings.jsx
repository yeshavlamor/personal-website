import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { writings } from "@/data/writings";
import { baseCategories } from "@/data/categories";
import WritingCard from "@/components/WritingCard";
import { ThemeToggle } from "@/components/ThemeToggle";

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

export const AllWritings = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const handleBackToHome = () => {
    localStorage.setItem("comingFromWritings", "true");
    navigate("/");
  };

  useEffect(() => {
    document.title = "All Writings";
  }, []);

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

    return result;
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      <section className="py-24 px-4 relative min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <div className="text-left mb-8">
            <button onClick={handleBackToHome} className="text-primary hover:underline text-sm md:text-base">← Back to Home</button>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
            My <span className="text-primary">Writings</span>
          </h1>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            A personal documentation of my thoughts. Currently includes literature, tech,
            and places that have changed how I see. As I grow and learn, so will this collection :)
          </p>

          <div className="flex flex-col items-center gap-4 md:gap-6 mb-10">
            {/* Fixed height container for category tabs to prevent layout shift */}
            <div className="h-20 flex items-center justify-center">
              <CategoryTabs
                activeKey={activeCategory}
                counts={countsByCategory}
                onChange={setActiveCategory}
              />
            </div>

            {/* Fixed height container for search to prevent layout shift */}
            <div className="h-12 w-full max-w-xl">
              <div className="relative w-full h-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full h-full pl-10 pr-4 rounded-md border bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label="Search writings"
                />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              {query || activeCategory !== "all" 
                ? "No writings found matching your search. Try adjusting your filters."
                : "Nothing here yet — check back soon."
              }
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <WritingCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllWritings;












