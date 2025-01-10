import {play_circle} from '@equinor/eds-icons'
import type {Reference, Rule} from 'sanity'
import {EdsIcon} from '../../icons/edsIcons'

export default {
  type: 'document',
  title: 'Video file',
  name: 'videoFile',
  icon: () => EdsIcon(play_circle),
  fields: [
    {
      name: 'video',
      title: 'Video',
      description: 'Upload an video. Preview is not available in  POC',
      type: 'file',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
    },
  ],
  preview: {
    select: {
      image: 'thumbnail',
    },
    prepare({title = 'Video component', image}: {title: string; image: Reference}) {
      return {
        title,
        media: image,
      }
    },
  },
}
