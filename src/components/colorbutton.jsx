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
    transition: '0.2s',
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
    zIndex: -1,
    inset: '-1px',
    marginInline: 'auto',
    background: 'linear-gradient(hsl(240, 74%, 30%), hsl(0, 0%, 38%))',
    borderRadius: '100vw',
    padding: '10px',
  }

  return (
    <button
      onClick={onClick} // Update count when button is clicked
      style={buttonStyles}
      className="first:m-[18px] last:m-[18px] mx-0 w-[175px] hover:w-[176px] h-50px hover:h-[51px] shadow-xl hover:shadow-2xl "
    >
      {children}
      <span style={beforeStyles}></span>
    </button>
  )
}
