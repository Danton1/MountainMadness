import { useState } from "react";

const StatusBar = ({ title, value, rate = 1000, direction = "down"}) => {
    const [count, setCount] = useState(value);

    if (count => 0 && count <= 100) {
        setTimeout(() => {
            if (direction == "up") {
                setCount(count + 1);
            } else {
                setCount(count - 1);
            }
            console.log(title + " " + count); 
        },rate);
    }

    return (
        <>
        <div class="text-xl font-medium text-black dark:text-white">{title}</div>
        <progress className="progress w-56" value={count} max="100"></progress>
        </>
    );
}

export default StatusBar;