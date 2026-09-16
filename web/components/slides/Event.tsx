import { format, isSameDay, parseISO } from "date-fns";
import type { Event as _Event } from "@/sanity.types";
import Blocks from "../Blocks";
import SanityImage from "../core/SanityImage/SanityImage";

type EventProps = _Event;

export default function Event({
  title,
  eyebrow,
  endDatetime,
  startDatetime,
  image,
  introduction,
  location,
  hideTime,
}: EventProps) {
  const startDate = startDatetime ? parseISO(startDatetime) : undefined;
  const endDate = endDatetime ? parseISO(endDatetime) : undefined;
  return (
    <div className={`flex h-full w-full flex-col`}>
      {eyebrow && (
        <div className="flex items-end ps-96 pt-56 pb-2xl text-2xl">
          {eyebrow}
        </div>
      )}
      <div className="grid grow grid-cols-4 bg-moss-green-60 ps-96">
        <div className="col-span-2 py-48">
          {title && <Blocks value={title} className="pb-xl text-4xl" />}
          {startDate && endDate && (
            <div className="text-2xl text-norwegian-woods-100">
              {isSameDay(startDate, endDate) ? (
                <div>{format(startDate, "d LLLL yyyy")}</div>
              ) : (
                <div>
                  {format(startDate, "d")} - {format(endDate, "d")}{" "}
                  {format(startDate, "LLLL yyyy")}
                </div>
              )}
              {!hideTime && (
                <div className="text-xl">
                  {format(startDate, "HH:mm")} - {format(endDate, "HH:mm")}
                </div>
              )}
              {location && <div className="text-xl">{location}</div>}
            </div>
          )}
        </div>
        <div className="relative col-span-2 h-full w-full">
          {image && <SanityImage image={image} cover />}
        </div>
      </div>
      <div className="px-4xl ps-96 pt-2xl pb-4xl">
        {introduction && (
          <Blocks
            value={introduction}
            className="max-w-[65ch] text-balance text-xl leading-loose"
          />
        )}
      </div>
    </div>
  );
}
