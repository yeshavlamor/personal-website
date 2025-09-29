import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on route change, except when returning from writings to Home
export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const comingFromWritings = localStorage.getItem("comingFromWritings") === "true";

    // If the user is navigating to Home while flagged as coming from writings,
    // do not force scroll to top here. Home handles its own scroll into view.
    if (location.pathname === "/" && comingFromWritings) {
      return;
    }

    // Default behavior: scroll to top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location]);

  return null;
};

export default ScrollToTop;


