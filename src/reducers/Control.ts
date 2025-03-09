import type { Reducer } from 'react'

export enum ControlState {
  Root,
  Feed,
  Play,
  Clean,
}

export enum ControlEvent {
  DoFeed,
  DoPlay,
  DoClean,
  FinishAction,
}

export const reducer: Reducer<ControlState, ControlEvent> = (state, event) => {
  switch (state) {
    case ControlState.Root:
      switch (event) {
        case ControlEvent.DoFeed:
          return ControlState.Feed
        case ControlEvent.DoPlay:
          return ControlState.Play
        case ControlEvent.DoClean:
          return ControlState.Clean
        default:
          return state
      }
    case ControlState.Feed:
    case ControlState.Play:
    case ControlState.Clean:
      return ControlState.Root
  }
}
