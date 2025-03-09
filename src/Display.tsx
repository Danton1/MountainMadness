import { useState } from 'react'
import { observer } from 'mobx-react'
import type { Game } from './game-state'

import SpriteAnimation from './components/SpriteAnimation'
import StatusBar from './components/StatusBar'
import ColorButton from './components/colorbutton'
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
        <div className="pet-status-container">
          <div className="pet-container">
            <div className="pet-shadow"></div> {/* Add shadow */}
            <div className="main-element">
              <SpriteAnimation width={constantWidth} height={constantHeight} />
            </div>
          </div>

          <div className="status-bars">
            <Pet
              hunger={hungerValue}
              happiness={happinessValue}
              sanity={insanityValue}
              gameEnd={gameEnd}
            />
            <StatusBar title="Hunger" value={hungerValue} />
            <StatusBar
              title="Happiness"
              value={happinessValue} /* rate={50} */
            />
            <StatusBar
              title="Insanity"
              value={insanityValue}
              // rate={2000}
              // direction="up"
            />
          </div>
        </div>

        <div className="button-scroll-container">
          <div className="button-container">
            <ColorButton
              baseColor="250, 160, 160"
              setCount={setCount} // Pass setCount to the button
              textColor="black"
              isFirst={true} // Mark the first button
            >
              Feed
            </ColorButton>
            <ColorButton
              baseColor="255, 213, 128"
              setCount={setCount} // Pass setCount to the button
              textColor="black"
            >
              Play
            </ColorButton>
            <ColorButton
              baseColor="144, 238, 144"
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
