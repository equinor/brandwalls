'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SectionMapper from './SectionMapper'
import { useSlideContext } from '../slide-context'
import { distributeRecurringForSlideshow, isSlideActive } from '@/common/helpers/slideScheduling'
import { LogoSecondary } from '../core/Logo/Logo'

type Slide = {
  content: any
  duration?: string
  scheduling?: any
  overrideDuration?: boolean
}

type SlideshowProps = {
  slideshows: {
    slides: Slide[]
  }[]
}

export default function Slideshow({ slideshows }: SlideshowProps) {
  const { videoDuration } = useSlideContext()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const timeout = useRef<NodeJS.Timeout>(undefined)

  const slides = useMemo(() => {
    const allSlides = slideshows?.flatMap((show) => show?.slides)
    //@ts-ignore: TODO
    const processedSlides = distributeRecurringForSlideshow(allSlides)
    return processedSlides
  }, [slideshows])

  const findNextIndex = useCallback(() => {
    const isLast = currentIndex === slides?.length - 1
    let nextIndex = isLast ? 0 : currentIndex + 1
    let indexIsActive = false
    do {
      indexIsActive = isSlideActive(slides[nextIndex])
      if (nextIndex === slides?.length - 1) {
        if (!indexIsActive) {
          nextIndex = 0
        }
      } else {
        if (!indexIsActive) {
          nextIndex = nextIndex + 1
        }
      }
    } while (!indexIsActive)
    setCurrentIndex(nextIndex)
  }, [currentIndex])

  const play = useCallback(() => {
    if (slides?.length > 0) {
      let duration = 20000
      if (currentIndex) {
        const currentSlide = slides[currentIndex]
        if (currentSlide?.content?.[0]?.type === 'fullWidthVideo') {
          duration = videoDuration * 1000
        }
        if (
          //@ts-ignore:todo
          currentSlide?.overrideDuration &&
          currentSlide?.duration &&
          typeof currentSlide?.duration !== undefined &&
          //@ts-ignore:todo
          currentSlide?.duration !== ''
        ) {
          //@ts-ignore:todo
          duration = parseInt(currentSlide?.duration, 10) * 1000
        }
      }
      timeout.current = setTimeout(findNextIndex, duration)
    }
  }, [currentIndex, videoDuration])

  useEffect(() => {
    findNextIndex()
  }, [])

  useEffect(() => {
    clearTimeout(timeout.current)
    play()
  }, [currentIndex])

  useEffect(() => {
    clearTimeout(timeout.current)
    play()
  }, [videoDuration])

  useEffect(() => {
    const currentSlide = slides[currentIndex]
    if (!currentSlide || !currentSlide?.content || currentSlide?.content?.length === 0) {
      console.log('no slide or content,skip to next')
      findNextIndex()
    }
  }, [currentIndex, slides])

  return (
    <div className="starting-hidden h-full w-full overflow-hidden">
      {slides.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <LogoSecondary className="h-2/6 w-2/6" />
        </div>
      )}
      {slides.length > 0 && <SectionMapper section={slides[currentIndex]} />}
    </div>
  )
}
