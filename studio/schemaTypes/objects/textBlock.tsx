/* eslint-disable @typescript-eslint/ban-ts-comment */
import {text_field} from '@equinor/eds-icons'
import {defineField, type PortableTextBlock} from 'sanity'
import {EdsIcon} from '../../icons'
import {configureBlockContent} from '../editors/blockContentType'
import blocksToText from '../../helpers/blocksToText'

const blockContentType = configureBlockContent()

type TextBlock = {
  text?: string
}

export default {
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  fieldsets: [],
  fields: [
    defineField({
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
    }),
    defineField({
      name: 'textOptions',
      type: 'textOptions',
    }),
  ].filter((e) => e),
  preview: {
    select: {
      text: 'text',
    },
    prepare({text}: {text: PortableTextBlock[]}) {
      const plainTitle = blocksToText(text)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: 'Text block component',
        media: EdsIcon(text_field),
      }
    },
  },
}
