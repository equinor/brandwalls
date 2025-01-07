import { BarChartIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default {
  type: 'document',
  name: 'slideshow',
  title: 'Slideshow',
  icon: BarChartIcon,
  fieldsets: [],
  fields: [
    defineField({
      name: 'showLocations',
      title: 'Show in locations',
      type: 'reference',
      description: 'Select which locations this slideshow should appear on.',
      to: [{ type: 'location' }],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'slides',
      type: 'array',
      title: 'Slides',
      of: [{ type: 'slide' }].filter((e) => e),
    }),
  ].filter((e) => e),
  orderings: [
    {
      title: 'Title ',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Slideshow',
      }
    },
  },
}
