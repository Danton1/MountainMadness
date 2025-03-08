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
      <StatusBar title="Hunger" value={hungerValue}/>
      <StatusBar title="Happiness" value={happinessValue} rate={50}/>
      <StatusBar title="Insanity" value={insanityValue} rate={2000} direction="up"/>
      <Pet hunger={hungerValue} happiness={happinessValue} insanity={insanityValue}/>
    </>
  )
}

export default App
