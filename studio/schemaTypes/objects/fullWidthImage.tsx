import type { Rule, Reference } from 'sanity'

export default {
  name: 'fullWidthImage',
  title: 'Full width image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: 'square', value: 'square' },
          { title: 'landscape', value: 'landscape' },
          { title: 'portrait', value: 'portrait' },
        ],
        layout: 'dropdown',
      },
      initialValue: 0.3,
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      image: 'image.image.asset',
    },
    prepare({ alt, image }: { alt: string; image: Reference }) {
      return {
        title: `Fullwidth image component`,
        media: image,
      }
    },
  },
}
