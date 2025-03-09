export class InventoryItem {
  #name: string
  #description: string
  #amount: number

  constructor(name: string, description: string, amount: number) {
    this.#name = name
    this.#description = description
    this.#amount = amount
  }

  get name() {
    return this.#name
  }

  get description() {
    return this.#description
  }

  get amount() {
    return this.#amount
  }

  set amount(amount: number) {
    this.#amount = amount
  }
}
