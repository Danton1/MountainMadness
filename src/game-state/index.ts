import superjson from 'superjson'
import Pet from './Pet'
import StateMachine from 'javascript-state-machine'
import PetTalks from './petTalks'

// Library doc: https://github.com/jakesgordon/javascript-state-machine?tab=readme-ov-file
const fsm = new StateMachine({
  init: 'PET_IDLE',
  transitions: [
    { name: 'ACTION_PET_FEED', from: 'PET_IDLE', to: 'PET_FEEDING' },
    { name: 'ACTION_PET_PLAY', from: 'PET_IDLE', to: 'PET_PLAYING' },
    {name: 'HUNGER_DECREASE', from: '*', to: 'PET_TALKING'},
    {name: 'INSANITY_INCREASE', from: '*', to: 'PET_CHANGING'},

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
    }
  },
})

export class GameState {
  #pet: Pet

  // Create a `GameState` object with default values
  constructor() {
    this.#pet = new Pet()
  }

  toString() {
    return superjson.stringify(this)
  }

  fromString(value: string) {
    return superjson.parse<typeof this>(value)
  }
}
