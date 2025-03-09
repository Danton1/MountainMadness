import { useState } from "react";
import "./App.css";
import ColorButton from "./components/ColorButton";
import SpriteAnimation from "./components/SpriteAnimation"; // Import the SpriteAnimation

function App() {
  const [count, setCount] = useState(0);

  // Define the size you want to set for the GIF
  const constantWidth = 150;
  const constantHeight = 150;

  return (
    <>
      <h1>Vite + React</h1>
      <div className="main-element">
        <SpriteAnimation width={constantWidth} height={constantHeight} />{" "}
        {/* Pass width and height here */}
      </div>
      <div className="main-element">
        <ColorButton
          setCount={setCount} // Pass setCount to the button
          buttonColor="green"
          textColor="black"
        >
          Count is {count} {/* Show the current count */}
        </ColorButton>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
