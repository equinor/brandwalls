'use client'
import React, { useEffect, useRef } from 'react'
import BackgroundPlayer from 'next-video/background-player'
import { useSlideContext } from '../slide-context'

interface FullscreenVideoProps {
  video: { url: string }
  thumbnail?: string
}

export default function FullscreenVideo(props: FullscreenVideoProps) {
  const { video } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const { changeVideoDuration } = useSlideContext()

  useEffect(() => {
    function handleMetadata() {
      const duration = el?.duration
      if (duration) {
        changeVideoDuration(duration)
      }
    }
    const el = videoRef.current

    if (el) {
      el.addEventListener('loadedmetadata', handleMetadata)
    }
    return () => {
      if (el) {
        el.removeEventListener('loadedmetadata', handleMetadata)
      }
    }
  }, [videoRef.current])

  return (
    <div className="relative aspect-video h-screen w-screen pt-[56.25%]">
      <BackgroundPlayer
        ref={videoRef}
        src={video.url}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 aspect-auto h-full w-full"
      />
    </div>
  )
}
