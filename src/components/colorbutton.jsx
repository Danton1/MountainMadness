import './floatAndFade.css' // Import the CSS file

export default function ColorButton({
  textColor = '#333333',
  children,
  onClick,
  isFirst = false,
  isLast = false,
  baseColor = '255, 140, 0',
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center justify-center
        w-[175px] h-[50px]
        text-lg font-bold rounded-[20px]
        bg-transparent cursor-pointer
        transition-transform duration-100
        hover:scale-102 active:scale-95
        before:content-[''] before:absolute before:inset-0
        before:z-[-1] before:rounded-[20px]
        before:border-2
        shadow-xl hover:shadow-2xl
        select-none
        ${isFirst ? 'ml-[18px]' : ''}
        ${isLast ? 'mr-[18px]' : ''}
      `}
      style={{
        color: textColor,
        '--base-color': baseColor,
        '--base-color-dark': `${baseColor
          .split(',')
          .map((c) => Math.max(0, Number(c) - 15))
          .join(',')}`,
        '--base-color-shadow': `${baseColor
          .split(',')
          .map((c) => Math.max(0, Number(c) - 40))
          .join(',')}`,
        backgroundImage: `linear-gradient(180deg, rgba(var(--base-color), 0.55) 58%, rgba(var(--base-color-dark), 0.55))`,
        '--tw-border-opacity': '0.58',
        borderColor: `rgba(var(--base-color-shadow), var(--tw-border-opacity))`,
      }}
    >
      {children}
    </button>
  )
}
