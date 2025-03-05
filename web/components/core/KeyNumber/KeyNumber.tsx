import SafetyHelmet from '@/icons/SafetyHelmet'
import { forwardRef, HTMLAttributes } from 'react'

export type KeyNumberProps = {
  keyNumber: string
  label: string
} & HTMLAttributes<HTMLDivElement>

export const KeyNumber = forwardRef<HTMLDivElement, KeyNumberProps>(function KeyNumber(
  { keyNumber, label, className = '', ...rest },
  ref,
) {
  return (
    <div ref={ref} className="flex h-full w-full flex-col justify-start p-4">
      <div className="text-6xl font-normal leading-none text-norwegian-woods-100">{keyNumber}</div>
      <div className="mt-4 max-w-[80%] text-2xl leading-planetary">{label}</div>
    </div>
  )
})
export default KeyNumber
