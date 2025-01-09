import { PortableTextBlock } from 'next-sanity'
import CoverImage from '../core/CoverImage/CoverImage'
import Blocks from '../Blocks'

interface FullscreenImageProps {
  image: any
  credit?: string
  contentXAlignment?: 'left' | 'center' | 'right'
  contentYAlignment?: 'top' | 'center' | 'bottom'
  text?: PortableTextBlock[]
}

export default function FullscreenImage(props: FullscreenImageProps) {
  const { image, credit, text, contentXAlignment = 'left', contentYAlignment = 'center' } = props
  console.log('contentXAlignment', contentXAlignment)
  console.log('contentYAlignment', contentYAlignment)

  const getAlignmentX = () => {
    switch (contentXAlignment) {
      case 'center':
        return 'justify-center'
      case 'right':
        return 'justify-end'
      default:
        return 'justify-start'
    }
  }
  const getAlignmentY = () => {
    switch (contentYAlignment) {
      case 'top':
        return 'items-start'
      case 'bottom':
        return 'items-end'
      default:
        return 'items-center'
    }
  }
  console.log('getAlignmentX()', getAlignmentX())
  console.log('getAlignmentY()', getAlignmentY())
  return (
    <div className="relative h-full w-full">
      <CoverImage image={image} />
      <div className={`flex h-full w-full p-12 ${getAlignmentX()} ${getAlignmentY()}`}>
        {text && <Blocks value={text} />}
      </div>
      {credit && <p className={`absolute bottom-5 right-12 text-md font-medium`}>{credit}</p>}
    </div>
  )
}
