import { type Rule, type Reference, defineField, PortableTextBlock } from 'sanity'
import { configureBlockContent } from '../editors/blockContentType'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

const blockContentType = configureBlockContent()

export default {
  name: 'fullWidthImage',
  title: 'Full width image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => {
          return validateCharCounterEditor(value, 600, true)
        }).error(),
    }),
    defineField({
      name: 'textOptions',
      type: 'textOptions',
    }),
  ],
  preview: {
    select: {
      image: 'image.asset',
      textOptions: 'textOptions',
    },
    prepare({ image, textOptions }: { alt: string; image: Reference; textOptions: any }) {
      return {
        title: `Fullwidth image component`,
        subtitle: `Screens: ${Array(textOptions?.screens).toString()}`,
        media: image,
      }
    },
  },
}
