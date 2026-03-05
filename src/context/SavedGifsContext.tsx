import { type PropsWithChildren, useEffect, useRef, useState } from 'react'
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
  const savedGifsRef = useRef(state.savedGifs)

  useEffect(() => {
    savedGifsRef.current = state.savedGifs
  }, [state.savedGifs])

  useEffect(() => {
    writeSavedGifs(state.savedGifs)
  }, [state.savedGifs])

  const isSaved = (gifId: string) => state.savedGifs.some((item) => item.id === gifId)

  const saveGif = (gif: GifItem) => {
    const nextResult = upsertSavedGif(savedGifsRef.current, gif)

    if (!nextResult.saved) {
      return { saved: false, removedOldest: false }
    }

    savedGifsRef.current = nextResult.items
    setState((currentState) => ({
      ...currentState,
      savedGifs: nextResult.items,
    }))

    return { saved: true, removedOldest: nextResult.removedOldest }
  }

  const removeGif = (gifId: string) => {
    const nextResult = removeSavedGifFromStorage(savedGifsRef.current, gifId)

    if (!nextResult.removed) {
      return false
    }

    savedGifsRef.current = nextResult.items
    setState((currentState) => ({
      ...currentState,
      savedGifs: nextResult.items,
    }))

    return true
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
