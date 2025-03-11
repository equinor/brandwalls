import Blocks from '../Blocks'
import { Event as _Event } from '@/sanity.types'
import { format, parseISO, isSameDay } from 'date-fns'
import SanityImage from '../core/SanityImage/SanityImage'

type EventProps = _Event

export default function Event({
  title,
  eyebrow,
  endDatetime,
  startDatetime,
  image,
  introduction,
  location,
  timeToBeAnnounced,
  hideTime,
}: EventProps) {
  const startDate = startDatetime ? parseISO(startDatetime) : undefined
  const endDate = endDatetime ? parseISO(endDatetime) : undefined
  return (
    <div className={`grid h-full w-full grid-cols-4 grid-rows-4`}>
      {eyebrow && <div className="col-span-4 row-start-1 row-end-1 flex items-end pb-xl ps-96 text-2xl">{eyebrow}</div>}
      <div className="col-span-4 flex flex-col">
        <div className="grid grid-cols-4 bg-moss-green-50 ps-96">
          <div className="col-span-2 py-48">
            {title && <Blocks value={title} className="pb-xl text-4xl" />}
            {startDate && endDate && (
              <div className="text-2xl text-norwegian-woods-100">
                {isSameDay(startDate, endDate) ? (
                  <div>{format(startDate, 'd LLLL yyyy')}</div>
                ) : (
                  <div>
                    {format(startDate, 'd')} - {format(endDate, 'd')} {format(startDate, 'LLLL yyyy')}
                  </div>
                )}
                {!hideTime && (
                  <div className="text-xl">
                    {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
                  </div>
                )}
                {location && <div className="text-xl">{location}</div>}
              </div>
            )}
          </div>
          <div className="relative col-span-2 h-full w-full">
            {image && <SanityImage image={image} className="max-w-[25vw]" />}
          </div>
        </div>
        <div className="px-4xl ps-96 pt-xl">
          {introduction && <Blocks value={introduction} className="max-w-prose text-balance text-xl leading-loose" />}
        </div>
      </div>
    </div>
  )
}
