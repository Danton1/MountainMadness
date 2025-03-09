import { useEffect } from 'react'

export default function DamageNumber({
  value,
  top,
  left,
  onComplete,
  randomX,
}) {
  useEffect(() => {
    const timeout = setTimeout(onComplete, 1500)
    return () => clearTimeout(timeout)
  }, [onComplete])

  return (
    <div
      className="absolute text-xl font-bold text-black pointer-events-none select-none
                animate-floatAndFade"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        '--random-x': `${randomX}px`,
      }}
    >
      {value}
    </div>
  )
}
