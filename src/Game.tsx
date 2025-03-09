import { useLocalStorage } from './use-local-storage.js'
import { GameState } from './game-state/index.js'
import { Display } from './Display.js'
import { Controls } from './Controls.js'

export default function Game() {
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
    </div>
  )
}
