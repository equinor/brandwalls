'use client'

import { format } from 'date-fns'
import { LogoSecondary } from '../core/Logo/Logo'
import Clock from '../core/Clock/Clock'
import SIFNumber from '../core/SIFNumber/SIFNumber'
import StockValues from '../core/StockValues/StockValues'

type InfoBoardProps = {
  sif: string
}

export default function InfoBoard({ sif }: InfoBoardProps) {
  return (
    <div className="grid h-full w-full px-8 py-8">
      <div className="flex justify-between">
        <LogoSecondary />
        <div className="text-lg">{format(new Date(), 'd LLLL yyyy')}</div>
      </div>
      <div className="grid grid-cols-2 gap-48 px-16">
        <div className="relative aspect-square">
          <Clock />
        </div>
        <div className="flex flex-col gap-16">
          <StockValues />
          <SIFNumber sif={sif} />
        </div>
      </div>
    </div>
  )
}
