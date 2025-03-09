import { useState } from 'react'
import ColorButton from './colorbutton'
import DamageNumber from './DamageNumber'
import './floatAndFade.css'

interface DamageNumberButtonProps {
  textColor?: string
  children: React.ReactNode
  onClick?: () => void
}

export default function DamageNumberButton({
  textColor,
  children,
  onClick,
}: DamageNumberButtonProps) {
  const [damageNumbers, setDamageNumbers] = useState<
    Array<{
      id: number
      value: number
      top: number
      left: number
      randomX: number
    }>
  >([])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.()

    const damageValue = Math.floor(Math.random() * 100) + 1
    const buttonRect = event.currentTarget.getBoundingClientRect()
    const top = buttonRect.top + window.scrollY
    const left = buttonRect.left + buttonRect.width / 2
    const randomX = (Math.random() - 0.5) * 100

    setDamageNumbers((prev) => [
      ...prev,
      { id: Date.now(), value: damageValue, top, left, randomX },
    ])
  }

  const removeDamageNumber = (id: number) => {
    setDamageNumbers((prev) => prev.filter((number) => number.id !== id))
  }

  return (
    <>
      <ColorButton textColor={textColor} onClick={handleClick}>
        {children}
      </ColorButton>

      {damageNumbers.map((number) => (
        <DamageNumber
          key={number.id}
          value={number.value}
          top={number.top}
          left={number.left}
          onComplete={() => removeDamageNumber(number.id)}
          randomX={number.randomX}
        />
      ))}
    </>
  )
}
