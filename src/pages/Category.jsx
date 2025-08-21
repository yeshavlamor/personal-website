import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { writings } from "@/data/writings";
import { baseCategories, isValidCategory, getCategoryLabel } from "@/data/categories";
import WritingCard from "@/components/WritingCard";

export const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const valid = isValidCategory(category);

  const handleBackToHome = () => {
    // Set flag to indicate coming from writings
    localStorage.setItem("comingFromWritings", "true");
    navigate("/");
  };

  const list = useMemo(() => {
    if (!valid) return [];
    return writings
      .filter((w) => w.category === category)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [category, valid]);

  if (!valid) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4">
        <div className="container mx-auto max-w-5xl py-24 text-center">
          <p className="text-muted-foreground">Category not found.</p>
          <button onClick={handleBackToHome} className="cosmic-button mt-6 inline-block">Go Home</button>
        </div>
      </div>
    );
  }

  const label = getCategoryLabel(category);

  return (
    <section className="py-24 px-4 relative min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl">
        <div className="text-left mb-8">
          <button onClick={handleBackToHome} className="text-primary hover:underline">← Back to Home</button>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          {label} <span className="text-primary">Writings</span>
        </h1>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Browse all {label.toLowerCase()} pieces.
        </p>

        {list.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            Nothing here yet — check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((item) => (
              <WritingCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button onClick={handleBackToHome} className="cosmic-button w-fit inline-flex items-center gap-2">
            Back Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;


