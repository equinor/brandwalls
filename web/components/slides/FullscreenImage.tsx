import { PortableTextBlock } from 'next-sanity'
import CoverImage from '../core/CoverImage/CoverImage'
import TextBlock from './TextBlock'

interface FullscreenImageProps {
  image: any
  credit?: string
  contentXAlignment?: 'left' | 'center' | 'right'
  contentYAlignment?: 'top' | 'center' | 'bottom'
  text?: PortableTextBlock[]
}

export default function FullscreenImage(props: FullscreenImageProps) {
  const { image, credit, text, contentXAlignment = 'left', contentYAlignment = 'center' } = props

  return (
    <div className="relative h-full w-full">
      <CoverImage image={image} />
      {text && <TextBlock text={text} contentXAlignment={contentXAlignment} contentYAlignment={contentYAlignment} />}
      {credit && <p className={`absolute bottom-5 right-12 text-md font-medium`}>{credit}</p>}
    </div>
  )
}
