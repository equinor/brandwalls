import React, { useRef, Suspense } from 'react'
import ReactPlayer from 'react-player'
import { useSlideContext } from '../slide-context'

interface FullscreenVideoProps {
  video: { url: string }
  thumbnail?: string
}

export default function FullscreenVideo(props: FullscreenVideoProps) {
  const { video } = props
  const videoRef = useRef(null)
  const { changeVideoDuration } = useSlideContext()

  return (
    <div className="absolute inset-0 -z-10 w-full overflow-hidden">
      <Suspense fallback={<p>Loading video...</p>}>
        <div className="h-screen w-screen object-cover">
          <ReactPlayer
            //@ts-ignore: TODO
            ref={videoRef}
            className=""
            url={video.url}
            muted
            loop
            playing={true}
            playsinline
            controls={false}
            width="100vw"
            height="100vh"
            onDuration={(duration) => {
              changeVideoDuration(duration)
            }}
          />
        </div>
      </Suspense>
    </div>
  )
}
