import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

interface ShimmerImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  // Use these for the container dimensions as well
  width?: number | string; // Allow string like '100%'
  height?: number | string; // Allow string like '100%'
  // Loader dimensions (can differ if needed, but usually same as container)
  loaderWidth?: number;
  loaderHeight?: number;
  loaderBackgroundColor?: string;
  loaderForegroundColor?: string;
  loaderSpeed?: number;
  objectFit?: React.CSSProperties['objectFit']; // Add object-fit prop
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void; // Add onError prop
}

const ShimmerImage: React.FC<ShimmerImageProps> = ({
  src,
  alt = "",
  className,
  style = {},
  width = "100%", // Default to 100%
  height = "auto", // Default to auto or a specific aspect ratio height
  loaderWidth = 400, // Default loader internal width
  loaderHeight = 300, // Default loader internal height
  loaderBackgroundColor = "#e0e0e0",
  loaderForegroundColor = "#c0c0c0",
  loaderSpeed = 1.5,
  objectFit = "cover", // Default object-fit
  onError, // Pass onError down
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset loaded/error state if src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    setError(false); // Ensure error state is cleared on successful load
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setError(true);
    setLoaded(true); // Treat error as 'loaded' to hide shimmer
    if (onError) {
      onError(event); // Propagate error event if handler is provided
    }
    console.error("Image failed to load:", src); // Log error
  };

  // Determine container dimensions
  const containerWidth = typeof width === 'number' ? `${width}px` : width;
  const containerHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={className}
      style={{
        position: "relative", // Keep relative positioning
        display: "inline-block", // Or 'block' depending on layout needs
        width: containerWidth, // Apply width prop
        height: containerHeight, // Apply height prop
        overflow: "hidden", // Keep overflow hidden
        backgroundColor: !loaded ? loaderBackgroundColor : 'transparent', // Optional: Background while loading
        verticalAlign: 'middle', // Helps with inline-block alignment
        ...style, // Allow overriding styles
      }}
    >
      {!loaded && !error && ( // Show loader only if not loaded and no error
        <ContentLoader
          speed={loaderSpeed}
          width={loaderWidth} // Use specific loader dimensions if needed
          height={loaderHeight} // Use specific loader dimensions if needed
          viewBox={`0 0 ${loaderWidth} ${loaderHeight}`}
          backgroundColor={loaderBackgroundColor}
          foregroundColor={loaderForegroundColor}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%", // Loader fills the container
            height: "100%", // Loader fills the container
          }}
        >
          {/* You can customize the loader shape here */}
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </ContentLoader>
      )}

      {/* Conditionally render an error placeholder if needed */}
      {error && (
         <div style={{ /* Basic error state indicator */
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#f0f0f0', color: '#888'
         }}>
            <span>Error</span>
         </div>
      )}

      {/* Render image tag only if src is valid and no error initially,
          control visibility via opacity */}
      {src && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: 'block', // Prevents extra space below image
            position: "absolute", // Position over the loader/error placeholder
            top: 0,
            left: 0,
            width: "100%", // Image fills container
            height: "100%", // Image fills container
            objectFit: objectFit, // Use object-fit prop
            opacity: loaded && !error ? 1 : 0, // Fade in only if loaded and no error
            transition: "opacity 0.4s ease-in-out",
            visibility: loaded || error ? 'visible' : 'hidden', // Ensure it's visible once loaded/error
          }}
        />
       )}
    </div>
  );
};

export default ShimmerImage;