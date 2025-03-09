import { useState, useEffect } from "react";

export default function GameEnd() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [btnTranslate, setBtnTranslate] = useState({ x: 0, y: 0 }); // Use translate for position
  const [video, setVideo] = useState(false);

  function exit() {
    console.log("here");
  }

  const popupStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
    backgroundColor: "#242424",
    border: "1px solid white",
    borderRadius: "20px",
    padding: "20px",
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const button = document.getElementById("exit-btn");
    if (!button) return;

    const btnRect = button.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distX = mouseX - btnCenterX;
    const distY = mouseY - btnCenterY;
    const distance = Math.sqrt(distX ** 2 + distY ** 2);

    const threshold = 80;
    if (distance < threshold) {
      const moveX = (distX / distance) * 5;
      const moveY = (distY / distance) * 5;

      setBtnTranslate((prev) => ({
        x: prev.x - moveX,
        y: prev.y - moveY,
      }));
    }
  }, [mouseX, mouseY]);

  return (
    <div style={popupStyle}>
      <h1>
        Tamagotchi is <b>DEAD</b>
      </h1>
      <h2>
        Watch an ad to continue or <span onClick={exit} style={{cursor: 'pointer'}}>exit here</span>
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <button onClick={()=>{setVideo(true)}}>Watch AD to revive</button>
        <button
          id="exit-btn"
          style={{
            position: "relative",
            transform: `translate(${btnTranslate.x}px, ${btnTranslate.y}px)`, // Apply translate
            transition: "transform 0.2s", // Transition the transform
          }}
          onClick={exit}
        >
          Exit
        </button>
      </div>
      {video && (
        <video autoPlay style={{ marginTop: "20px", width: "100%", maxWidth: "600px" }}>
          <source src="src/assets/yukon.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}