import Img from 'next/image'
import { twMerge } from 'tailwind-merge'
import { useSanityLoader } from '@/common/helpers/hooks/useSanityLoader'

interface SanityImageProps {
  image: any
  priority?: boolean
  cover?: boolean
  className?: string
  contain?: boolean
}

// There can be a case where a fullwidth image wants to be contained. Cover is then true but should be contain.
export default function SanityImage({
  image,
  priority,
  cover = false,
  className = '',
  contain = false,
  ...rest
}: SanityImageProps) {
  const imageProps = useSanityLoader(image)
  if (!image?.asset) return <></>
  const { width, height, src } = imageProps
  const sizes = cover ? '100%' : '(max-width: 800px) 100vw, 800px'
  let coverUtility = 'object-cover'
  if (cover && contain) {
    coverUtility = 'object-contain'
  }
  const props = {
    ...(cover && { fill: true }),
    ...(!cover && {
      width,
      height,
    }),
  }
  return (
    <Img
      {...props}
      src={src}
      priority
      alt=""
      sizes={sizes}
      className={twMerge(`${cover ? coverUtility : 'flex h-auto w-full'} ${contain ? 'p-96' : ''}`, className)}
    />
  )
}
