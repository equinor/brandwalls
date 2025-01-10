'use client'

import { useEffect, useState } from 'react'
import SectionMapper from './SectionMapper'

type SlideshowProps = {
  slideshows: any[]
}

export default function Slideshow({ slideshows }: SlideshowProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setActiveSlideIndex((i) => (i + 1) % slideshows?.[0]?.slides.length), 30000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <SectionMapper section={slideshows?.[0]?.slides[activeSlideIndex]} />
}
