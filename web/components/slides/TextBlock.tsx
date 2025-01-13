import { PortableTextBlock } from 'next-sanity'
import Blocks from '../Blocks'

export type contentXAlignment = 'left' | 'center' | 'right'
export type contentYAlignment = 'top' | 'center' | 'bottom'
export type textAlignment = 'left' | 'center' | 'right'

export type textOptions = {
  textAlignment?: textAlignment
  contentXAlignment?: contentXAlignment
  contentYAlignment?: contentYAlignment
}

type TextBlockProps = {
  text: PortableTextBlock[]
  textOptions?: textOptions | undefined
}

export default function TextBlock({ text, textOptions }: TextBlockProps) {
  const xAlignment = {
    center: 'justify-center',
    right: 'justify-end',
    left: 'justify-start',
  }

  const yAlignment = {
    center: 'items-center',
    bottom: 'items-end',
    top: 'items-start',
  }
  const textX = {
    center: 'text-center',
    right: 'text-end',
    left: 'text-start',
  }

  return (
    <div className={`justify-left flex h-full w-full max-w-prose items-center text-balance p-12`}>
      {text && <Blocks value={text} className={`text-left`} />}
    </div>
  )
}
