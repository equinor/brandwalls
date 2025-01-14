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
  console.log('textOptions', textOptions)
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
    <div
      className={`flex h-full w-full ${xAlignment[textOptions?.contentXAlignment ?? 'left']} ${yAlignment[textOptions?.contentYAlignment ?? 'center']} text-balance p-12`}
    >
      {text && <Blocks value={text} className={`*:max-w-[34em] ${textX[textOptions?.textAlignment ?? 'left']}`} />}
    </div>
  )
}
