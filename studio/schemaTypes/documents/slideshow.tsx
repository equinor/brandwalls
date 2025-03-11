import { BiSlideshow } from 'react-icons/bi'
import { defineField } from 'sanity'

export default {
  type: 'document',
  name: 'slideshow',
  title: 'Slideshow',
  icon: BiSlideshow,
  fieldsets: [],
  fields: [
    defineField({
      name: 'title',
      title: 'Name of slideshow',
      type: 'string',
    }),
    defineField({
      name: 'showLocations',
      title: 'Show in locations',
      type: 'array',
      description: 'Select which locations this slideshow should appear on.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'location' }],
        },
      ],
      options: {},
    }),
    /*     defineField({
      name: 'slides',
      type: 'array',
      title: 'Slides',
      of: [{ type: 'slide' }].filter((e) => e),
    }), */
    defineField({
      name: 'slides',
      title: 'Slide content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'slide' }],
        },
      ],
      options: {},
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
