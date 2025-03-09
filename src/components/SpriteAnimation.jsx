import React, { useState, useEffect } from 'react'

export default function SpriteAnimation({ width, height, insanity }) {
  const [gifSrc, setGifSrc] = useState(null)

  useEffect(() => {
    // Set the source of the local GIF in the public folder
    let gifPath = setGifSrc('/pet-animations/eating.gif')
    if (insanity >= 25 && insanity < 50) {
      gifPath = '/pet-animations/25.gif'
    } else if (insanity >= 50 && insanity < 75) {
      // TODO
      // gifPath = '/pet-animations/50.gif'
    } else if (insanity >= 75) {
      // TODO
      // gifPath = '/pet-animations/100.gif'
    }
    setGifSrc(gifPath)

    // Cleanup function
    return () => {
      setGifSrc(null)
    }
  }, [insanity])

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
