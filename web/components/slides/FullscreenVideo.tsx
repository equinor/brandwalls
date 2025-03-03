import React, { useEffect, useRef, Suspense } from 'react'
import ReactPlayer from 'react-player'

interface FullscreenVideoProps {
  video: { url: string }
  thumbnail?: string
  onVideoDuration?: any
}

export default function FullscreenVideo(props: FullscreenVideoProps) {
  const { video, onVideoDuration } = props
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    function handleMetadata() {
      const duration = el?.duration
      if (onVideoDuration) {
        onVideoDuration(duration)
      }
    }

    el.addEventListener('loadedmetadata', handleMetadata)
    return () => el.removeEventListener('loadedmetadata', handleMetadata)
  }, [onVideoDuration])

  console.log('video', video)

  return (
    <div className="absolute inset-0 -z-10 w-full overflow-hidden">
      <Suspense fallback={<p>Loading video...</p>}>
        {/*         <video ref={videoRef} autoPlay muted playsInline loop className="h-screen w-screen object-cover">
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <ReactPlayer
          //@ts-ignore: TODO
          ref={videoRef}
          className="h-screen w-screen object-cover"
          url={video.url}
          muted
          loop
          playsinline
          controls={false}
          width="100%"
          height="100%"
        />
      </Suspense>
    </div>
  )
}
