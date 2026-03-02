import { type PropsWithChildren, useEffect, useState } from 'react'
import type { GifItem } from '../types'
import {
  readSavedGifs,
  removeSavedGif as removeSavedGifFromStorage,
  upsertSavedGif,
  writeSavedGifs,
} from '../utils/storage'
import { savedGifsStore } from './savedGifsStore'

function getInitialState() {
  const { data, hadError } = readSavedGifs()

  return {
    savedGifs: data,
    hydrationError: hadError,
  }
}

export function SavedGifsProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(getInitialState)

  useEffect(() => {
    writeSavedGifs(state.savedGifs)
  }, [state.savedGifs])

  const isSaved = (gifId: string) => state.savedGifs.some((item) => item.id === gifId)

  const saveGif = (gif: GifItem) => {
    let result = { saved: false, removedOldest: false }

    setState((currentState) => {
      const nextResult = upsertSavedGif(currentState.savedGifs, gif)
      result = { saved: nextResult.saved, removedOldest: nextResult.removedOldest }

      return {
        ...currentState,
        savedGifs: nextResult.items,
      }
    })

    return result
  }

  const removeGif = (gifId: string) => {
    let removed = false

    setState((currentState) => {
      const nextResult = removeSavedGifFromStorage(currentState.savedGifs, gifId)
      removed = nextResult.removed

      return {
        ...currentState,
        savedGifs: nextResult.items,
      }
    })

    return removed
  }

  return (
    <savedGifsStore.Provider
      value={{
        hydrationError: state.hydrationError,
        savedGifs: state.savedGifs,
        isSaved,
        saveGif,
        removeGif,
      }}
    >
      {children}
    </savedGifsStore.Provider>
  )
}
