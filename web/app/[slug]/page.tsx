//@ts-nocheck
import { getSlideshowsQuery, pagesSlugs } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import Slideshow from '@/components/sections/Slideshow'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })

  return data
}

type Params = Promise<{ slug: string }>

export default async function Page({ params }: { params: Params }) {
  const { data: slideshows } = await sanityFetch({
    query: getSlideshowsQuery,
    params,
  })

  return (
    <div className="h-full w-full">
      <Slideshow slideshows={slideshows} />
    </div>
  )
}
