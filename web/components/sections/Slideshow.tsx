'use client'

import { useEffect, useState } from 'react'
import SectionMapper from './SectionMapper'

type Slide = {
  content: any
  duration?: number | null
}

type SlideshowProps = {
  slideshows: {
    slides: Slide[]
  }[]
}

export default function Slideshow({ slideshows }: SlideshowProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [currentDuration, setCurrentDuration] = useState(30000)

  const slides = slideshows?.[0]?.slides || []

  useEffect(() => {
    if (!slides.length) return
    const duration = (slides[activeSlideIndex]?.duration || 30) * 1000

    setCurrentDuration(duration)

    const interval = setInterval(() => {
      setActiveSlideIndex((i) => (i + 1) % slides.length)
    }, duration)

    return () => {
      clearInterval(interval)
    }
  }, [activeSlideIndex, slides])

  return <SectionMapper section={slides[activeSlideIndex]} />
}
