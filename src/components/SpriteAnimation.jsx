import React, { useState, useEffect } from 'react'

export default function SpriteAnimation({ width, height }) {
  const [gifSrc, setGifSrc] = useState(null)

  useEffect(() => {
    // Set the source of the local GIF in the public folder
    setGifSrc('/pet-animations/idle.gif')

    // Cleanup function
    return () => {
      setGifSrc(null)
    }
  }, [])

  if (!gifSrc) return null // Don't render until GIF source is loaded

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      {/* Image with dynamic width and height passed as props */}
      <img
        src={gifSrc}
        alt="Animated GIF"
        style={{
          width: `${width}px`, // Apply dynamic width from props
          height: `${height}px`, // Apply dynamic height from props
          objectFit: 'contain', // Fit the GIF without distortion
          imageRendering: 'pixelated', // Apply integer scaling to avoid blurring
        }}
      />
    </div>
  )
}
