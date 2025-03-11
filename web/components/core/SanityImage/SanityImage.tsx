import { Image as CMSImage } from 'next-sanity/image'
import NextImage from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import { twMerge } from 'tailwind-merge'

interface SanityImageProps {
  image: any
  priority?: boolean
  cover?: boolean
  className?: string
}

export default function SanityImage(props: SanityImageProps) {
  const { image: source, priority, cover = false, className = '' } = props
  const imageSizes = cover ? '100vw' : '(max-width: 800px) 100vw, 800px'
  const image = source?.asset?._ref ? (
    <CMSImage
      className={`object-cover`}
      fill={true}
      alt=""
      src={urlForImage(source)?.height(720).width(1280).auto('format').url() as string}
      sizes={imageSizes}
      priority={priority}
    />
  ) : (
    <NextImage src={source} alt="" fill priority={priority} className="object-cover" />
  )

  return <div className={twMerge(`${cover ? 'absolute inset-0 -z-10' : 'h-full w-full'}`, className)}>{image}</div>
}
