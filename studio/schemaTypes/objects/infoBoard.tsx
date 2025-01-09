import {play_circle} from '@equinor/eds-icons'
import {EdsIcon} from '../../icons'

export default {
  name: 'infoBoard',
  title: 'Information board',
  description: 'Slide type with clock, stock prices and SIF number',
  type: 'object',
  fields: [
    {
      name: 'sif',
      type: 'string',
      title: 'Serious Incident Frequency ',
    },
  ],
  preview: {
    select: {},
    prepare({}: {}) {
      return {
        title: 'Information board',
        media: EdsIcon(play_circle),
      }
    },
  },
}
