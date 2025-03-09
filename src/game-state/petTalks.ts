import { useState } from 'react'
import ColorButton from '../components/ColorButton'
import MovingButton from '../components/movingbutton'
import {
  SaneCat,
  CrazyCat25,
  CrazyCat50,
  CrazyCat100,
  CannibalCat,
  CatLaughs,
  Door,
} from '../data/strings.json'

interface PetTalksProps {
  hunger: number
  happiness: number
  sanity: number
  updateHunger: (amount: number) => void
  updateInsanity: (amount: number) => void
  updateHappiness: (amount: number) => void
}

export default function PetTalks({
  hunger,
  happiness,
  sanity,
  updateHunger,
  updateInsanity,
  updateHappiness,
}: PetTalksProps): string {
  const cannibal = () => {
    let random = Math.floor(Math.random() * 7) + 1
    updateHunger(25)
    updateInsanity(10)
    updateHappiness(10)
    return CannibalCat[random.toString() as keyof typeof CannibalCat]
  }

  const knock = (): string => {
    let random = Math.floor(Math.random() * 7) + 1
    const audio = new Audio('/audio/knocking_door.mp3')
    audio.play()
    return Door[random.toString() as keyof typeof Door]
  }

  const laugh = (): string => {
    let random = Math.floor(Math.random() * 7) + 1
    const audio = new Audio('/audio/laugh.mp3')
    audio.play()
    return CatLaughs[random.toString() as keyof typeof CatLaughs]
  }

  const saneCat = (): string => {
    let random = Math.floor(Math.random() * 7) + 1
    return SaneCat[random.toString() as keyof typeof SaneCat]
  }

  const insaneCat = (sanity: number): string => {
    let random = Math.floor(Math.random() * 7) + 1
    if (sanity === 25) {
      return CrazyCat25[random.toString() as keyof typeof CrazyCat25]
    } else if (sanity === 50) {
      return CrazyCat50[random.toString() as keyof typeof CrazyCat50]
    } else {
      return CrazyCat100[random.toString() as keyof typeof CrazyCat100]
    }
  }

  const handleCatState = (sanity: number): string => {
    let random = Math.floor(Math.random() * 10)
    if (hunger >= 50 && sanity >= 50 && happiness >= 50) {
      return cannibal()
    } else if (random >= 7 && sanity >= 50) {
      random = Math.floor(Math.random() * 10)
      if (random >= 5) {
        return knock()
      } else {
        return laugh()
      }
    } else if (sanity < 25) {
      return saneCat()
    } else if (sanity < 50) {
      return insaneCat(25)
    } else if (sanity < 75) {
      return insaneCat(50)
    } else {
      return insaneCat(100)
    }
  }

  return handleCatState(sanity)
}
