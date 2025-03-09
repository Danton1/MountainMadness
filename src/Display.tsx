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
  const hungerValue = pet.hunger
  const happinessValue = pet.happiness
  const healthValue = pet.health
  const insanityValue = pet.sanity

  useEffect(() => {
    game.triggerPetTalking()
  }, [hungerValue, happinessValue, insanityValue])

  // Define the size you want to set for the GIF
  const constantWidth = 150
  const constantHeight = 150

  return (
    <div className="flex flex-col place-items-stretch h-full">
      <div className="flex-auto flex flex-row gap-[30px] items-center justify-center top-colored-section">
        <StatusBar title="Hunger" value={hungerValue} />
        <StatusBar title="Happiness" value={happinessValue} />
        <StatusBar title="Insanity" value={insanityValue} />
      </div>
      <div className="flex-auto flex items-center justify-center checkered-background">
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
      <div className="flex-auto bottom-colored-section">{children}</div>
    </div>
    // <div className="checkered-background hero bg-base-200 flex flex-col">
    // <div/>

    //   {/* Add top colored section */}
    //   <div className="flex-col flex-grow fixed top-[33%] h-[33%] left-0 w-full">
    //     <div className="pet-status-container">
    // <div className="pet-container">
    //   <div className="pet-shadow"></div> {/* Add shadow */}
    //   <div className="main-element">
    //     <SpriteAnimation width={constantWidth} height={constantHeight} />
    //   </div>
    // </div>

    //       <div className="status-bars">
    //         <div className="status-bar">
    //           <StatusBar title="Hunger" value={hungerValue} />
    //         </div>
    //         <div className="status-bar">
    //           <StatusBar title="Happiness" value={happinessValue} />
    //         </div>
    //         <div className="status-bar">
    //           <StatusBar title="Insanity" value={insanityValue} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
})
