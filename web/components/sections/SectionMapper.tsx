import FullscreenImage from '../slides/FullscreenImage'
import FullscreenVideo from '../slides/FullscreenVideo'
import InfoBoard from '../slides/InfoBoard'
import TextBlock from '../slides/TextBlock'
import TestSlide from '../slides/TestSlide'
import Event from '../slides/Event'

const componentMap: { [key: string]: React.ComponentType<any> } = {
  fullWidthImage: FullscreenImage,
  fullWidthVideo: FullscreenVideo,
  infoBoard: InfoBoard,
  textBlock: TextBlock,
  testSlide: TestSlide,
  event: Event,
}

export default function SectionMapper({ section }: { section?: any }) {
  const type = section?.content?.[0]
  const Component = componentMap[type?.type]
  if (!Component) {
    return <div data-type={type} key={type?.id} />
  }
  return <Component {...type} key={type?.id} />
}
