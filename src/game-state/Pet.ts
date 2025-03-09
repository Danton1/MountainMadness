import superjson from 'superjson'

export default class Pet {
  #hunger: number
  #happiness: number
  #health: number
  #sanity: number

  // Create a `GameState` object with default values
  constructor() {
    this.#hunger = 100
    this.#happiness = 100
    this.#health = 100
    this.#sanity = 100
  }

  toString() {
    return superjson.stringify(this)
  }

  fromString(value: string) {
    return superjson.parse<typeof this>(value)
  }

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

  set hunger(value: number) {
    this.#hunger = value
  }

  set happiness(value: number) {
    this.#happiness = value
  }

  set health(value: number) {
    this.#health = value
  }

  set sanity(value: number) {
    this.#sanity = value
  }
}
