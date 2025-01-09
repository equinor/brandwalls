import FullscreenImage from '@/components/slides/FullscreenImage'
import InfoBoard from '@/components/slides/InfoBoard'
import { fullwidthImageText } from '@/sanity/lib/demo'
import fullWidthDemoImage from './img/temp/doggerBank.jpg'

export default async function Page() {
  return (
    <div className="h-full w-full">
      {/* <InfoBoard sif="0.4" /> */}
      <FullscreenImage content={fullwidthImageText} image={fullWidthDemoImage} credit="Photo: Einar Aslaksen | TRY" />
    </div>
  )
}
