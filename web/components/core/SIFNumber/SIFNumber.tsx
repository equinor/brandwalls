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
      <div className="text-10xl font-normal text-norwegian-woods-100">{sif}</div>
      <div className="mt-8 flex items-center">
        <SafetyHelmet className="me-20 h-auto w-[24%] text-slate-80" />
        <div>
          <div className="mt-14 text-6xl font-normal leading-tight">Seriuos incident frequency</div>
          {/*           <div className="text-2xl font-normal">frequency</div> */}
        </div>
      </div>
    </div>
  )
})
export default SIFNumber
