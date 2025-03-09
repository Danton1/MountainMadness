import { useLocalStorage } from './use-local-storage.js'
import { type Game, GameState } from './game-state/index.js'
import { Display } from './Display.js'
import { Controls } from './Controls.js'
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import GameEnd from './components/gameEnd.jsx'

const GameComponent = observer(() => {
  const [gameState, setGameState] = useLocalStorage<Game>(
    'game-state',
    new GameState(),
  )

  if (!gameState) {
    throw new Error('Game state is somehow undefined')
  }

  const handleEndOverlay = useCallback(
    (adWatched: boolean) => {
      gameState.resurrectPet(adWatched)
    },
    [gameState],
  )

  return (
    <div>
      {!gameState.isGameOver && <Display game={gameState} />}
      {!gameState.isGameOver && <Controls gameState={gameState} />}
      {gameState.isGameOver && <GameEnd exitFn={handleEndOverlay} />}
    </div>
  )
})

export default GameComponent
