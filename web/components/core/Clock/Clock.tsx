'use client'

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react'

export type ClockProps = HTMLAttributes<HTMLDivElement>

export const Clock = forwardRef<HTMLDivElement, ClockProps>(function Clock({ className = '', ...rest }, ref) {
  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date()
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const convertToTwoDigit = (number: number) => {
    return number.toLocaleString('en-GB', {
      minimumIntegerDigits: 2,
    })
  }

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-1 text-10xl text-norwegian-woods-100">
      <div className="flex h-full w-full items-center justify-end px-2 py-4">{convertToTwoDigit(time.hours)}:</div>
      <div className="flex items-center justify-start px-2 py-4">{convertToTwoDigit(time.minutes)}</div>
    </div>
  )
})
export default Clock
