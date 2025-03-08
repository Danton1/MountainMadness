import { useState } from "react";
import "./App.css";
import ColorButton from "./components/colorbutton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <ColorButton
          count={count}
          setCount={setCount}
          buttonColor="purple"
          textColor="#262626"
        />
      </div>
      <div></div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
