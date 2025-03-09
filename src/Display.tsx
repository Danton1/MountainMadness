import { useState } from 'react'
import { observer } from 'mobx-react'
import type { Game } from './game-state'

import SpriteAnimation from './components/SpriteAnimation'
import StatusBar from './components/StatusBar'
import ColorButton from './components/ColorButton'
import './display.css'

interface Props {
  game: Game
}

export const Display = observer(({ game }: Props) => {
  // Use the pet's properties from the MobX state
  const { pet } = game
  const hungerValue = pet.hunger
  const happinessValue = pet.happiness
  const healthValue = pet.health
  const insanityValue = pet.sanity

  // Define the size you want to set for the GIF
  const constantWidth = 150
  const constantHeight = 150

  return (
    <div className="checkered-background hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="main-element">
          <SpriteAnimation
            width={constantWidth}
            height={constantHeight}
            // animationState={game.state}
          />
        </div>

        <div className="button-scroll-container">
          <div className="button-container">
            <ColorButton
              setCount={setCount} // Pass setCount to the button
              textColor="black"
              isFirst={true} // Mark the first button
            >
              Feed
            </ColorButton>
            <ColorButton
              setCount={setCount} // Pass setCount to the button
              textColor="black"
            >
              Play
            </ColorButton>
            <ColorButton
              setCount={setCount} // Pass setCount to the button
              textColor="black"
              isLast={true} // Mark the last button
            >
              Clean
            </ColorButton>
          </div>
        </div>
      </div>
    </div>
  )
})
