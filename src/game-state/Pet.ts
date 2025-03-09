import superjson, { SuperJSON } from 'superjson'
import { makeObservable, observable, action } from 'mobx'

export default class Pet {
  @observable #hunger: number
  @observable #happiness: number
  @observable #health: number
  @observable #sanity: number

  // Create a `GameState` object with default values
  constructor() {
    this.#hunger = 100
    this.#happiness = 100
    this.#health = 100
    this.#sanity = 100
    makeObservable(this)
  }

  isApplicable() {}

  get hunger() {
    return this.#hunger
  }

  get happiness() {
    return this.#happiness
  }

  get health() {
    return this.#health
  }

  get sanity() {
    return this.#sanity
  }

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
