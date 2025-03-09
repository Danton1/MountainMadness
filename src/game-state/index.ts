import { action, observable, computed, autorun } from 'mobx'
import superjson, { SuperJSON } from 'superjson'

import Pet from './Pet'
import PetTalks from './petTalks'
import type { InventoryItem } from './InventoryItem'
import { TimerManager, type StatName } from './timers'

// Library doc: https://github.com/jakesgordon/javascript-state-machine?tab=readme-ov-file
// const fsm = new StateMachine({
//   init: 'PET_IDLE',
//   transitions: [
//     { name: 'ACTION_PET_FEED', from: 'PET_IDLE', to: 'PET_FEEDING' },
//     { name: 'ACTION_PET_PLAY', from: 'PET_IDLE', to: 'PET_PLAYING' },
//     { name: 'HUNGER_DECREASE', from: '*', to: 'PET_TALKING' },
//     { name: 'INSANITY_INCREASE', from: '*', to: 'PET_CHANGING' },
//   ],
//   methods: {
//     onFeed: () => {
//       /* TODO: do something when feed is requested */
//     },
//     onPlay: () => {
//       /* TODO: do something when play is requested */
//     },
//     onPetTalking: (hunger: number, happiness: number, sanity: number) => {
//       PetTalks({ hunger, happiness, sanity })
//     },
//     onPetChanging: (sanity: number) => {
//       PetTalks({ hunger: 0, happiness: 0, sanity })
//     },
//   },
// })

enum GAME_STATE {
  PET_IDLE = 'PET_IDLE',
  PET_FEEDING = 'PET_FEEDING',
  PET_PLAYING = 'PET_PLAYING',
  PET_CLEANING = 'PET_CLEANING',
  PET_TALKING = 'PET_TALKING',
  PET_CHANGING = 'PET_CHANGING',
  PET_RESULT = 'PET_RESULT',
}

export class GameState {
  @observable accessor pet: Pet = new Pet()
  @observable accessor #inventory: Map<string, InventoryItem> = new Map()
  @observable accessor #state: GAME_STATE = GAME_STATE.PET_IDLE
  @observable accessor isAnimating: boolean = false
  @observable accessor isGameOver: boolean = false
  @observable accessor currentDialogue: string = ''
  @observable accessor talkingActive: boolean = false

  // Timer manager
  #timerManager: TimerManager
  #gameOverDisposer: () => void

  constructor() {
    // Initialize timer manager
    this.#timerManager = new TimerManager({
      onStatModify: this.modifyStat.bind(this),
      onTriggerTalking: this.triggerPetTalking.bind(this),
      getState: () => this.state,
      isAnimating: () => this.isAnimating,
      pet: () => this.pet,
    })

    // Set up autorun to check game over conditions
    this.#gameOverDisposer = autorun(() => {
      const { hunger, happiness, health, sanity } = this.pet

      if (health <= 0 || hunger <= 0 || happiness <= 0 || sanity >= 100) {
        if (!this.isGameOver) {
          this.isGameOver = true
          this.stopTimers()
        }
      }
    })

    // Start timers when game state is created
    this.startTimers()
  }

  get state() {
    return this.#state
  }

  @computed get shouldShowGameOver() {
    return this.isGameOver
  }

  @action
  updateHunger(amount: number) {
    this.pet.hunger += amount
  }

  @action
  updateInsanity(amount: number) {
    this.pet.sanity += amount
    this.startTimers()
  }

  @action
  updateHappiness(amount: number) {
    this.pet.happiness += amount
  }

  @action
  resurrectPet(fullResurrection: boolean) {
    if (fullResurrection) {
      // Full resurrection from ad
      this.pet.health = 100
      this.pet.hunger = 100
      this.pet.happiness = 100
      this.pet.sanity = 0
    } else {
      // Just a new game
      this.pet = new Pet()
    }

    this.isGameOver = false
    this.#state = GAME_STATE.PET_IDLE
    this.startTimers()
  }

  // Generic stat modifier to replace multiple increase/decrease methods
  @action
  modifyStat(stat: StatName, amount: number) {
    if (stat === 'sanity' && amount < 0) {
      // Decreasing sanity
      const oldValue = this.pet[stat]
      this.pet[stat] += amount
      return oldValue
    } else {
      this.pet[stat] += amount
      return this.pet[stat]
    }
  }

  @action
  startTimers() {
    if (this.isGameOver) return
    this.#timerManager.startTimers()
  }

  @action
  stopTimers() {
    this.#timerManager.stopTimers()
  }

  @action
  async showDialogue(state: GAME_STATE, isChanging = false, duration = 4000) {
    const previousState = this.#state

    // Update state
    this.#state = state
    this.talkingActive = true

    // Get dialogue
    this.currentDialogue = PetTalks({
      hunger: isChanging ? 0 : this.pet.hunger,
      happiness: isChanging ? 0 : this.pet.happiness,
      sanity: this.pet.sanity,
      updateHunger: this.updateHunger.bind(this),
      updateInsanity: this.updateInsanity.bind(this),
      updateHappiness: this.updateHappiness.bind(this),
    })

    // Wait for dialogue duration
    await new Promise((resolve) => setTimeout(resolve, duration))

    // Return to previous or idle state
    this.#state =
      state === GAME_STATE.PET_CHANGING ? GAME_STATE.PET_IDLE : previousState
    this.talkingActive = false
    this.currentDialogue = ''
  }

  @action
  async triggerPetTalking() {
    await this.showDialogue(GAME_STATE.PET_TALKING)
  }

  @action
  async triggerPetChanging() {
    await this.showDialogue(GAME_STATE.PET_CHANGING, true)
  }

  @action
  async performAction(
    actionState: GAME_STATE,
    statChanges: [StatName, number][],
    talkChance = 0.2,
  ) {
    if (this.isGameOver) return

    this.#state = actionState
    this.isAnimating = true
    this.stopTimers()

    await this.runAnimation()

    let oldSanity: number | null = null

    // Apply all stat changes
    statChanges.forEach(([stat, amount]) => {
      if (stat === 'sanity' && amount < 0) {
        oldSanity = this.modifyStat(stat, amount)
      } else {
        this.modifyStat(stat, amount)
      }
    })

    // Check for special sanity thresholds
    if (oldSanity !== null) {
      const newSanity = this.pet.sanity
      if (
        (oldSanity >= 25 && newSanity < 25) ||
        (oldSanity >= 50 && newSanity < 50) ||
        (oldSanity >= 75 && newSanity < 75)
      ) {
        await this.triggerPetChanging()
      } else if (Math.random() < talkChance) {
        await this.triggerPetTalking()
      }
    } else if (Math.random() < talkChance) {
      await this.triggerPetTalking()
    }

    this.completeAction()
  }

  @action
  async feedPet() {
    await this.performAction(GAME_STATE.PET_FEEDING, [['hunger', 20]], 0.2)
  }

  @action
  async playWithPet() {
    await this.performAction(GAME_STATE.PET_PLAYING, [['happiness', 20]], 0.3)
  }

  @action
  async cleanPet() {
    await this.performAction(GAME_STATE.PET_CLEANING, [['sanity', -20]], 0.2)
  }

  @action
  private completeAction() {
    this.#state = GAME_STATE.PET_IDLE
    this.isAnimating = false

    if (!this.isGameOver) {
      this.startTimers()
    }
  }

  private runAnimation(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 2000))
  }

  dispose() {
    this.#timerManager.dispose()
    this.#gameOverDisposer()
  }
}

SuperJSON.registerClass(GameState, 'GameState')
export type Game = GameState
export { GAME_STATE }
