interface Props {
  textColor?: string
  children: React.ReactNode
  onClick?: () => void
  // baseColor?: string
  className?: string
}

export default function ColorButton({
  textColor = 'white',
  children,
  onClick,
  // baseColor = '255, 140, 0',
  className,
}: Props) {
  // Calculate darker shades
  // const darkColor = baseColor
  //   .split(',')
  //   .map((c) => Math.max(0, Number(c) - 15))
  //   .join(',')
  // const shadowColor = baseColor
  //   .split(',')
  //   .map((c) => Math.max(0, Number(c) - 40))
  //   .join(',')

  return (
    <button
      onClick={onClick}
      className={
        `
        relative flex items-center justify-center
        w-[175px] h-[50px]
        text-lg font-bold rounded-[20px]
        cursor-pointer
        transition-transform duration-100
        hover:scale-102 active:scale-95
        before:content-[''] before:absolute before:inset-0
        before:z-[-1] before:rounded-[20px]
        before:border-2 before:border-opacity-58
        shadow-xl hover:shadow-2xl
        select-none
        first:ml-[18px] last:mr-[18px]
      ` + className
      }
      style={{
        color: textColor,
        // backgroundImage: `linear-gradient(180deg, rgba(${baseColor}, 0.55) 58%, rgba(${darkColor}, 0.55))`,
      }}
    >
      {children}
    </button>
  )
}
