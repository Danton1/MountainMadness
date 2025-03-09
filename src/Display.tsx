import { useState } from 'react'
import { observer } from 'mobx-react'
import type { Game } from './game-state'

import SpriteAnimation from './components/SpriteAnimation'
import StatusBar from './components/StatusBar'
import Pet from './components/Pet'
import PetTalks from './game-state/petTalks'
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
            animationState={game.state}
            insanity={insanityValue}
          />
        </div>

        {/* Display dialogue when the pet is talking */}
        {game.talkingActive && (
          <div className="speech-bubble mb-4 p-3 bg-white rounded-lg border border-gray-300 shadow-md">
            {game.currentDialogue}
          </div>
        )}

        <Pet
          hunger={hungerValue}
          happiness={happinessValue}
          health={healthValue}
          sanity={insanityValue}
        />

        <div className="text-rose-900">
          <StatusBar title="Health" value={healthValue} />
          <StatusBar title="Hunger" value={hungerValue} />
          <StatusBar title="Happiness" value={happinessValue} />
          <StatusBar title="Insanity" value={insanityValue} />
        </div>
      </div>
    </div>
  )
})
