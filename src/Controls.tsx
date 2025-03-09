import type { Game, GAME_STATE } from './game-state'
import ColorButton from './components/colorbutton'
import { observer } from 'mobx-react'

interface ActionMenuProps {
  gameState: Game
}

function ActionMenu({ gameState }: ActionMenuProps) {
  return (
    <ul>
      <ColorButton onClick={() => gameState.feedPet()}>Feed</ColorButton>
      <ColorButton onClick={() => gameState.playWithPet()}>Play</ColorButton>
      <ColorButton onClick={() => gameState.cleanPet()}>Clean</ColorButton>
    </ul>
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
