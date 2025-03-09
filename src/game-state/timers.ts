import { GAME_STATE } from './index'
import type Pet from './Pet'

export type IntervalToken = ReturnType<typeof setInterval> | null
export type StatName = 'hunger' | 'happiness' | 'health' | 'sanity'

export interface TimerConfig {
  interval: number
  callback: () => void
  condition: () => boolean
}

export interface TimerManagerOptions {
  onStatModify: (stat: StatName, amount: number) => number
  onTriggerTalking: () => Promise<void>
  getState: () => GAME_STATE
  isAnimating: () => boolean
  pet: () => Pet
}

export class TimerManager {
  private timers: Record<string, IntervalToken> = {}
  private options: TimerManagerOptions

  constructor(options: TimerManagerOptions) {
    this.options = options
  }

  /**
   * Start all the timers that control pet stats and behavior
   */
  startTimers(): void {
    this.stopTimers()

    const { onStatModify, onTriggerTalking, getState, isAnimating, pet } =
      this.options

    const timerConfigs: Record<string, TimerConfig> = {
      hunger: {
        interval: 1000,
        callback: () => onStatModify('hunger', -1),
        condition: () => pet().hunger > 0,
      },
      happiness: {
        interval: 1500,
        callback: () => onStatModify('happiness', -1),
        condition: () => pet().happiness > 0,
      },
      health: {
        interval: 2000,
        callback: () => {
          if (pet().hunger <= 20 || pet().happiness <= 20) {
            onStatModify('health', -1)
          }
        },
        condition: () => pet().health > 0,
      },
      sanity: {
        interval: 2500,
        callback: () => onStatModify('sanity', 1),
        condition: () => pet().sanity < 100,
      },
      talking: {
        interval: 15000,
        callback: () => {
          if (Math.random() < 0.3) onTriggerTalking()
        },
        condition: () => true,
      },
    }

    // Set up all timers based on config
    Object.entries(timerConfigs).forEach(([name, config]) => {
      this.timers[name] = setInterval(() => {
        if (
          getState() === GAME_STATE.PET_IDLE &&
          !isAnimating() &&
          config.condition()
        ) {
          config.callback()
        }
      }, config.interval)
    })
  }

  /**
   * Stop all active timers
   */
  stopTimers(): void {
    Object.values(this.timers).forEach((timer) => {
      if (timer) clearInterval(timer)
    })
    this.timers = {}
  }

  /**
   * Clean up resources when the timer manager is no longer needed
   */
  dispose(): void {
    this.stopTimers()
  }
}
