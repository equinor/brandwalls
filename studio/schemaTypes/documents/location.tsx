import {PiGridNineLight} from 'react-icons/pi'
import {defineField} from 'sanity'

export default {
  type: 'document',
  name: 'location',
  title: 'Location',
  icon: PiGridNineLight,
  fieldsets: [],
  fields: [
    defineField({
      name: 'title',
      title: 'Name of location',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      description: 'decimal degrees',
      type: 'string',
    }),
    defineField({
      name: 'lon',
      title: 'Longtitude',
      description: 'decimal degrees',
      type: 'string',
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
        subtitle: 'Location',
      }
    },
  },
}
