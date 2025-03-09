import React, { useState, useEffect } from 'react'

export default function SpriteAnimation({
  width,
  height,
  insanity,
  animationState,
}) {
  const [gifSrc, setGifSrc] = useState(null)

  useEffect(() => {
    // Set the source based on animation state and insanity level
    let gifPath = '/pet-animations/idle.gif'

    // Handle different animation states
    if (animationState === 'PET_FEEDING') {
      gifPath = '/pet-animations/feeding.gif'
    } else if (animationState === 'PET_PLAYING') {
      gifPath = '/pet-animations/playing.gif'
    } else if (animationState === 'PET_CLEANING') {
      gifPath = '/pet-animations/cleaning.gif'
    } else if (
      animationState === 'PET_TALKING' ||
      animationState === 'PET_CHANGING'
    ) {
      gifPath = '/pet-animations/talking.gif'
    } else {
      // Default idle state varies by insanity level
      if (insanity >= 25 && insanity < 50) {
        gifPath = '/pet-animations/25.gif'
      } else if (insanity >= 50 && insanity < 75) {
        gifPath = '/pet-animations/50.gif'
      } else if (insanity >= 75) {
        gifPath = '/pet-animations/100.gif'
      }
    }

    setGifSrc(gifPath)

    // Cleanup function
    return () => {
      setGifSrc(null)
    }
  }, [insanity, animationState])

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
  );
}
