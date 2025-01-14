import {GrTestDesktop} from 'react-icons/gr'

export default {
  name: 'testSlide',
  title: 'Test slide',
  description: 'To test the screens',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
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
        subtitle: 'Test Slide',
        media: GrTestDesktop,
      }
    },
  },
}
