import TextBlock from './TextBlock'
import { FullWidthImage, TextOptions } from '@/sanity.types'
import SanityImage from '../core/SanityImage/SanityImage'

type FullscreenImageProps = FullWidthImage

export default function FullscreenImage(props: FullscreenImageProps) {
  const { image, text, textOptions, containImage = false, noAnimation = false } = props

  return (
    <div className="relative h-full w-full">
      <div className={`${!containImage ? 'absolute inset-0 -z-10' : 'h-full w-full'}`}>
        <SanityImage
          image={image}
          contain={containImage}
          cover={true}
          className={`${!noAnimation ? 'animate-zoomIn' : ''}`}
        />
      </div>
      {text && (
        <TextBlock
          //@ts-ignore: TODO
          text={text}
          textOptions={textOptions}
        />
      )}
    </div>
  )
}
