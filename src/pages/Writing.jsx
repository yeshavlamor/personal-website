import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getWritingBySlug } from "@/data/writings";
import { ThemeToggle } from "@/components/ThemeToggle";
import GalleryCarousel from "@/components/GalleryCarousel";
import { Calendar, ArrowLeft } from "lucide-react";
// Rendering now uses build-time generated HTML (no runtime markdown deps)

function formatDate(isoDate) {
  try {
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoDate;
  }
}

export const Writing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const writing = getWritingBySlug(slug);

  const handleBackToHome = () => {
    // Set flag to indicate coming from writings
    localStorage.setItem("comingFromWritings", "true");
    navigate("/");
  };

  useEffect(() => {
    if (writing?.title) {
      document.title = `${writing.title} — Writings`;
    }
  }, [writing]);

  if (!writing) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4">
        <ThemeToggle />
        <div className="container mx-auto max-w-3xl py-24">
          {/* Back button: fixed on small screens, in-flow on md+ */}
          <div className="md:static">
            <button
              onClick={handleBackToHome}
              aria-label="Back to home"
              className="block md:hidden fixed top-5 left-5 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary hover:opacity-90"
            >
              <ArrowLeft size={18} />
            </button>

              <div className="hidden md:block mb-8">
                <button onClick={handleBackToHome} className="inline-flex items-center gap-2 text-primary hover:underline">
                  <ArrowLeft size={18} /> Back home
                </button>
              </div>
          </div>

          <div className="mt-6 text-muted-foreground">Sorry, this page could not be found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4">
      <ThemeToggle />
  <div className="container mx-auto max-w-3xl pt-20 pb-10 md:pt-16 md:pb-16">
        {/* Back button: fixed on small screens, in-flow on md+ */}
        <div className="md:static">
          <button
            onClick={handleBackToHome}
            aria-label="Back to home"
            className="block md:hidden fixed top-5 left-5 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary hover:opacity-90"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="hidden md:block mb-8">
            <button onClick={handleBackToHome} className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft size={18} /> Back home
            </button>
          </div>
        </div>

        <header className="mb-8 text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">{writing.title}</h1>
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Calendar size={16} />
            <time dateTime={writing.date}>{formatDate(writing.date)}</time>
            <span className="mx-2">•</span>
            <span>{writing.readTimeMinutes} min read</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
              {writing.category}
            </span>
            {writing.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary/70 text-secondary-foreground/90">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <main
          className="prose prose-invert max-w-none text-left"
          dangerouslySetInnerHTML={{
            __html:
              typeof writing.html === "string" && writing.html.trim().length > 0
                ? writing.html
                : (Array.isArray(writing.content) ? writing.content.map((p) => `<p>${p}</p>`).join("\n") : "")
          }}
        />

        {/* Optional gallery: if a writing provides a galleryImages array, render the carousel */}
        {Array.isArray(writing.galleryImages) && writing.galleryImages.length > 0 && (
          <GalleryCarousel images={writing.galleryImages} />
        )}
        
      </div>
    </div>
  );
};

export default Writing;


