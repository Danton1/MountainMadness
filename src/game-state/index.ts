import superjson from 'superjson'
import Pet from './Pet'
import StateMachine from 'javascript-state-machine'

// Library doc: https://github.com/jakesgordon/javascript-state-machine?tab=readme-ov-file
const fsm = new StateMachine({
  init: 'PET_IDLE',
  transitions: [
    { name: 'ACTION_PET_FEED', from: 'PET_IDLE', to: 'PET_FEEDING' },
    { name: 'ACTION_PET_PLAY', from: 'PET_IDLE', to: 'PET_PLAYING' },
  ],
  methods: {
    onFeed: () => {
      /* TODO: do something when feed is requested */
    },
    onPlay: () => {
      /* TODO: do something when play is requested */
    },
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
