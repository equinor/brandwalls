import { TbDeviceIpadHorizontalStar } from 'react-icons/tb'
import { TbInfoSquare } from 'react-icons/tb'
import { RxVideo } from 'react-icons/rx'
import { BsCardText } from 'react-icons/bs'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import { defineField } from 'sanity'

const getThumb = (type: string) => {
  if (type === 'fullWidthVideo') return RxVideo
  if (type === 'infoBoard') return TbInfoSquare
  if (type === 'textBlock') return BsCardText
  if (type === 'event') return MdOutlineCalendarMonth
  return undefined
}

export default {
  type: 'document',
  name: 'slide',
  title: 'Slide',
  icon: TbDeviceIpadHorizontalStar,
  fieldsets: [],
  groups: [
    {
      name: 'scheduling',
      title: 'Schedule',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Name of slide type',
    }),
    defineField({
      name: 'scheduling',
      type: 'slideScheduling',
      title: 'Slide schedule',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Slide type',
      of: [
        { type: 'textBlock' },
        { type: 'fullWidthImage' },
        { type: 'fullWidthVideo' },
        { type: 'infoBoard' },
        { type: 'event' },
        { type: 'testSlide' },
      ].filter((e) => e),
    }),
    defineField({
      name: 'overrideDuration',
      type: 'boolean',
      title: 'Custom duration',
    }),
    defineField({
      name: 'duration',
      type: 'string',
      title: 'Override duration in seconds, default is 30',
      description: 'If there is a video it will play the duration of the video, except if this field is set',
      hidden: ({ document }) => !document?.overrideDuration,
    }),
  ].filter((e) => e),
  orderings: [
    {
      title: 'Title ',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
      overrideDuration: 'overrideDuration',
      scheduling: 'scheduling',
      content: 'content',
      image: 'content.0.image.asset',
    },
    prepare(selection: any) {
      const { title, duration, overrideDuration, scheduling, content, image } = selection
      let scheduleType = 'Default'
      let scheduleSubTitle = ``
      if (scheduling?.scheduleType === '1') {
        scheduleType = 'Specific period'
      }
      if (scheduling?.scheduleType === '2') {
        scheduleType = 'Selected weekdays'
        scheduleSubTitle = `| ${scheduling?.weekdays?.toString()}`
      }
      if (scheduling?.scheduleType === '3') {
        scheduleType = 'Slide frequency'
        let scheduleFreq = 'Every 3rd'
        if (scheduling?.scheduleType === '3' && scheduling?.slideFrequency === '4') {
          scheduleFreq = 'Every 4th'
        }
        if (scheduling?.scheduleType === '3' && scheduling?.slideFrequency === '5') {
          scheduleFreq = 'Every 5th'
        }
        scheduleSubTitle = ` | ${scheduleFreq}`
      }
      const durationSubtitle = overrideDuration ? ` | Custom duration: ${duration} seconds` : ``

      return {
        title: title,
        subtitle: `${scheduleType}${scheduleSubTitle}${durationSubtitle}`,
        media: image ? image : getThumb(content?.[0]?._type),
      }
    },
  },
}
