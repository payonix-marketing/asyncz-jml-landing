import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "src/components/ui/button";
import {useLocation} from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0 and make the scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Run effect on location change

  return (
      <div className="pointer-events-none fixed bottom-20 right-4">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="pointer-events-auto brand-gradient text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
