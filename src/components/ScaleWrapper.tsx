"use client";

import { useEffect, useState, useRef } from "react";

export function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | "auto">("auto");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const updateScale = () => {
      const currentWidth = window.innerWidth;
      const targetWidth = 1280;
      
      if (currentWidth < targetWidth) {
        const newScale = currentWidth / targetWidth;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateScale();
      }, 50);
    };

    // Initial calculations
    updateScale();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (wrapperRef.current) {
        if (scale < 1) {
          // Calculate actual height needed after scaling
          const actualHeight = wrapperRef.current.scrollHeight * scale;
          setContainerHeight(actualHeight);
        } else {
          setContainerHeight("auto");
        }
      }
    };
    
    updateHeight();

    // Set up a ResizeObserver to catch content height changes dynamically
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [scale]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        height: containerHeight,
      }}
    >
      <div
        id="scale-wrapper"
        ref={wrapperRef}
        style={{
          width: scale < 1 ? "1280px" : "100%",
          minHeight: "100vh",
          transform: scale < 1 ? `scale(${scale})` : "none",
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
