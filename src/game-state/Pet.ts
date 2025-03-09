import superjson, { SuperJSON } from 'superjson'
import { makeObservable, observable, action } from 'mobx'

export default class Pet {
  @observable accessor #hunger: number
  @observable accessor #happiness: number
  @observable accessor #health: number
  @observable accessor #sanity: number

  // Create a `GameState` object with default values
  constructor() {
    this.#hunger = 100
    this.#happiness = 100
    this.#health = 100
    this.#sanity = 100
    makeObservable(this)
  }

  isApplicable() {}

  @action
  set hunger(value: number) {
    this.#hunger = Math.max(0, Math.min(100, value))
  }

  @action
  set happiness(value: number) {
    this.#happiness = Math.max(0, Math.min(100, value))
  }

  @action
  set health(value: number) {
    this.#health = Math.max(0, Math.min(100, value))
  }

  @action
  set sanity(value: number) {
    this.#sanity = Math.max(0, Math.min(100, value))
  }
}

SuperJSON.registerClass(Pet, 'Pet')
