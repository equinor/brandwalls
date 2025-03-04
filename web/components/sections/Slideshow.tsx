'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SectionMapper from './SectionMapper'
import { useSlideContext } from '../slide-context'
import { distributeRecurringForSlideshow, isSlideActive } from '@/common/helpers/slideScheduling'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeout = useRef<NodeJS.Timeout>(undefined)
  console.log('SlideShow: currentIndex', currentIndex)

  const slides = useMemo(() => {
    const allSlides = slideshows?.flatMap((show) => show?.slides)
    //@ts-ignore: TODO
    const processedSlides = distributeRecurringForSlideshow(allSlides)
    return processedSlides
  }, [slideshows])

  const findNextIndex = useCallback(() => {
    const isLast = currentIndex === slides.length
    const nextIndex = isLast ? 0 : currentIndex + 1
    let nextActiveIndex = nextIndex
    let indexIsActive = false
    do {
      if (nextActiveIndex === slides?.length) {
        nextActiveIndex = 0
        indexIsActive = isSlideActive(0)
      } else {
        nextActiveIndex = nextActiveIndex + 1
        indexIsActive = isSlideActive(nextActiveIndex + 1)
      }
    } while (!indexIsActive)
    console.log('Found next active index, set to current', nextActiveIndex)
    setCurrentIndex(nextActiveIndex)
  }, [currentIndex])

  const play = useCallback(() => {
    if (slides?.length > 0) {
      let duration = 30000
      const currentSlide = slides[currentIndex]
      if (currentSlide?.content?.[0]?.type === 'fullWidthVideo') {
        console.log('videoDuration', videoDuration)
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
      console.log('play method: set timout with duration', duration)
      timeout.current = setTimeout(findNextIndex, duration)
    }
  }, [currentIndex, videoDuration])

  useEffect(() => {
    clearTimeout(timeout.current)
    play()
  }, [currentIndex])

  useEffect(() => {
    clearTimeout(timeout.current)
    play()
  }, [videoDuration])

  if (slides.length === 0) {
    return <div>No active slides</div>
  }

  const slide = slides[currentIndex]
  if (!slide || !slide?.content || slide?.content?.length === 0) {
    return <div>This slide has no content</div>
  }

  return (
    <div className="starting-hidden h-screen w-screen">
      <SectionMapper section={slides[currentIndex]} />
    </div>
  )
}
