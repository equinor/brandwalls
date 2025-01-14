import { PortableTextBlock } from 'next-sanity'
import CoverImage from '../core/CoverImage/CoverImage'
import TextBlock, { textOptions } from './TextBlock'

interface FullscreenImageProps {
  image: any
  credit?: string
  text?: PortableTextBlock[]
  textOptions?: textOptions | undefined
}

export default function FullscreenImage(props: FullscreenImageProps) {
  const { image, credit, text, textOptions } = props

  return (
    <div className="relative h-full w-full">
      <CoverImage image={image} />
      {text && <TextBlock text={text} textOptions={textOptions} />}
      {credit && <p className={`absolute bottom-5 right-12 text-md font-medium`}>{credit}</p>}
    </div>
  )
}
