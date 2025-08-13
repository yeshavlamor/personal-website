import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getWritingBySlug } from "@/data/writings";
import { Calendar, ArrowLeft } from "lucide-react";

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
  const writing = getWritingBySlug(slug);

  useEffect(() => {
    if (writing?.title) {
      document.title = `${writing.title} — Writings`;
    }
  }, [writing]);

  if (!writing) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4">
        <div className="container mx-auto max-w-3xl py-24">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={18} /> Back home
          </Link>
          <div className="mt-6 text-muted-foreground">Sorry, this page could not be found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4">
      <div className="container mx-auto max-w-3xl py-10 md:py-16">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={18} /> Back home
          </Link>
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

        <main className="prose prose-invert max-w-none text-left">
          {writing.content?.map((paragraph, idx) => (
            <p key={idx} className="mb-5 leading-relaxed text-[1.05rem] text-foreground/90">
              {paragraph}
            </p>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Writing;


