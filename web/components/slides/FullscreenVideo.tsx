import { Suspense } from 'react'

interface FullscreenVideoProps {
  video: any
  thumbnail?: string
}

export default function FullscreenImage(props: FullscreenVideoProps) {
  const { video, thumbnail } = props
  console.log('video', video)
  return (
    <div className="absolute inset-0 -z-10 w-full overflow-hidden">
      <Suspense fallback={<p>Loading video...</p>}>
        <video autoPlay controls={false} muted playsInline loop className="h-screen w-screen object-cover">
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Suspense>
    </div>
  )
}
