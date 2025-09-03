import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { writings } from "@/data/writings";
import WritingCard from "@/components/WritingCard";

export const AllWritings = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    localStorage.setItem("comingFromWritings", "true");
    navigate("/");
  };

  useEffect(() => {
    document.title = "All Writings";
  }, []);

  const list = [...writings].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="py-24 px-4 relative min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl">
        <div className="text-left mb-8">
          <button onClick={handleBackToHome} className="text-primary hover:underline">← Back to Home</button>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          All <span className="text-primary">Writings</span>
        </h1>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Browse everything I've published in one place.
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
      </div>
    </section>
  );
};

export default AllWritings;












