import { useEffect, useState, useRef } from 'react';

export function useParallax(speed: number = 0.5, offset: number = 0) {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      const yPos = -(rate + offset);

      // Only apply transform when element is in viewport or near it
      if (rect.bottom >= -200 && rect.top <= window.innerHeight + 200) {
        setTransform(`translate3d(0, ${yPos}px, 0)`);
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [speed, offset]);

  return { transform, elementRef };
}

export function useParallaxRotation(speed: number = 0.1) {
  const [rotation, setRotation] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rotationValue = scrolled * speed;

      if (rect.bottom >= -200 && rect.top <= window.innerHeight + 200) {
        setRotation(rotationValue);
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [speed]);

  return { rotation, elementRef };
}

export function useParallaxScale(baseScale: number = 1, speed: number = 0.0005) {
  const [scale, setScale] = useState(baseScale);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const scaleValue = baseScale + (scrolled * speed);

      if (rect.bottom >= -200 && rect.top <= window.innerHeight + 200) {
        setScale(Math.max(0.8, Math.min(1.2, scaleValue)));
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 16);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [baseScale, speed]);

  return { scale, elementRef };
}

// Throttle function for performance optimization
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}