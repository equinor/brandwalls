import {defineField} from 'sanity'

export default {
  name: 'slideScheduling',
  title: 'Slide scheduling',
  type: 'object',
  fields: [
    defineField({
      title: 'Show on selected Weekdays',
      name: 'weekdays',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Monday', value: 'monday'},
          {title: 'Tuesday', value: 'tuesday'},
          {title: 'Wednesday', value: 'wednesday'},
          {title: 'Thursday', value: 'thursday'},
          {title: 'Friday', value: 'friday'},
          {title: 'Saturday', value: 'saturday'},
          {title: 'Sunday', value: 'sunday'},
        ],
      },
    }),
    defineField({
      title: 'Show in frequency',
      name: 'slideFrequency',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Every 3rd', value: '3'},
          {title: 'Every 4th', value: '4'},
          {title: 'Every 5th', value: '5'},
        ],
      },
    }),
  ],
  preview: {},
  prepare({}: {}) {
    return {
      title: 'Slide scheduling',
    }
  },
}
