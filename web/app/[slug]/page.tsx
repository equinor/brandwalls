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

export default async function Page({ params }: { params: { slug: string } }) {
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
