'use client'

import { format } from 'date-fns'

import { KeyNumber } from '../core/KeyNumber/KeyNumber'
import StockValues from '../core/StockValues/StockValues'
import { Clock } from '../core/Clock/Clock'
import Data from '@/icons/Data'
import SafetyHelmet from '@/icons/SafetyHelmet'

type InfoBoardProps = {
  sif: string
  trif: string
}

/* Check if date need a interval timer each day or if it gets rerendered because of clock*/
export default function InfoBoard({ sif, trif }: InfoBoardProps) {
  return (
    <div className="grid h-full w-full grid-cols-4 grid-rows-4">
      <div className="col-start-1 col-end-3 row-start-2 row-end-3">
        <Clock />
      </div>
      <div className="col-start-1 col-end-3 row-span-2 grid grid-cols-2 grid-rows-1">
        <div className="col-start-2 col-end-3 px-2 py-4 text-2xl tracking-widest" suppressHydrationWarning>
          <div>{format(new Date(), 'EEEE')}</div>
          <div>{format(new Date(), ' d LLLL')}</div>
          <div>{format(new Date(), 'yyyy')}</div>
        </div>
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-5 grid h-full w-full grid-cols-1 grid-rows-4">
        <div className="flex h-full w-full items-end justify-start px-2 py-4">
          <div className="relative h-2/3 w-2/3">
            <div className="h-full w-full">
              <Data className="text-norwegian-woods-100" />
            </div>
          </div>
        </div>
        <StockValues />
      </div>
      <div className="col-start-4 col-end-5 row-start-1 row-end-5 grid h-full w-full grid-cols-1 grid-rows-4">
        <div className="flex h-full w-full items-end justify-start px-2 py-4">
          <div className="relative h-2/3 w-2/3">
            <SafetyHelmet className="h-full w-full text-norwegian-woods-100" />
          </div>
        </div>
        <KeyNumber keyNumber={sif} label="Serious incident frequency (SIF)" />
        <KeyNumber keyNumber={trif} label="Total recordable incident frequency (TRIF)" />
      </div>
    </div>
  )
}
