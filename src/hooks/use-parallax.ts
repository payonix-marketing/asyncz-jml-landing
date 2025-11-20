import { useEffect, useState, useRef } from 'react';

// Throttle function for performance optimization
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

// Generic hook that applies a parallax effect when an element is in view
function useParallaxEffect<T>(
  effectFn: (scrolled: number) => T,
  initialValue: T,
  dependencies: any[]
) {
  const [value, setValue] = useState<T>(initialValue);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        // Start applying effect when element is 200px away from viewport
        rootMargin: '200px 0px',
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setValue(effectFn(scrolled));
    };

    const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, ...dependencies]);

  return { value, elementRef };
}

export function useParallax(speed: number = 0.5, offset: number = 0) {
  const { value: transform, elementRef } = useParallaxEffect(
    (scrolled) => {
      const rate = scrolled * speed;
      const yPos = -(rate + offset);
      return `translate3d(0, ${yPos}px, 0)`;
    },
    'translate3d(0, 0, 0)',
    [speed, offset]
  );
  return { transform, elementRef };
}

export function useParallaxRotation(speed: number = 0.1) {
  const { value: rotation, elementRef } = useParallaxEffect(
    (scrolled) => scrolled * speed,
    0,
    [speed]
  );
  return { rotation, elementRef };
}

export function useParallaxScale(baseScale: number = 1, speed: number = 0.0005) {
  const { value: scale, elementRef } = useParallaxEffect(
    (scrolled) => {
      const scaleValue = baseScale + scrolled * speed;
      return Math.max(0.8, Math.min(1.2, scaleValue));
    },
    baseScale,
    [baseScale, speed]
  );
  return { scale, elementRef };
}