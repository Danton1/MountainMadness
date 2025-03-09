const StatusBar = ({ title, value }) => {
  return (
    <div className="status-bar">
      <div className="status-bar-title text-xl font-medium">{title}</div>
      <progress
        className="progress progress-info w-56"
        value={value}
        max="100"
      ></progress>
    </div>
  )
}

export default StatusBar
