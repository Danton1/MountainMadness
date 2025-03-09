import superjson, { SuperJSON } from 'superjson'
import StateMachine from 'javascript-state-machine'
import StateMachineHistory from 'javascript-state-machine/lib/history'

import Pet from './Pet'
import type { InventoryItem } from './InventoryItem'

// Library doc: https://github.com/jakesgordon/javascript-state-machine?tab=readme-ov-file
const gameFsm = new StateMachine({
  init: 'PET_IDLE',
  transitions: [
    { name: 'ACTION_PET_FEED', from: 'PET_IDLE', to: 'PET_FEEDING' },
    { name: 'ACTION_PET_PLAY', from: 'PET_IDLE', to: 'PET_PLAYING' },
    { name: 'ACTION_PET_CLEAN', from: 'PET_IDLE', to: 'PET_CLEANING' },
    { name: 'DISPLAY_RESULT', from: '*', to: 'PET_RESULT' },
    { name: 'CLOSE_RESULT', from: 'PET_RESULT', to: 'PET_IDLE' },
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

// UI state
const uiFsm = new StateMachine({
  init: 'MENU_ROOT',
  transitions: [
    { name: 'DO_CHOOSE_ITEM', from: 'MENU_ROOT', to: 'MENU_ITEM_SELECTOR' },
    { name: 'DO_USE_ITEM', from: 'MENU_ITEM_SELECTOR', to: 'MENU_USING_ITEM' },
    { name: 'DO_CANCEL', from: 'MENU_ITEM_SELECTOR', to: 'MENU_ROOT' },
    { name: 'DO_ITEM_USED', from: 'MENU_USING_ITEM', to: 'MENU_ROOT' },
  ],
  plugins: [new StateMachineHistory()],
})

export class GameState {
  #pet: Pet = new Pet()
  #inventory: Map<string, InventoryItem> = new Map()
}

SuperJSON.registerClass(GameState, 'GameState')
