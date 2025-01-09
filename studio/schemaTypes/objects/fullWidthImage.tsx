import {type Rule, type Reference, defineField, PortableTextBlock} from 'sanity'
import {
  MdAlignHorizontalCenter,
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignVerticalBottom,
  MdAlignVerticalCenter,
  MdAlignVerticalTop,
} from 'react-icons/md'
import {RadioIconSelector} from '../components/RadioIconSelector'
import {configureBlockContent} from '../editors/blockContentType'
import {validateCharCounterEditor} from '../validations/validateCharCounterEditor'

const blockContentType = configureBlockContent()

const contentXAlignmentOptions = [
  {value: 'left', icon: MdAlignHorizontalLeft},
  {value: 'center', icon: MdAlignHorizontalCenter},
  {value: 'right', icon: MdAlignHorizontalRight},
]
const contentYAlignmentOptions = [
  {value: 'top', icon: MdAlignVerticalTop},
  {value: 'center', icon: MdAlignVerticalCenter},
  {value: 'bottom', icon: MdAlignVerticalBottom},
]

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
          return validateCharCounterEditor(value, 600)
        }).error(),
    }),
    defineField({
      name: 'contentXAlignment',
      title: 'Content Alignment along X axis',
      description: '',
      type: 'string',
      initialValue: 'left',
      components: {
        input: function ({onChange, value}: {onChange: any; value: string}) {
          return (
            <RadioIconSelector
              name="imageAlignmentSelector"
              options={contentXAlignmentOptions}
              defaultValue={'left'}
              currentValue={value}
              onChange={onChange}
            />
          )
        },
      },
    }),
    defineField({
      name: 'contentYAlignment',
      title: 'Content Alignment along Y axis',
      description: '',
      type: 'string',
      initialValue: 'center',
      components: {
        input: function ({onChange, value}: {onChange: any; value: string}) {
          return (
            <RadioIconSelector
              name="imageAlignmentSelector"
              options={contentYAlignmentOptions}
              defaultValue={'center'}
              currentValue={value}
              onChange={onChange}
            />
          )
        },
      },
    }),
  ],
  preview: {
    select: {
      image: 'image.asset',
      xAlign: 'contentXAlignment',
      yAlign: 'contentYAlignment',
    },
    prepare({
      alt,
      image,
      xAlign,
      yAlign,
    }: {
      alt: string
      image: Reference
      xAlign: string
      yAlign: string
    }) {
      console.log('image', image)
      return {
        title: `Fullwidth image component`,
        subtitle: `Alignment: ${xAlign} | ${yAlign}`,
        media: image,
      }
    },
  },
}
