import { useState } from 'react'

export default function ColorButton() {
  const [color, setColor] = useState('blue')

  const changeColor = () => {
    setColor(color === 'blue' ? 'red' : 'blue')
  }

  const buttonStyles = {
    backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.85), transparent 10px),
      linear-gradient(hsl(0 0% 100% / 0.25) 10px, transparent 10px),
      radial-gradient(circle at 10px 5px, hsl(0 0% 100% / 0.25) 5px, transparent 5px),
      radial-gradient(circle at 0px 5px, hsl(0 0% 100% / 0.25) 5px, transparent 5px),
      linear-gradient(hsl(213, 79%, 56%), hsl(181, 95%, 92%))`,
    padding: '0.5em 3em',
    backgroundSize: '100%, calc(100% - 20px), 10px 10px, 10px 10px, 100%',
    backgroundPosition: 'top, top center, top left, top right, center',
    backgroundRepeat: 'no-repeat',
    border: '0',
    borderRadius: '100vw',
    position: 'relative',
    color: '#333333',
  }

  const beforeStyles = {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    inset: '-1px',
    marginInline: 'auto',
    background: 'linear-gradient(hsl(240, 74%, 30%), hsl(0, 0%, 38%))',
    borderRadius: '100vw',
  }

  return (
    <button onClick={changeColor} style={buttonStyles}>
      Click me
      <span style={beforeStyles}></span>
    </button>
  )
}
