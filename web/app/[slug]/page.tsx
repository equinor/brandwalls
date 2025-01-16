import { getSlideshowsQuery, pagesSlugs } from '@/sanity/lib/queries'
import Slideshow from '@/components/sections/Slideshow'
import { sanityFetch } from '@/sanity/lib/live'
import isSlideActive from '@/common/helpers/isSlideActive'

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60
export const dynamicParams = true

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

export default async function Page(props: Props) {
  const params = await props.params
  const { data: slideshows } = await sanityFetch({ query: getSlideshowsQuery, params })

  const filteredSlideshows = slideshows.map((show: any) => {
    return {
      ...show,
      slides: show.slides?.filter(isSlideActive) || [],
    }
  })

  return (
    <div className="h-full w-full">
      <Slideshow slideshows={filteredSlideshows} />
    </div>
  )
}
