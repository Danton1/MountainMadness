import { useEffect, useState } from 'react'

const StatusBar = ({ title, value }) => {
  const [count, setCount] = useState(value)

  useEffect(() => {
    setCount(value)
  }, [value])

  return (
    <div className="status-bar">
      <div className="status-bar-title text-xl font-medium">{title}</div>
      <progress
        className="progress progress-info w-56"
        value={count}
        max="100"
      ></progress>
    </div>
  )
}

export default StatusBar
