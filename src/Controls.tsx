import type { Game, GAME_STATE } from './game-state'
import ColorButton from './components/ColorButton'
import { observer } from 'mobx-react'

interface ActionMenuProps {
  gameState: Game
}

function ActionMenu({ gameState }: ActionMenuProps) {
  return (
    <div className="flex nowrap gap-[30px] items-center justify-center min-h-[100px] overflow-x-auto relative">
      <ColorButton
        onClick={() => gameState.feedPet()}
        className="shadow-red-500/50 bg-radial-[at_50%_75%] from-red-500 to-red-500/50"
        textColor="white"
      >
        Feed
      </ColorButton>
      <ColorButton
        onClick={() => gameState.playWithPet()}
        className="shadow-yellow-600/50 bg-radial-[at_50%_75%] from-yellow-600 to-yellow-600/50"
        textColor="white"
      >
        Play
      </ColorButton>
      <ColorButton
        onClick={() => gameState.cleanPet()}
        className="shadow-green-400/50 bg-radial-[at_50%_75%] from-green-400 to-green-400/50"
        textColor="white"
      >
        Clean
      </ColorButton>
    </div>
  )
}

interface Props {
  gameState: Game
}

export const Controls = observer(({ gameState }: Props) => {
  // Use the game state directly to determine which UI to show
  switch (gameState.state) {
    case 'PET_IDLE':
      return <ActionMenu gameState={gameState} />
    case 'PET_FEEDING':
      return <div>Feeding pet...</div>
    case 'PET_PLAYING':
      return <div>Playing with pet...</div>
    case 'PET_CLEANING':
      return <div>Cleaning pet...</div>
    default:
      return <div>Pet is busy...</div>
  }
})
