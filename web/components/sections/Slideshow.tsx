'use client'

import { useEffect, useState } from 'react'
import SectionMapper from './SectionMapper'
import { processSlides } from '@/common/helpers/slideScheduling'

type Slide = {
  content: any
  duration?: number | null
  scheduling?: any
}

type SlideshowProps = {
  slideshows: {
    slides: Slide[]
  }[]
}

export default function Slideshow({ slideshows }: SlideshowProps) {
  const [activeSlides, setActiveSlides] = useState<Slide[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [videoDuration, setVideoDuration] = useState<number | null>(null)

  function handleVideoDuration(durationSeconds: number) {
    setVideoDuration(durationSeconds)
  }

  useEffect(() => {
    if (!slideshows[0]) return
    const initiallyActive = processSlides(slideshows[0].slides) || []
    setActiveSlides(initiallyActive)
    setCurrentIndex(0)
  }, [slideshows])

  useEffect(() => {
    if (activeSlides.length === 0) return
    const currentSlide = activeSlides[currentIndex]
    const durationMs = (currentSlide?.duration || videoDuration || 30) * 1000

    const timer = setTimeout(() => {
      const refreshed = processSlides(slideshows[0]?.slides || [])

      setActiveSlides((prevActive) => {
        if (refreshed.length !== prevActive.length && currentIndex >= refreshed.length) {
          setCurrentIndex(0)
        }
        return refreshed
      })

      setCurrentIndex((prev) => {
        if (refreshed.length === 0) return 0
        return (prev + 1) % refreshed.length
      })
    }, durationMs)

    return () => clearTimeout(timer)
  }, [activeSlides, currentIndex, slideshows])

  if (activeSlides.length === 0) {
    return <div>No active slides</div>
  }

  const slide = activeSlides[currentIndex]
  if (!slide || !slide.content || slide.content.length === 0) {
    return <div>This slide has no content</div>
  }

  return <SectionMapper section={slide} onVideoDuration={handleVideoDuration} />
}
