import { useState } from 'react'

export default function ColorButton({
  setCount,
  textColor = '#333333', // You can keep the text color as a prop if you like
  children,
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Replace with original button styles (no custom color)
  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
    textDecoration: 'none',
    color: textColor, // Dynamically set the text color
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '20px',
    width: isHovered ? '176px' : '175px', // Adjust width on hover
    height: isHovered ? '51px' : '50px', // Adjust height on hover
    transition: '0.2s',
    boxShadow: isHovered
      ? '0px 0px 0px 8px rgba(255, 180, 0, 0.58)'
      : '0px 0px 0px 7px rgba(255, 180, 0, 0.58)', // Adjust box-shadow on hover
    backgroundColor: 'transparent', // Transparent background to work with gradient
    backgroundImage: `linear-gradient(180deg, rgba(255, 140, 0, 0.55) 58%, rgba(255, 125, 0, 0.55)), 
                      linear-gradient(#FF8C00, #FF7D00)`, // Predefined gradient colors (no custom color)
    backgroundSize: '100%, 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '0',
    cursor: 'pointer',
    position: 'relative',
  }

  // Styles for the pseudo-element
  const beforeStyles = {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    inset: '-1px',
    marginInline: 'auto',
    background: 'linear-gradient(hsl(240, 74%, 30%), hsl(0, 0%, 38%))',
    borderRadius: '100vw',
  }

  return (
    <button
      onClick={() => setCount((prevCount) => prevCount + 1)} // Update count when button is clicked
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)} // Set hover state
      onMouseLeave={() => setIsHovered(false)} // Remove hover state
    >
      {children} {/* Render the custom text or content passed to the button */}
      <span style={beforeStyles}></span>
    </button>
  )
}
