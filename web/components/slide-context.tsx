'use client'
import { AllSanitySchemaTypes, internalGroqTypeReferenceTo, Slide } from '@/sanity.types'
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'

type SlideContextValue = {
  videoDuration: number
  changeVideoDuration: (duration: number) => void
}
type SlideProviderProps = {
  children: ReactNode
}

const SlideContext = createContext<SlideContextValue | undefined>(undefined)

export function resolveReference<T>(obj: { _type: 'reference'; [internalGroqTypeReferenceTo]?: T }) {
  if (obj._type === 'reference') throw new Error('Asset reference has not been expanded!')
  return obj as unknown as Extract<AllSanitySchemaTypes, { _type: T }>
}

export const SlideProvider: React.FC<SlideProviderProps> = ({ children }) => {
  const [videoDuration, setVideoDuration] = useState<number>(6000) //millisecond

  //seconds
  const changeVideoDuration = useCallback((duration: number) => {
    console.log('SlideProvider: change video duration to', videoDuration)
    setVideoDuration(duration)
  }, [])

  const contextValue = useMemo(
    () => ({
      videoDuration,
      changeVideoDuration,
    }),
    [videoDuration, changeVideoDuration],
  )

  return <SlideContext.Provider value={contextValue}>{children}</SlideContext.Provider>
}

export const useSlideContext = () => {
  const slideContext = useContext(SlideContext)
  if (slideContext === undefined) {
    throw new Error('useSlideContext must be inside a SlideProvider')
  }
  return slideContext
}
