import { observer } from 'mobx-react'
import type { Game } from './game-state'

import SpriteAnimation from './components/SpriteAnimation'
import StatusBar from './components/StatusBar'
import PetTalks from './game-state/petTalks'
import './display.css'
import { useEffect } from 'react'

interface Props {
  game: Game
  children?: React.ReactNode
}

export const Display = observer(({ game, children }: Props) => {
  // Use the pet's properties from the MobX state
  const { pet, currentDialogue, talkingActive } = game
  const hungerValue = pet?.hunger ?? 100
  const happinessValue = pet?.happiness ?? 100
  const healthValue = pet?.health ?? 100
  const insanityValue = pet?.sanity ?? 0

  useEffect(() => {
    // Only trigger pet talking if pet is defined and values have changed
    if (
      pet &&
      (hungerValue !== undefined ||
        happinessValue !== undefined ||
        insanityValue !== undefined)
    ) {
      game.triggerPetTalking()
    }
  }, [hungerValue, happinessValue, insanityValue, pet])

  // Define the size you want to set for the GIF
  const constantWidth = 150
  const constantHeight = 150

  return (
    <div className="flex flex-col place-items-stretch h-full">
      <div className="grow flex flex-row gap-[30px] items-center justify-center top-colored-section  border-b-4 border-black">
        <StatusBar title="Hunger" value={hungerValue} />
        <StatusBar title="Happiness" value={happinessValue} />
        <StatusBar title="Insanity" value={insanityValue} />
      </div>
      <div className="grow flex items-center justify-center checkered-background">
        <div className="relative">
          <div className="pet-shadow absolute"></div> {/* Add shadow */}
          {/* Speech bubble popover */}
          {game.talkingActive && (
            <div className="speech-bubble">{game.currentDialogue}</div>
          )}
          <SpriteAnimation
            width={constantWidth}
            height={constantHeight}
            insanity={insanityValue}
            animationState={game.state}
          />
        </div>
      </div>
      <div className="grow bottom-colored-section border-t-4 border-black">
        {children}
      </div>
    </div>
  )
})
