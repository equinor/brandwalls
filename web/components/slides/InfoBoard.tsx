'use client'

import { format } from 'date-fns'
import { LogoSecondary } from '../core/Logo/Logo'
import SIFNumber from '../core/SIFNumber/SIFNumber'
import StockValues from '../core/StockValues/StockValues'
import { Clock } from '../core/Clock/Clock'

type InfoBoardProps = {
  sif: string
}

export default function InfoBoard({ sif }: InfoBoardProps) {
  return (
    <div className="grid h-full w-full grid-cols-4 grid-rows-4">
      <div className="col-start-1 col-end-3 row-span-4 h-full w-full">
        <div className="flex justify-center">
          <div className="flex w-[60%] flex-col items-center gap-32">
            <div className="relative aspect-square h-full w-full">
              <Clock />
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-12">
              <div className="w-max text-6xl font-thin" suppressHydrationWarning>
                {format(new Date(), 'HH:mm:ss')}
              </div>
              <div className="w-max text-2xl" suppressHydrationWarning>
                {format(new Date(), 'EEEE d LLLL yyyy')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-3 col-end-4 row-span-4 flex items-center justify-start">
        <div className="flex h-[60%] flex-col items-start justify-center gap-56 px-20">
          <StockValues />
        </div>
      </div>
      <div className="col-start-4 col-end-5 row-span-4 flex items-center justify-start">
        <SIFNumber sif={sif} />
      </div>
    </div>
  )
}
