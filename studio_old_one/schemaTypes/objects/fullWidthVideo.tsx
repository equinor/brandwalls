import { play_circle } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Image, PortableTextBlock, Rule } from 'sanity'

export default {
  name: 'fullWidthVideo',
  title: 'Full Width Video Player',
  type: 'object',
  fields: [
    {
      name: 'videoFile',
      type: 'reference',
      title: 'Video',
      to: [{ type: 'videoFile' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      videoTitle: 'videoFile.video.title',
      media: 'videoFile.thumbnail',
    },
    prepare({ videoTitle, media }: { title: PortableTextBlock[]; videoTitle: string; media: Image }) {
      return {
        title: videoTitle,
        subtitle: `Full width video component`,
        media: media || EdsIcon(play_circle),
      }
    },
  },
}
