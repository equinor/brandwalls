import { PortableTextBlock } from 'next-sanity'
import CoverImage from '../core/CoverImage/CoverImage'
import Blocks from '../Blocks'

interface FullscreenImageProps {
  image: any
  credit?: string
  contentXAlignment?: 'left' | 'center' | 'right'
  contentYAlignment?: 'top' | 'center' | 'bottom'
  content?: PortableTextBlock[]
}

export default function FullscreenImage(props: FullscreenImageProps) {
  const { image, credit, content, contentXAlignment = 'left', contentYAlignment = 'center' } = props
  const alignmentX = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }
  const alignmentY = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  }
  return (
    <div className="relative h-full w-full">
      <CoverImage image={image} />
      <div className={`flex h-full w-full p-12 ${alignmentX[contentXAlignment]} ${alignmentY[contentYAlignment]}`}>
        {content && <Blocks value={content} />}
      </div>
      {credit && <p className={`absolute bottom-5 right-12 text-md font-medium`}>{credit}</p>}
    </div>
  )
}
