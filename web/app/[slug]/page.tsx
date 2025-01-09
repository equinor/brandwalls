import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery, getSlideshowsQuery, pagesSlugs } from '@/sanity/lib/queries'
import { Page as PageType } from '@/sanity.types'
import Slideshow from '@/components/sections/Slideshow'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  /** Fetching all locations to create separate route for each */
  const { data } = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const [{ data: slideshows }] = await Promise.all([sanityFetch({ query: getSlideshowsQuery, params })])
  console.log('slideshows', slideshows)

  return (
    <div className="h-full w-full">
      <Slideshow slideshows={slideshows} />
    </div>
  )
}
