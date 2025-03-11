import { play_circle } from '@equinor/eds-icons'
import type { Reference, Rule } from 'sanity'
import { EdsIcon } from '../../icons/edsIcons'

export default {
  type: 'document',
  title: 'Video file',
  name: 'videoFile',
  icon: () => EdsIcon(play_circle),
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'video',
      title: 'Video',
      description: 'Upload an video. Preview is not available in  POC',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = 'Video component' }: { title: string }) {
      return {
        title,
      }
    },
  },
}
