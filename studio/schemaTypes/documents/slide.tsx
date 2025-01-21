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
        {type: 'testSlide'},
      ].filter((e) => e),
    }),
    defineField({
      name: 'duration',
      type: 'number',
      title: 'Slide Duration (seconds)',
      description: 'Optional duration for the slide in seconds. Default is 30 seconds',
      validation: (Rule) =>
        Rule.min(1).integer().positive().warning('Duration should be a positive whole number'),
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
      duration: 'duration',
    },
    prepare(selection: any) {
      const {title, duration} = selection
      return {
        title: title,
        subtitle: `Duration: ${duration || 30} seconds`,
      }
    },
  },
}
