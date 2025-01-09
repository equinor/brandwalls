import FullscreenImage from '../slides/FullscreenImage'
import InfoBoard from '../slides/InfoBoard'

const componentMap: { [key: string]: React.ComponentType<any> } = {
  fullWidthImage: FullscreenImage,
  infoBoard: InfoBoard,
}

export default function SectionMapper({ section }: { section?: any }) {
  const type = section?.content?.[0]
  const Component = componentMap[type?.type]
  if (!Component) {
    // Fallback for unknown section types to debug
    return <div data-type={type} key={type?.id} />
  }
  return <Component {...type} key={type?.id} />
}
