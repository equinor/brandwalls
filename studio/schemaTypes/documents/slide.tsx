import {TbDeviceIpadHorizontalStar} from 'react-icons/tb'
import {defineField} from 'sanity'

export default {
  type: 'document',
  name: 'slide',
  title: 'Slide',
  icon: TbDeviceIpadHorizontalStar,
  fieldsets: [],
  groups: [
    {
      name: 'scheduling',
      title: 'Schedule',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Name of slide type',
    }),
    defineField({
      name: 'scheduling',
      type: 'slideScheduling',
      title: 'Slide schedule',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Slide type',
      of: [
        {type: 'textBlock'},
        {type: 'fullWidthImage'},
        {type: 'fullWidthVideo'},
        {type: 'infoBoard'},
      ].filter((e) => e),
    }),
  ].filter((e) => e),
  orderings: [
    {
      title: 'Title ',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Slide  ',
      }
    },
  },
}
