import {defineField, Rule} from 'sanity'

export default {
  name: 'slideScheduling',
  title: 'Slide scheduling',
  type: 'object',
  group: 'scheduling',
  fields: [
    defineField({
      title: 'Choose type of scheduling',
      name: 'scheduleType',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: '0'},
          {title: 'Specific period', value: '1'},
          {title: 'Selected weekdays', value: '2'},
          {title: 'Slide frequency', value: '3'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '0',
    }),
    defineField({
      title: 'Show on specific period',
      name: 'period',
      type: 'object',
      fields: [
        {
          name: 'from',
          title: 'Show from',
          type: 'datetime',
          options: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
            timeStep: 15,
            calendarTodayLabel: 'Today',
          },
        },
        {
          name: 'to',
          title: 'Show to',
          type: 'datetime',
          options: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
            timeStep: 15,
            calendarTodayLabel: 'Today',
          },
        },
      ],
      hidden: ({document}) => document?.scheduling?.scheduleType !== '1',
    }),
    defineField({
      title: 'Show on selected weekdays',
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
      hidden: ({document}) => document?.scheduling?.scheduleType !== '2',
    }),
    defineField({
      title: 'Show in frequency',
      name: 'slideFrequency',
      type: 'string',
      options: {
        list: [
          {title: 'Every 3rd', value: '3'},
          {title: 'Every 4th', value: '4'},
          {title: 'Every 5th', value: '5'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: ({document}) => document?.scheduling?.scheduleType !== '3',
    }),
  ],
}
