import SafetyHelmet from '@/icons/SafetyHelmet'
import { forwardRef, HTMLAttributes } from 'react'

export type SIFNumberProps = {
  sif: string
} & HTMLAttributes<HTMLDivElement>

export const SIFNumber = forwardRef<HTMLDivElement, SIFNumberProps>(function SIFNumber(
  { sif, className = '', ...rest },
  ref,
) {
  return (
    <div ref={ref}>
      <div className="text-8xl font-normal text-norwegian-woods-100">{sif}</div>
      <div className="flex items-center gap-6">
        <SafetyHelmet className="h-fit w-auto scale-90 text-slate-80" />
        <div>
          <div className="text-lg font-medium leading-tight">Seriuos incident</div>
          <div className="text-lg font-medium">frequency</div>
        </div>
      </div>
    </div>
  )
})
export default SIFNumber
