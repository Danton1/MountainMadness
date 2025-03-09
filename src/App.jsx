import './App.css'
import StatusBar from './components/StatusBar'
import Pet from './components/Pet'
import { useState, useEffect } from "react";

function App() {
  const [hungerValue, setHungerValue] = useState(100);
  const [happinessValue, setHappinessValue] = useState(100);
  const [insanityValue, setInsanityValue] = useState(0);
  useEffect(() => {
    if (hungerValue > 0) {
      setTimeout(() => {
        setHungerValue(hungerValue - 1);
      }, 1000);
    }
    if (happinessValue > 0) {
      setTimeout(() => {
        setHappinessValue(happinessValue - 1);
      }, 1500);
    }
    if (insanityValue < 100) {
      setTimeout(() => {
        setInsanityValue(insanityValue + 1);
      }, 2500);
    }
  }, [hungerValue, happinessValue, insanityValue]);
  

  return (
    <>
    
    <div className={`hero bg-base-200 min-h-screen bg-purple-100`}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Pet hunger={hungerValue} happiness={happinessValue} insanity={insanityValue} className="max-w-sm rounded-lg shadow-2xl"/>
        <div className='text-rose-900'>
          <StatusBar title="Hunger" value={hungerValue}/>
          <StatusBar title="Happiness" value={happinessValue} rate={50}/>
          <StatusBar title="Insanity" value={insanityValue} rate={2000} direction="up"/>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
