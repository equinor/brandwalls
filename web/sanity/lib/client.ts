import { ClientPerspective, createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { QueryParams } from 'sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  //perspective: 'published',
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
})
