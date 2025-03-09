export default function ColorButton({
  textColor = '#333333', // You can keep the text color as a prop if you like
  children,
  onClick,
}) {
  // Replace with original button styles (no custom color)
  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
    textDecoration: 'none',
    color: textColor,
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '20px',
    width: '175px', // Fixed width
    height: '50px', // Fixed height
    transition: 'transform 0.1s, box-shadow 0.1s', // Smooth transition for transform and box-shadowx
    backgroundColor: 'transparent', // Transparent background to work with gradient
    backgroundImage: `linear-gradient(180deg, rgba(255, 140, 0, 0.55) 58%, rgba(255, 125, 0, 0.55)), 
                      linear-gradient(#FF8C00, #FF7D00)`, // Predefined gradient colors (no custom color)
    backgroundSize: '100%, 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '0',
    cursor: 'pointer',
    position: 'relative',
    boxSizing: 'border-box', // Ensures padding and borders are included in the width/height
  }

  const beforeStyles = {
    content: '""',
    position: 'absolute',
    zIndex: -1, // Ensure it stays behind the button content
    inset: '0', // Cover the entire button
    background: 'transparent', // Remove the blue gradient
    borderRadius: '20px', // Match the button's border radius
    border: '2px solid rgba(255, 180, 0, 0.58)', // Add a border if needed
  }

  return (
    <button
      onClick={onClick}
      style={buttonStyles}
      className="active:transform-[scale(0.95)] hover:transform-[scale(1.02)] transform-[scale(1)] first:m-[18px] last:m-[18px] mx-0 w-[175px] hover:w-[176px] h-50px hover:h-[51px] shadow-xl hover:shadow-2xl "
    >
      {children}
      <span style={beforeStyles}></span>
    </button>
  )
}
