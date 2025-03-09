import { useState, useEffect } from "react";

export default function MovingButton({
  setCount,
  buttonColor = "blue",
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

    const threshold = 120; // Distance threshold for button movement
    if (distance < threshold) {
      const moveX = (distX / distance) * 5; // Move speed in X direction
      const moveY = (distY / distance) * 5; // Move speed in Y direction

      setBtnTranslate((prev) => ({
        x: prev.x - moveX,
        y: prev.y - moveY,
      }));
    }
  }, [mouseX, mouseY]);

  const buttonStyles = {
    backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.85), transparent 10px),
      linear-gradient(hsl(0 0% 100% / 0.25) 10px, transparent 10px),
      radial-gradient(circle at 10px 5px, hsl(0 0% 100% / 0.25) 5px, transparent 5px),
      radial-gradient(circle at 0px 5px, hsl(0 0% 100% / 0.25) 5px, transparent 5px),
      linear-gradient(${buttonColor}, hsl(181, 95%, 92%))`, // Use the passed button color
    padding: "0.5em 3em",
    backgroundSize: "100%, calc(100% - 20px), 10px 10px, 10px 10px, 100%",
    backgroundPosition: "top, top center, top left, top right, center",
    backgroundRepeat: "no-repeat",
    border: "0",
    borderRadius: "100vw",
    position: "relative",
    color: textColor, // Dynamically set the text color
    transform: `translate(${btnTranslate.x}px, ${btnTranslate.y}px)`, // Apply translation
    transition: "transform 0.00001s", // Smooth transition for movement
  };

  const beforeStyles = {
    content: '""',
    position: "absolute",
    zIndex: -1,
    inset: "-1px",
    marginInline: "auto",
    background: "linear-gradient(hsl(240, 74%, 30%), hsl(0, 0%, 38%))",
    borderRadius: "100vw",
  };

  return (
    <button
      id="exit-btn" // Add ID for targeting
      onClick={clickFn} // Update count when button is clicked
      style={buttonStyles}
    >
      {children} {/* Render the custom text or content passed to the button */}
      <span style={beforeStyles}></span>
    </button>
  );
}
