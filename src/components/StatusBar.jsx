const StatusBar = ({ title, value }) => {
    return (
        <>
        <div class="text-xl font-medium text-black dark:text-white">{title}</div>
        <progress className="progress w-56" value={value} max="100"></progress>
        </>
    );
    }

export default StatusBar;