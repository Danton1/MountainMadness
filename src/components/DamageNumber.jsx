import { useEffect } from 'react'

export default function DamageNumber({
  value,
  onComplete,
  randomX,
  baseColor = '255, 140, 0', // Default base color in RGB format
}) {
  useEffect(() => {
    const timeout = setTimeout(onComplete, 1500)
    return () => clearTimeout(timeout)
  }, [onComplete])

  const darkColor = baseColor
    .split(',')
    .map((c) => Math.max(0, Number(c) - 100))
    .join(',')

  return (
    <div
      className="fixed top-[60%] text-xl font-bold pointer-events-none select-none
                animate-floatAndFade z-[4]"
      style={{
        '--random-x': `${randomX}px`,
        color: `rgb(${darkColor})`,
      }}
    >
      {value}
    </div>
  )
}
