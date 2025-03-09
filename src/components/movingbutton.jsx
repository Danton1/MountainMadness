import { useState, useEffect } from "react";

export default function MovingButton({
  setCount,
  textColor = "#333333",
  children,
  clickFn = () => setCount((prevCount) => prevCount + 1),
}) {
  const [btnTranslate, setBtnTranslate] = useState({ x: 0, y: 0 }); // State for button translation
  const [mouseX, setMouseX] = useState(0); // State for mouse X position
  const [mouseY, setMouseY] = useState(0); // State for mouse Y position

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update button position based on mouse proximity
  useEffect(() => {
    const button = document.getElementById("exit-btn");
    if (!button) return;

    const btnRect = button.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distX = mouseX - btnCenterX;
    const distY = mouseY - btnCenterY;
    const distance = Math.sqrt(distX ** 2 + distY ** 2);

    const threshold = 140; // Distance threshold for button movement
    if (distance < threshold) {
      const moveX = (distX / distance) * 7; // Move speed in X direction
      const moveY = (distY / distance) * 7; // Move speed in Y direction

      setBtnTranslate((prev) => ({
        x: prev.x - moveX,
        y: prev.y - moveY,
      }));
    }
  }, [mouseX, mouseY]);

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
    width: '175px', // Adjust width on hover
    height: '50px', // Adjust height on hover
    boxShadow: '0px 0px 0px 7px rgba(255, 0, 0, 0.58)', // Adjust box-shadow on hover
    backgroundColor: 'transparent', // Transparent background to work with gradient
    backgroundImage: `linear-gradient(180deg, rgba(255, 0, 0, 0.55) 58%, rgba(255, 125, 0, 0.55)), 
                      linear-gradient(#FF8C00,rgb(255, 0, 0))`, // Predefined gradient colors (no custom color)
    backgroundSize: '100%, 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '0',
    cursor: 'pointer',
    position: 'relative',
    transform: `translate(${btnTranslate.x}px, ${btnTranslate.y}px)`, // Apply translation
    transition: "transform 0s", // Smooth transition for movement
  };

  return (
    <button
      id="exit-btn" // Add ID for targeting
      onClick={clickFn} // Update count when button is clicked
      style={buttonStyles}
    >
      {children} {/* Render the custom text or content passed to the button */}
    </button>
  );
}
