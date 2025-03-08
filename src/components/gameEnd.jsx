import { useState } from "react";
import ColorButton from "./colorbutton"

export default function GameEnd(){
    const [size, setSize] = useState(0);
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
    return (
        <div style={popupStyle}>
            <h1>Tamagotchi is <b>DEAD</b></h1>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'}}>
                <button>Watch AD to revive</button>
                <button>Exit</button>
            </div>      
        </div>
    );
}