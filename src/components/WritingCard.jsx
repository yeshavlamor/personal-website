import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

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

export const WritingCard = ({ item }) => {
  return (
    <article className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover border text-left">
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-2">
          <Calendar size={14} />
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <span className="mx-2">•</span>
          <span>{item.readTimeMinutes} min read</span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4">
          {item.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          <Link
            to={`/writings/category/${item.category}`}
            className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground hover:underline"
          >
            {item.category}
          </Link>
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary/70 text-secondary-foreground/90"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/writings/${item.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Read more <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default WritingCard;


