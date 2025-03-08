import { useEffect, useState } from "react";

const StatusBar = ({ title, value }) => {
    const [count, setCount] = useState(value);

    useEffect(() => {
        setCount(value);
    }, [value]);

    return (
        <>
        <div class="text-xl font-medium text-black dark:text-white">{title}</div>
        <progress className="progress w-56" value={count} max="100"></progress>
        </>
    );
}

export default StatusBar;