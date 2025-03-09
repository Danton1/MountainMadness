export default function ColorButton ({
  setCount,
  buttonColor = 'blue',
  textColor = '#333333',
  children,
  clickFn = () => setCount((prevCount) => prevCount + 1),
}) {
  const buttonStyles = {
    backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.85), transparent 10px),
      linear-gradient(hsl(0 0% 100% / 0.25) 10px, transparent 10px),
      radial-gradient(circle at 10px 5px, hsl(0 0% 100% / 0.25) 5px, transparent 5px),
      radial-gradient(circle at 0px 5px, hsl(0 0% 100% / 0.25) 5px, transparent 5px),
      linear-gradient(${buttonColor}, hsl(181, 95%, 92%))`, // Use the passed button color
    padding: '0.5em 3em',
    backgroundSize: '100%, calc(100% - 20px), 10px 10px, 10px 10px, 100%',
    backgroundPosition: 'top, top center, top left, top right, center',
    backgroundRepeat: 'no-repeat',
    border: '0',
    borderRadius: '100vw',
    position: 'relative',
    color: textColor, // Dynamically set the text color
  }

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
      onClick={clickFn} // Update count when button is clicked
      style={buttonStyles}
    >
      {children} {/* Render the custom text or content passed to the button */}
      <span style={beforeStyles}></span>
    </button>
  )
}
