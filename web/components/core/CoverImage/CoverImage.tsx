import { Image as SanityImage } from 'next-sanity/image'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'

interface CoverImageProps {
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props
  const image = source?.asset?._ref ? (
    <SanityImage
      className="object-cover"
      fill={true}
      alt=""
      src={urlForImage(source)?.height(720).width(1280).auto('format').url() as string}
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <Image src={source} alt="" fill className="object-cover" />
  )

  return <div className="absolute inset-0 -z-10">{image}</div>
}
