//@ts-nocheck

import Slideshow from '@/components/sections/Slideshow';
import { SlideProvider } from '@/components/slide-context';
import { client } from '@/sanity/lib/client';
import { sanityFetch } from '@/sanity/lib/live';
import { getSlideshowsQuery, pagesSlugs } from '@/sanity/lib/queries';

export async function generateStaticParams() {
  const data = await client.fetch(
    pagesSlugs,
    {},
    {
      perspective: 'published',
      stega: false,
    },
  );

  return data;
}

type Params = Promise<{ slug: string }>;

// export const revalidate = 120 // revalidate at most every hour

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const { data: slideshows } = await sanityFetch({
    query: getSlideshowsQuery,
    params: { slug },
    tags: ['slideshow', `location:${slug}`],
    requestTag: 'slideshow-by-location',
  });

  return (
    <SlideProvider>
      <Slideshow slideshows={slideshows} />
    </SlideProvider>
  );
}
