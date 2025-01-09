/* eslint-disable @typescript-eslint/ban-ts-comment */
import { text_field } from '@equinor/eds-icons'
import type { PortableTextBlock } from 'sanity'
import { EdsIcon } from '../../icons'
import { configureBlockContent } from '../editors/blockContentType'
import blocksToText from '../../helpers/blocksToText'

const blockContentType = configureBlockContent({
  h2: false,
  h3: true,
  h4: false,
})

type TextBlock = {
  text?: string
}

export default {
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  fieldsets: [],
  fields: [
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      of: [blockContentType],
    },
  ].filter((e) => e),
  preview: {
    select: {
      text: 'text',
    },
    prepare({ text }: { text: PortableTextBlock[] }) {
      const plainTitle = blocksToText(text)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: 'Text block component',
        media: EdsIcon(text_field),
      }
    },
  },
}
