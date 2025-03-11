/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineField, type PortableTextBlock } from 'sanity'
import { configureBlockContent } from '../editors/blockContentType'
import blocksToText from '../../helpers/blocksToText'
import { MdOutlineCalendarMonth } from 'react-icons/md'

const blockContentType = configureBlockContent()

export default {
  name: 'event',
  title: 'Event',
  type: 'object',
  fieldsets: [],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Optional',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
    }),
    defineField({
      name: 'title',
      type: 'array',
      title: 'Event title',
      of: [blockContentType],
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [blockContentType],
    }),
    defineField({
      name: 'startDatetime',
      type: 'datetime',
      title: 'Start datetime',
    }),
    defineField({
      name: 'endDatetime',
      type: 'datetime',
      title: 'End datetime',
    }),
    /*     defineField({
      name: 'timeToBeAnnounced',
      type: 'boolean',
      title: 'Time to be announced',
    }), */
    defineField({
      name: 'hideTime',
      type: 'boolean',
      title: 'Hide time',
      description: 'If event is over more than one day time is hidden automatically',
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
    }),
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
    },
    prepare({ title, date }: { title: PortableTextBlock[]; date: any }) {
      const eventDate = date?.date ? `${date.date} ${date?.timezone}` : 'No date set'
      return {
        title: title ? blocksToText(title) : 'Untitled event',
        subtitle: eventDate,
        media: MdOutlineCalendarMonth,
      }
    },
  },
}
