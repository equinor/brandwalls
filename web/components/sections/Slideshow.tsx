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
    const allSlides = slideshows
      ?.flatMap((show) => show?.slides ?? [])
      .filter((slide) => slide?.content?.length > 0)
    //@ts-ignore: TODO
    const processedSlides = distributeRecurringForSlideshow(allSlides)
    return processedSlides
  }, [slideshows])

  const findNextIndex = useCallback(() => {
    for (let offset = 1; offset <= slides.length; offset += 1) {
      const nextIndex = (currentIndex + offset) % slides.length
      if (isSlideActive(slides[nextIndex])) {
        setCurrentIndex(nextIndex)
        return
      }
    }
  }, [currentIndex, slides])

  useEffect(() => {
    if (slides.length === 0) return

    const currentSlide = slides[currentIndex]
    if (!currentSlide || !isSlideActive(currentSlide)) {
      const firstActiveIndex = slides.findIndex(isSlideActive)
      if (firstActiveIndex >= 0 && firstActiveIndex !== currentIndex) {
        setCurrentIndex(firstActiveIndex)
      }
      return
    }

    let duration = 20000
    if (currentSlide.content?.[0]?.type === 'fullWidthVideo') {
      duration = videoDuration * 1000
    }

    if (currentSlide.overrideDuration && currentSlide.duration) {
      const overrideDuration = Number.parseInt(String(currentSlide.duration), 10)
      if (Number.isFinite(overrideDuration)) {
        duration = overrideDuration * 1000
      }
    }

    timeout.current = setTimeout(findNextIndex, duration)
    return () => clearTimeout(timeout.current)
  }, [currentIndex, findNextIndex, slides, videoDuration])

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
