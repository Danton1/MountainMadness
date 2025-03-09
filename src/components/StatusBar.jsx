import { useEffect, useState } from "react";

const StatusBar = ({ title, value }) => {
    const [count, setCount] = useState(value);

    useEffect(() => {
        setCount(value);
    }, [value]);

    return (
        <>
        <div class="text-xl font-medium text-sky-600">{title}</div>
        <progress className="progress progress-info w-56" value={count} max="100"></progress>
        </>
    );
}

export default StatusBar;