import React, { useState, useEffect } from "react";

export default function SpriteAnimation() {
  const [gifSrc, setGifSrc] = useState(null);

  // Desired constant size for the gif
  const constantWidth = 200; // Desired width
  const constantHeight = 200; // Desired height

  useEffect(() => {
    // Set the source of the local GIF in the public folder
    setGifSrc("/pet-animations/idle.gif");

    // Cleanup function
    return () => {
      setGifSrc(null);
    };
  }, []);

  if (!gifSrc) return null; // Don't render until GIF source is loaded

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <img
        src={gifSrc}
        alt="Animated GIF"
        style={{
          width: `${constantWidth}px`, // Apply constant width
          height: `${constantHeight}px`, // Apply constant height
          objectFit: "contain", // Fit the GIF without distortion
          imageRendering: "pixelated", // Apply integer scaling
        }}
      />
    </div>
  );
}
