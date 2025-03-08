import { useState, useEffect } from "react";
import ColorButton from "./colorbutton"

export default function GameEnd(){
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [btnPos, setBtnPos] = useState({ top: 0, left: 0 });

    const popupStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        backgroundColor: '#242424',
        border: '1px solid white',
        borderRadius: '20px',
        padding: '20px'
    }

    //Detect and track mouse movement
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMouseX(event.clientX);
            setMouseY(event.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    //Move button away when mouse gets close
    useEffect(() => {
        const button = document.getElementById("exit-btn");
        if (!button) return;

        const btnRect = button.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const distX = mouseX - btnCenterX;
        const distY = mouseY - btnCenterY;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        const threshold = 80;       //Distance where button starts moving
        if (distance < threshold) {
            const moveX = (distX / distance) * 5;
            const moveY = (distY / distance) * 5;

            setBtnPos((prev) => ({
                top: Math.max(0, prev.top - moveY),
                left: Math.max(0, prev.left - moveX),
            }));
        }
    }, [mouseX, mouseY]);

    return (
        <div style={popupStyle}>
            <h1>Tamagotchi is <b>DEAD</b></h1>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'}}>
                <button>Watch AD to revive</button>
                <button
                    id="exit-btn"
                    style={{
                        position: "relative",
                        top: `${btnPos.top}px`,
                        left: `${btnPos.left}px`,
                        transition: "top 0.2s, left 0.2s",
                    }}
                >
                    Exit
                </button>
            </div>      
        </div>
    );
}