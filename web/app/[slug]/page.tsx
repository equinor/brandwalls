//@ts-nocheck
import { getSlideshowsQuery, pagesSlugs } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import Slideshow from '@/components/sections/Slideshow'
import { SlideProvider } from '@/components/slide-context'
import { useMemo } from 'react'
import { client } from '@/sanity/lib/client'

export async function generateStaticParams() {
  const data = await client.fetch(
    pagesSlugs,
    {},
    {
      perspective: 'published',
      stega: false,
    },
  )

  return data
}

type Params = Promise<{ slug: string }>

// export const revalidate = 120 // revalidate at most every hour

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const slideshows = await client.fetch(getSlideshowsQuery, { slug })

  console.log('Fetching Slides')
  // const { data: slideshows } = await sanityFetch({query: getSlideshowsQuery, params})

  return (
    <SlideProvider>
      <Slideshow slideshows={slideshows} />
    </SlideProvider>
  )
}
