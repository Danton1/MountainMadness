import { useLocalStorage } from './use-local-storage.js'
import { GameState } from './game-state/index.js'
import { Display } from './Display.js'
import { Controls } from './Controls.js'
import { useState, useCallback } from 'react';
import GameEnd from './components/gameEnd.jsx';

export default function Game() {
  const [gameOver, setGameOver] = useState(false);    //This value should be updated when the game ends

  const endOverlay = useCallback((adWatched: boolean) => {  
    setGameOver(false);
    adWatched ? alert("Pet Revived!") : alert("Pet died! New game.");   //TODO: Make this a real difference
  }, []);

  const startOverlay = useCallback(() => {
    setGameOver(true);
  }, []);
  
  const [val, setVal] = useLocalStorage<GameState>(
    'game-state',
    new GameState(),
  )

  if (!val) {
    throw new Error('Game state is somehow undefined')
  }

  return (
    <div>
      {!gameOver && <Display gameEnd={startOverlay} state={val} />}
      <Controls setState={setVal} />
      {gameOver && <GameEnd exitFn={endOverlay} />}
    </div>
  )
}
