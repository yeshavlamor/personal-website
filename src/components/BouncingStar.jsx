import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

/**
 * A globally visible bouncing shooting star that prompts users to switch to dark mode.
 * - Visible only when theme is light
 * - Bounces around the viewport; remains visible while scrolling
 * - Clicking toggles dark mode, dispatches "themeChanged", and hides itself
 */
export const BouncingStar = () => {
  const [isVisible, setIsVisible] = useState(false);
  // A small helper label state was used previously; we now keep text visible until clicked
  const starRef = useRef(null);
  const innerRef = useRef(null);
  const tailRef = useRef(null);
  const labelRef = useRef(null);
  const isHoveringRef = useRef(false);
  const holdBasePosRef = useRef({ x: 0, y: 0 });
  const jitterPhaseRef = useRef({ jx: Math.random() * Math.PI * 2, jy: Math.random() * Math.PI * 2 });
  const animationFrameRef = useRef(0);
  const lastTsRef = useRef(0);

  // Position and velocity stored in refs to avoid frequent React re-renders
  const positionRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ vx: 160, vy: 130 }); // px/s
  const driftPhaseRef = useRef({ a: Math.random() * Math.PI * 2, b: Math.random() * Math.PI * 2 });
  const sizeRef = useRef({ w: 72, h: 72 });

  useEffect(() => {
    // Initialize visibility based on theme
    if (localStorage.getItem("starCaught") === "true") {
      setIsVisible(false);
      return;
    }
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsVisible(false);
      return;
    }
    // Ensure we set light as default
    if (!storedTheme) {
      localStorage.setItem("theme", "light");
    }
    setIsVisible(true);

    // Randomize initial position and velocity
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { w, h } = sizeRef.current;
    // Ensure non-NaN, inside-bounds random start
    const rx = Math.random();
    const ry = Math.random();
    const safeW = Math.max(0, vw - w - 16);
    const safeH = Math.max(0, vh - h - 16);
    positionRef.current = {
      x: Math.min(Math.max(16, rx * safeW), Math.max(0, vw - w)),
      y: Math.min(Math.max(16, ry * safeH), Math.max(0, vh - h)),
    };
    // Random velocity with min speed to stay lively
    const speed = 140 + Math.random() * 120; // 140-260 px/s
    const angle = Math.random() * Math.PI * 2;
    velocityRef.current = { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };

    const step = (ts) => {
      if (!starRef.current) {
        // Ref not attached yet; try again next frame
        animationFrameRef.current = requestAnimationFrame(step);
        return;
      }
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min(0.032, (ts - lastTsRef.current) / 1000); // clamp dt for stability
      lastTsRef.current = ts;

      let { vx, vy } = velocityRef.current;
      const time = ts / 1000;
      // Start from current position for both branches
      let { x, y } = positionRef.current;

      if (isHoveringRef.current) {
        // Hold position with jitter when hovering
        const AMP = 12;
        const FX = 10;
        const FY = 8;
        const { jx, jy } = jitterPhaseRef.current;
        // Deterministic jitter (avoid Math.random in loop to prevent stalling on some environments)
        const jitterX = Math.sin(time * FX + jx) * AMP * 1.1;
        const jitterY = Math.cos(time * FY + jy) * AMP * 1.1;
        let nx = holdBasePosRef.current.x + jitterX;
        let ny = holdBasePosRef.current.y + jitterY;
        const { w: sw, h: sh } = sizeRef.current;
        const vw2 = window.innerWidth;
        const vh2 = window.innerHeight;
        nx = Math.min(Math.max(0, nx), Math.max(0, vw2 - sw));
        ny = Math.min(Math.max(0, ny), Math.max(0, vh2 - sh));
        x = nx;
        y = ny;
        vx *= 0.85; vy *= 0.85;
        velocityRef.current = { vx, vy };
      } else {
        // Normal curving drift
        const DRIFT_ACCEL = 40; // px/s^2
        const { a, b } = driftPhaseRef.current;
        const ax = DRIFT_ACCEL * Math.sin(time * 0.8 + a);
        const ay = DRIFT_ACCEL * Math.cos(time * 0.6 + b);
        vx += ax * dt;
        vy += ay * dt;

        // Clamp speed range
        const speed = Math.hypot(vx, vy);
        const MIN_SPEED = 160;
        const MAX_SPEED = 360;
        if (speed < MIN_SPEED) {
          const k = MIN_SPEED / (speed || 1);
          vx *= k; vy *= k;
        } else if (speed > MAX_SPEED) {
          const k = MAX_SPEED / speed;
          vx *= k; vy *= k;
        }

        const { w: sw, h: sh } = sizeRef.current;
        const vw2 = window.innerWidth;
        const vh2 = window.innerHeight;
        x += vx * dt;
        y += vy * dt;

        // Bounce on edges
        if (x <= 0) {
          x = 0;
          vx = Math.abs(vx) * 0.985;
        } else if (x + sw >= vw2) {
          x = vw2 - sw;
          vx = -Math.abs(vx) * 0.985;
        }
        if (y <= 0) {
          y = 0;
          vy = Math.abs(vy) * 0.985;
        } else if (y + sh >= vh2) {
          y = vh2 - sh;
          vy = -Math.abs(vy) * 0.97;
        }
        velocityRef.current = { vx, vy };
      }
      // Persist final position
      positionRef.current = { x, y };

      // Apply transform directly for perf
      const translate = `translate3d(${x}px, ${y}px, 0)`;
      starRef.current.style.transform = translate;
      if (labelRef.current) labelRef.current.style.transform = translate;

      // Rotate inner star to face velocity (wiggle when hovering)
      if (innerRef.current) {
        const baseAngleDeg = (Math.atan2(vy, vx) * 180) / Math.PI;
        const wiggle = isHoveringRef.current ? Math.sin(time * 30) * 10 : 0;
        innerRef.current.style.transform = `rotate(${baseAngleDeg + wiggle}deg)`;
      }

      // Tail length based on current speed
      if (tailRef.current) {
        const speedNow = Math.hypot(vx, vy);
        const tailLen = Math.max(22, Math.min(110, speedNow * 0.25));
        tailRef.current.style.width = `${tailLen}px`;
        tailRef.current.style.opacity = isHoveringRef.current ? "0.85" : "1";
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };
    // Kick an initial transform so it is not stuck at (0,0) before first frame
    const { x: ix, y: iy } = positionRef.current;
    const initTranslate = `translate3d(${ix}px, ${iy}px, 0)`;
    if (starRef.current) {
      starRef.current.style.transform = initTranslate;
    }
    if (labelRef.current) {
      labelRef.current.style.transform = initTranslate;
    }
    animationFrameRef.current = requestAnimationFrame(step);

    const onResize = () => {
      // Keep inside bounds if window shrinks
      const { w: sw, h: sh } = sizeRef.current;
      const vw3 = window.innerWidth;
      const vh3 = window.innerHeight;
      const { x, y } = positionRef.current;
      positionRef.current = {
        x: Math.min(Math.max(0, x), Math.max(0, vw3 - sw)),
        y: Math.min(Math.max(0, y), Math.max(0, vh3 - sh)),
      };
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Hide self if theme changes to dark elsewhere (e.g., via top-right toggle)
  useEffect(() => {
    const handleThemeChange = () => {
      const alreadyCaught = localStorage.getItem("starCaught") === "true";
      if (alreadyCaught) {
        setIsVisible(false);
        return;
      }
      const currentTheme = localStorage.getItem("theme");
      setIsVisible(currentTheme !== "dark");
    };
    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  const handleClick = () => {
    // Switch to dark mode and hide
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    localStorage.setItem("starCaught", "true");
    window.dispatchEvent(new Event("themeChanged"));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Clickable star */}
      <button
        ref={starRef}
        onClick={handleClick}
        onMouseEnter={() => {
          if (!isHoveringRef.current) {
            isHoveringRef.current = true;
            holdBasePosRef.current = { ...positionRef.current };
          }
        }}
        onMouseLeave={(e) => {
          if (isHoveringRef.current) {
            isHoveringRef.current = false;
            const rect = starRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = cx - e.clientX;
            const dy = cy - e.clientY;
            const len = Math.hypot(dx, dy) || 1;
            const IMPULSE = 220;
            velocityRef.current.vx += (dx / len) * IMPULSE;
            velocityRef.current.vy += (dy / len) * IMPULSE;
          }
        }}
        aria-label="Catch the star to switch to dark mode"
        className="fixed left-0 top-0 z-[70] pointer-events-auto select-none"
        style={{ width: sizeRef.current.w, height: sizeRef.current.h }}
      >
        {/* Rotating wrapper aligns tail with motion */}
        <span ref={innerRef} className="absolute inset-0 grid place-items-center">
          {/* Tail */}
          <span
            ref={tailRef}
            className="absolute h-[3px] -left-4 origin-right rounded-full"
            style={{
              background: "linear-gradient(90deg, rgba(251,191,36,0.0) 0%, rgba(251,191,36,0.35) 25%, rgba(251,191,36,0.8) 70%, rgba(251,191,36,0.95) 100%)",
              filter: "drop-shadow(0 0 6px rgba(251,191,36,0.6))",
            }}
          />
          {/* Star-shaped glow via SVG */}
          <svg
            className="absolute opacity-80"
            width={sizeRef.current.w * 1.6}
            height={sizeRef.current.h * 1.6}
            viewBox="0 0 100 100"
            style={{ filter: "blur(6px) drop-shadow(0 0 12px rgba(251,191,36,0.7))" }}
          >
            <polygon
              points="50,2 61,36 98,36 68,58 79,92 50,72 21,92 32,58 2,36 39,36"
              fill="rgba(251,191,36,0.55)"
            />
          </svg>
          {/* Main star shape (not circular) */}
          <svg
            className="relative"
            width={sizeRef.current.w * 0.9}
            height={sizeRef.current.h * 0.9}
            viewBox="0 0 100 100"
            style={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.7))" }}
          >
            <defs>
              <linearGradient id="starFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(253,230,138,1)" />
                <stop offset="100%" stopColor="rgba(250,204,21,1)" />
              </linearGradient>
            </defs>
            <polygon
              points="50,5 61,36 95,36 66,57 76,90 50,70 24,90 34,57 5,36 39,36"
              fill="url(#starFill)"
              stroke="rgba(234,179,8,0.9)"
              strokeWidth="2"
            />
          </svg>
          {/* Sparkle accent */}
          <span className="absolute -right-2 -top-2 w-3 h-3 rounded-full bg-yellow-200 animate-ping" />
        </span>
      </button>

      {/* Floating guidance label (always visible until clicked) */}
      <div
        ref={labelRef}
        className="fixed left-0 top-0 z-[69] pointer-events-none"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="translate-x-16 -translate-y-8 bg-primary/90 text-primary-foreground text-xs md:text-sm px-3 py-2 rounded-full shadow-lg backdrop-blur-sm">
          Click me
        </div>
      </div>
    </>
  );
};


