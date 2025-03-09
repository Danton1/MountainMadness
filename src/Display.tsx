import { useState, useEffect } from 'react'

import { GameState } from './game-state'

import ColorButton from './components/colorbutton'
import SpriteAnimation from './components/SpriteAnimation'
import StatusBar from './components/StatusBar'
import Pet from './components/Pet'
import './display.css'; 

interface Props {
  state: GameState
  gameEnd: () => void
}

export function Display({ gameEnd }: Props) {
  // TODO: remove placeholders and implement

  const [count, setCount] = useState(0)
  const [hungerValue, setHungerValue] = useState(100)
  const [happinessValue, setHappinessValue] = useState(100)
  const [insanityValue, setInsanityValue] = useState(0)
  
  useEffect(() => {
    if (hungerValue > 0) {
      setTimeout(() => {
        setHungerValue(hungerValue - 1)
      }, 1000)
    }
    if (happinessValue > 0) {
      setTimeout(() => {
        setHappinessValue(happinessValue - 1)
      }, 1500)
    }
    if (insanityValue < 100) {
      setTimeout(() => {
        setInsanityValue(insanityValue + 1)
      }, 2500)
    }
  }, [hungerValue, happinessValue, insanityValue])

  // Define the size you want to set for the GIF
  const constantWidth = 150
  const constantHeight = 150

  return (
    <div className="checkered-background hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="main-element">
          <SpriteAnimation width={constantWidth} height={constantHeight} />
        </div>

        <Pet
          hunger={hungerValue}
          happiness={happinessValue}
          sanity={insanityValue}
          gameEnd={gameEnd}
        />

        <div className="text-rose-900">
          <StatusBar title="Hunger" value={hungerValue} />
          <StatusBar title="Happiness" value={happinessValue} /* rate={50} */ />
          <StatusBar
            title="Insanity"
            value={insanityValue}
            // rate={2000}
            // direction="up"
          />
        </div>

        <div className="main-element">
          <ColorButton
            setCount={setCount} // Pass setCount to the button
            textColor="black"
          >
            Count is {count}
          </ColorButton>
        </div>
      </div>
    </div>
  )
}