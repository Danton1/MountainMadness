export default function ColorButton({
  textColor = '#333333',
  children,
  onClick,
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
        before:border-2 before:border-[rgba(255,180,0,0.58)]
        bg-gradient-to-b from-[rgba(255,140,0,0.55)] from-58% to-[rgba(255,125,0,0.55)]
        shadow-xl hover:shadow-2xl
        select-none
      `}
      style={{
        color: textColor,
      }}
    >
      {children}
    </button>
  )
}
