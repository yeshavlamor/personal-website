import { useEffect, useRef, useState } from "react";

// Lightweight carousel with autoplay, touch swipe and controls.
// Props:
// - images: string[] (required) - array of image src paths
// - interval: number (ms) - autoplay interval (default 4000)
export default function GalleryCarousel({ images = [], interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, images, interval, isPaused]);

  function goTo(i) {
    setIndex((i + images.length) % images.length);
  }

  function onPrev() {
    goTo(index - 1);
    setIsPaused(true);
  }

  function onNext() {
    goTo(index + 1);
    setIsPaused(true);
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }

  function onTouchEnd() {
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) onPrev();
      else onNext();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  }

  if (!images || images.length === 0) return null;

  return (
    <div
      className="w-full relative overflow-hidden rounded-md mb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* responsive 16:9 container */}
      <div className="w-full aspect-video bg-slate-900/10 relative overflow-hidden">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`gallery-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            style={{ backdropFilter: "blur(4px)" }}
          >
            ‹
          </button>

          <button
            onClick={onNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
            style={{ backdropFilter: "blur(4px)" }}
          >
            ›
          </button>

          {/* Indicators */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goTo(i);
                  setIsPaused(true);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
