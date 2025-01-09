import { CaseIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default {
  type: 'document',
  name: 'slide',
  title: 'Slide',
  icon: CaseIcon,
  fieldsets: [],
  fields: [
    defineField({
      name: 'scheduling',
      type: 'slideScheduling',
      title: 'Slide schedule',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Slide type',
      of: [{ type: 'textBlock' }, { type: 'fullWidthImage' }, { type: 'fullWidthVideo' }, { type: 'infoBoard' }].filter(
        (e) => e,
      ),
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
        subtitle: 'Slide  ',
      }
    },
  },
}
