'use client'

import { format } from 'date-fns'
import { LogoPrimary, LogoSecondary } from '../core/Logo/Logo'
import SIFNumber from '../core/SIFNumber/SIFNumber'
import StockValues from '../core/StockValues/StockValues'
import { Clock } from '../core/Clock/Clock'

type InfoBoardProps = {
  sif: string
}

export default function InfoBoard({ sif }: InfoBoardProps) {
  return (
    <div className="grid h-full w-full px-20 py-12">
      <div className="flex justify-between">
        <div className="-mt-4">
          <LogoSecondary />
        </div>
        <div className="text-lg">{format(new Date(), 'd LLLL')}</div>
      </div>
      <div className="grid grid-cols-2 gap-48 px-20 pt-6">
        <div className="relative aspect-square">
          <Clock />
        </div>
        <div className="flex flex-col justify-center gap-16">
          <StockValues />
          <SIFNumber sif={sif} />
        </div>
      </div>
    </div>
  )
}
