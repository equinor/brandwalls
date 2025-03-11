import { PortableTextBlock } from 'next-sanity'
import TextBlock from './TextBlock'
import { TextOptions } from '@/sanity.types'
import SanityImage from '../core/SanityImage/SanityImage'

interface FullscreenImageProps {
  image: any
  credit?: string
  text?: PortableTextBlock[]
  textOptions?: TextOptions | undefined
}

export default function FullscreenImage(props: FullscreenImageProps) {
  const { image, credit, text, textOptions } = props

  return (
    <div className="relative h-full w-full">
      <SanityImage cover={true} image={image} />
      {text && <TextBlock text={text} textOptions={textOptions} />}
      {credit && <p className={`absolute bottom-5 right-12 text-md font-medium`}>{credit}</p>}
    </div>
  )
}
