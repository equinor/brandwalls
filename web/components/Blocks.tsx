/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PortableText, PortableTextProps, type PortableTextBlock } from 'next-sanity'
import { twMerge } from 'tailwind-merge'

type TypeProps = {
  children?: React.ReactNode
}

const defaultSerializers = {
  block: {
    smallText: ({ children }: TypeProps) => <p className="text-sm">{children}</p>,
    largeText: ({ children }: TypeProps) => <p className="text-2xl leading-snug">{children}</p>,
    extraLargeText: ({ children }: TypeProps) => {
      return <p className={`text-4xl font-medium leading-planetary lg:text-5xl 2xl:text-8xl`}>{children}</p>
    },
  },
  marks: {
    sub: ({ children }: TypeProps) => <sub>{children}</sub>,
    sup: ({ children }: TypeProps) => <sup>{children}</sup>,
    s: ({ children }: TypeProps) => <s>{children}</s>,
    highlight: ({ children }: TypeProps) => <span className="text-energy-red-100">{children}</span>,
  },
}

export type BlockProps = {
  className?: string
} & PortableTextProps

const inlineBlockTypes = ['block']

//@ts-ignore
export default function Blocks({ value, components, className = '' }: BlockProps) {
  let div: PortableTextBlock[] = []
  return (
    <>
      {//@ts-ignore
      value?.map((block: PortableTextBlock, i: number, blocks: PortableTextBlock[]) => {
        // Normal text blocks (p, h1, h2, etc.) — these are grouped so we can wrap them in a prose div
        if (inlineBlockTypes.includes(block._type)) {
          div.push(block)

          // If the next block is also text/pullQuote, group it with this one
          if (inlineBlockTypes.includes(blocks[i + 1]?._type)) return null

          // Otherwise, render the group of text blocks we have
          const value = div
          div = []

          return (
            <div key={block._key} className={twMerge(`prose dark:prose-invert`, className)}>
              <PortableText
                value={value}
                //@ts-ignore
                components={{
                  block: {
                    ...defaultSerializers.block,
                  },
                  marks: {
                    ...defaultSerializers.marks,
                  },
                }}
              />
            </div>
          )
        } else {
          // Non-text blocks (modules, sections, etc.) — note that these can recursively render text
          // blocks again
          return (
            <PortableText
              key={block._key}
              value={block}
              components={{
                ...components,
              }}
            />
          )
        }
      })}
    </>
  )
}
