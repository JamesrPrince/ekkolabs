import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataUrl?: string;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized image component with support for lazy loading, responsive sizes, and fallbacks
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "100vw",
  priority = false,
  placeholder = "empty",
  blurDataUrl,
  loading: loadingProp,
  fallbackSrc = "/fallback-image.png",
  objectFit = "cover",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Determine proper loading strategy
  const loading = priority ? "eager" : loadingProp || "lazy";

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {placeholder === "blur" && !isLoaded && !error && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-custom-primary-lighter/20 blur-md"
          style={{
            backgroundImage: blurDataUrl ? `url(${blurDataUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          !isLoaded && placeholder === "empty" && "invisible",
          objectFit === "contain" && "object-contain",
          objectFit === "cover" && "object-cover",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
        )}
      />
    </div>
  );
}
