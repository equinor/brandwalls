import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import { FullWidthImage } from '@/sanity.types'
import { client } from '@/sanity/lib/client'

//height(720).width(1280).auto('format')
export const useSanityLoader = (image: FullWidthImage): UseNextSanityImageProps =>
  useNextSanityImage(client, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder.height(2000).width(3500).fit('crop').quality(100)
    },
  })
