import { useLocalStorage } from './use-local-storage.js'
import { GameState } from './game-state/index.js'
import { Display } from './Display.js'
import { Controls } from './Controls.js'
import { useState } from 'react';
import GameEnd from './components/gameEnd.jsx';

export default function Game() {
  const [gameOver, setGameOver] = useState(true);    //This value should be updated when the game ends

  function endOverlay(){
    setGameOver(false);
  }
  
  const [val, setVal] = useLocalStorage<GameState>(
    'game-state',
    new GameState(),
  )

  if (!val) {
    throw new Error('Game state is somehow undefined')
  }

  return (
    <div>
      <Display state={val} />
      <Controls setState={setVal} />
      {gameOver && <GameEnd exitFn={endOverlay} />}
    </div>
  )
}
