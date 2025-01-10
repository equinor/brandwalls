import FullscreenImage from '../slides/FullscreenImage'
import FullscreenVideo from '../slides/FullscreenVideo'
import InfoBoard from '../slides/InfoBoard'
import TextBlock from '../slides/TextBlock'

const componentMap: { [key: string]: React.ComponentType<any> } = {
  fullWidthImage: FullscreenImage,
  fullWidthVideo: FullscreenVideo,
  infoBoard: InfoBoard,
  textBlock: TextBlock,
}

export default function SectionMapper({ section }: { section?: any }) {
  const type = section?.content?.[0]
  console.log('type', type)
  const Component = componentMap[type?.type]
  if (!Component) {
    // Fallback for unknown section types to debug
    return <div data-type={type} key={type?.id} />
  }
  return <Component {...type} key={type?.id} />
}
