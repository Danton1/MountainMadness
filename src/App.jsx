import './App.css'
import Game from './Game'

function App() {
  return (
    <>
      <div className="m-auto flex flex-col">
        <h1>Tamagotchi :)</h1>
        <main className="flex-grow">
          <Game />
        </main>
      </div>
    </>
  )
}

export default App
