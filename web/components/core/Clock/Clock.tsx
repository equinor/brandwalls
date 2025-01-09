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
      hourMarksWidth={10}
      hourMarksLength={10}
      hourHandWidth={8}
      minuteHandWidth={8}
      renderMinuteMarks={false}
    />
  )
})
export default Clock
