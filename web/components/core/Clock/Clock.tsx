'use client'

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import ReactClock from 'react-clock'

export type ClockProps = HTMLAttributes<HTMLDivElement>

export const Clock = forwardRef<HTMLDivElement, ClockProps>(function Clock({ className = '', ...rest }, ref) {
  const [value, setValue] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <ReactClock
      value={value}
      size="100%"
      hourMarksWidth={4}
      hourMarksLength={4}
      hourHandWidth={16}
      minuteHandWidth={16}
      renderMinuteMarks={false}
    />
  )
})
export default Clock
