import { action, observable, makeObservable, computed } from 'mobx'
import superjson, { SuperJSON } from 'superjson'

import Pet from './Pet'
import type { InventoryItem } from './InventoryItem'

// Library doc: https://github.com/jakesgordon/javascript-state-machine?tab=readme-ov-file
const fsm = new StateMachine({
  init: 'PET_IDLE',
  transitions: [
    { name: 'ACTION_PET_FEED', from: 'PET_IDLE', to: 'PET_FEEDING' },
    { name: 'ACTION_PET_PLAY', from: 'PET_IDLE', to: 'PET_PLAYING' },
    { name: 'HUNGER_DECREASE', from: '*', to: 'PET_TALKING' },
    { name: 'INSANITY_INCREASE', from: '*', to: 'PET_CHANGING' },
  ],
  methods: {
    onFeed: () => {
      /* TODO: do something when feed is requested */
    },
    onPlay: () => {
      /* TODO: do something when play is requested */
    },
    onPetTalking: (hunger: number, happiness: number, sanity: number) => {
      PetTalks({ hunger, happiness, sanity })
    },
    onPetChanging: (sanity: number) => {
      PetTalks({ hunger: 0, happiness: 0, sanity })
    },
  },
})

enum GAME_STATE {
  PET_IDLE = 'PET_IDLE',
  PET_FEEDING = 'PET_FEEDING',
  PET_PLAYING = 'PET_PLAYING',
  PET_CLEANING = 'PET_CLEANING',
  PET_TALKING = 'PET_TALKING',
  PET_RESULT = 'PET_RESULT',
}

type IntervalToken = ReturnType<typeof setInterval> | null

export class GameState {
  accessor #pet: Pet = new Pet()
  @observable accessor #inventory: Map<string, InventoryItem> = new Map()
  @observable accessor #state: GAME_STATE = GAME_STATE.PET_IDLE
  @observable accessor isAnimating: boolean = false
  @observable accessor isGameOver: boolean = false

  // Interval timers
  #hungerInterval: IntervalToken = null
  #happinessInterval: IntervalToken = null
  #healthInterval: IntervalToken = null
  #sanityInterval: IntervalToken = null

  constructor() {
    makeObservable(this)
    // Start timers when game state is created
    this.startTimers()
  }

  get pet() {
    return this.#pet
  }

  get state() {
    return this.#state
  }

  @computed get shouldShowGameOver() {
    return this.isGameOver
  }

  @action
  checkGameOver() {
    if (
      this.#pet.health <= 0 ||
      this.#pet.hunger <= 0 ||
      this.#pet.happiness <= 0 ||
      this.#pet.sanity >= 100
    ) {
      this.isGameOver = true
      this.stopTimers() // Stop timers when game is over
      return true
    }
    return false
  }

  @action
  resurrectPet(fullResurrection: boolean) {
    if (fullResurrection) {
      // Full resurrection from ad
      this.#pet.health = 100
      this.#pet.hunger = 100
      this.#pet.happiness = 100
      this.#pet.sanity = 0
    } else {
      // Just a new game
      this.#pet = new Pet()
    }
    this.isGameOver = false
    this.#state = GAME_STATE.PET_IDLE

    // Restart timers after resurrection
    this.startTimers()
  }

  @action
  startTimers() {
    // Clear any existing timers first
    this.stopTimers()

    // Only start timers when the game is not over
    if (!this.isGameOver) {
      // Hunger decreases every 1 second
      this.#hungerInterval = setInterval(() => {
        if (
          this.state === GAME_STATE.PET_IDLE &&
          !this.isAnimating &&
          this.#pet.hunger > 0
        ) {
          this.#pet.hunger -= 1
          this.checkGameOver()
        }
      }, 1000)

      // Happiness decreases every 1.5 seconds
      this.#happinessInterval = setInterval(() => {
        if (
          this.state === GAME_STATE.PET_IDLE &&
          !this.isAnimating &&
          this.#pet.happiness > 0
        ) {
          this.#pet.happiness -= 1
          this.checkGameOver()
        }
      }, 1500)

      // Health decreases when hunger or happiness are low
      this.#healthInterval = setInterval(() => {
        if (
          this.state === GAME_STATE.PET_IDLE &&
          !this.isAnimating &&
          this.#pet.health > 0
        ) {
          if (this.#pet.hunger <= 20 || this.#pet.happiness <= 20) {
            this.#pet.health -= 1
            this.checkGameOver()
          }
        }
      }, 2000)

      // Sanity increases every 2.5 seconds
      this.#sanityInterval = setInterval(() => {
        if (
          this.state === GAME_STATE.PET_IDLE &&
          !this.isAnimating &&
          this.#pet.sanity < 100
        ) {
          this.#pet.sanity += 1
          this.checkGameOver()
        }
      }, 2500)
    }
  }

  @action
  stopTimers() {
    // Clear all interval timers
    if (this.#hungerInterval) {
      clearInterval(this.#hungerInterval)
      this.#hungerInterval = null
    }
    if (this.#happinessInterval) {
      clearInterval(this.#happinessInterval)
      this.#happinessInterval = null
    }
    if (this.#healthInterval) {
      clearInterval(this.#healthInterval)
      this.#healthInterval = null
    }
    if (this.#sanityInterval) {
      clearInterval(this.#sanityInterval)
      this.#sanityInterval = null
    }
  }

  @action
  async feedPet() {
    if (this.isGameOver || this.checkGameOver()) return

    this.#state = GAME_STATE.PET_FEEDING
    this.isAnimating = true
    this.stopTimers() // Pause timers during animation

    // Simulate animation with timeout
    await this.runAnimation()
    this.#pet.hunger += 20
    this.completeAction()
  }

  @action
  async playWithPet() {
    if (this.isGameOver || this.checkGameOver()) return

    this.#state = GAME_STATE.PET_PLAYING
    this.isAnimating = true
    this.stopTimers() // Pause timers during animation

    await this.runAnimation()
    this.#pet.happiness += 20
    this.completeAction()
  }

  @action
  async cleanPet() {
    if (this.isGameOver || this.checkGameOver()) return

    this.#state = GAME_STATE.PET_CLEANING
    this.isAnimating = true
    this.stopTimers() // Pause timers during animation

    await this.runAnimation()
    this.#pet.sanity -= 20
    this.completeAction()
  }

  @action
  private completeAction() {
    this.#state = GAME_STATE.PET_IDLE
    this.isAnimating = false
    this.checkGameOver()

    // Restart timers after action completes
    if (!this.isGameOver) {
      this.startTimers()
    }
  }

  // Simulate an animation with a promise
  private runAnimation(): Promise<void> {
    // Simulate animation time (e.g., 2 seconds)
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  @action
  transitionState(newState: GAME_STATE) {
    this.#state = newState
  }
}

SuperJSON.registerClass(GameState, 'GameState')
export type Game = GameState
export { GAME_STATE }
