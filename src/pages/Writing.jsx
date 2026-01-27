import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getWritingBySlug } from "@/data/writings";
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
        <div className="container mx-auto max-w-3xl py-24">
          <button onClick={handleBackToHome} className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={18} /> Back home
          </button>
          <div className="mt-6 text-muted-foreground">Sorry, this page could not be found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4">
      <div className="container mx-auto max-w-3xl py-10 md:py-16">
        <div className="mb-6">
          <button onClick={handleBackToHome} className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={18} /> Back home
          </button>
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

        {/*
          The article HTML is pre-rendered at build time. We support two gallery placement modes:
          1) Inline: place the marker `%GALLERY%` on its own line in the markdown where you want
             the carousel to appear. The generator will preserve the token in the generated HTML
             (it becomes part of a paragraph). We detect it below and split the HTML so we can
             render the React `GalleryCarousel` in the exact spot.
          2) Bottom: if no marker is present, the carousel is rendered after the article (current behavior).
        */}

        {(() => {
          const htmlSource =
            typeof writing.html === "string" && writing.html.trim().length > 0
              ? writing.html
              : (Array.isArray(writing.content) ? writing.content.map((p) => `<p>${p}</p>`).join("\n") : "");

          const PLACEHOLDER = "%GALLERY%";

          if (htmlSource.includes(PLACEHOLDER)) {
            const [before, after] = htmlSource.split(PLACEHOLDER);
            return (
              <>
                <div className="prose prose-invert max-w-none text-left" dangerouslySetInnerHTML={{ __html: before }} />
                {Array.isArray(writing.galleryImages) && writing.galleryImages.length > 0 && (
                  <div className="mb-6">
                    <GalleryCarousel images={writing.galleryImages} />
                  </div>
                )}
                <div className="prose prose-invert max-w-none text-left" dangerouslySetInnerHTML={{ __html: after }} />
              </>
            );
          }

          // Default: render article then (optionally) the gallery at the bottom
          return (
            <>
              <main className="prose prose-invert max-w-none text-left" dangerouslySetInnerHTML={{ __html: htmlSource }} />
              {Array.isArray(writing.galleryImages) && writing.galleryImages.length > 0 && (
                <div className="mt-6">
                  <GalleryCarousel images={writing.galleryImages} />
                </div>
              )}
            </>
          );
        })()}

      </div>
    </div>
  );
};

export default Writing;


