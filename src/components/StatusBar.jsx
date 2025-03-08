const StatusBar = ({ title, value, rate = "1000"}) => {
    setInterval(() => {
        value = value - 1;
        console.log("Test");
        console.log(value);
    },rate);
    
    return (
        <>
        <div class="text-xl font-medium text-black dark:text-white">{title}</div>
        <progress className="progress w-56" value={value} max="100"></progress>
        </>
    );
}



export default StatusBar;