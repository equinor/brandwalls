'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SectionMapper from './SectionMapper'
import { useSlideContext } from '../slide-context'
import { distributeRecurringForSlideshow, isSlideActive } from '@/common/helpers/slideScheduling'
import { LogoSecondary } from '../core/Logo/Logo'

const SCHEDULING_CHECK_INTERVAL = 1000

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
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [schedulingTime, setSchedulingTime] = useState(() => new Date())

  const slides = useMemo(() => {
    const allSlides = slideshows
      ?.flatMap((show) => show?.slides ?? [])
      .filter((slide) => slide?.content?.length > 0)
    //@ts-ignore: TODO
    const processedSlides = distributeRecurringForSlideshow(allSlides)
    return processedSlides
  }, [slideshows])

  const findNextIndex = useCallback((startIndex: number) => {
    const now = new Date()
    for (let offset = 1; offset <= slides.length; offset += 1) {
      const nextIndex = (startIndex + offset) % slides.length
      if (isSlideActive(slides[nextIndex], now)) {
        return nextIndex
      }
    }

    return null
  }, [slides])

  useEffect(() => {
    const interval = setInterval(() => {
      setSchedulingTime(new Date())
    }, SCHEDULING_CHECK_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentSlide = currentIndex === null ? undefined : slides[currentIndex]
    if (currentSlide && isSlideActive(currentSlide, schedulingTime)) return

    const firstActiveIndex = slides.findIndex((slide) => isSlideActive(slide, schedulingTime))
    const nextIndex = firstActiveIndex >= 0 ? firstActiveIndex : null
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex)
    }
  }, [currentIndex, schedulingTime, slides])

  useEffect(() => {
    if (currentIndex === null) return

    const currentSlide = slides[currentIndex]
    if (!currentSlide || !isSlideActive(currentSlide)) return

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

    let timeout: ReturnType<typeof setTimeout>
    const scheduleNextSlide = () => {
      timeout = setTimeout(() => {
        const nextIndex = findNextIndex(currentIndex)
        if (nextIndex === currentIndex) {
          scheduleNextSlide()
          return
        }
        setCurrentIndex(nextIndex)
      }, duration)
    }

    scheduleNextSlide()
    return () => clearTimeout(timeout)
  }, [currentIndex, findNextIndex, slides, videoDuration])

  const currentSlide = currentIndex === null ? undefined : slides[currentIndex]
  const activeSlide =
    currentSlide && isSlideActive(currentSlide, schedulingTime) ? currentSlide : undefined

  return (
    <div className="starting-hidden h-full w-full overflow-hidden">
      {!activeSlide && (
        <div className="flex h-full w-full items-center justify-center">
          <LogoSecondary className="h-2/6 w-2/6" />
        </div>
      )}
      {activeSlide && <SectionMapper section={activeSlide} />}
    </div>
  )
}
