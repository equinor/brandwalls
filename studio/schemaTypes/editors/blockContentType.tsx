import { IconSubScript, IconSuperScript } from '../../icons'
import type { BlockDefinition } from 'sanity'
import { BiSolidColorFill } from 'react-icons/bi'
import { SubScriptRenderer, SuperScriptRenderer } from '../components/renderers'
import { defaultColors } from '../defaultColors'

export type BlockContentProps = {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  lists?: boolean
  highlight?: boolean
}

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
export const em = (px: number, base: number) => `${round(px / base)}em`

// H1 not allowed in block content since it should be a document title.
export const configureBlockContent = (options: BlockContentProps = {}): BlockDefinition => {
  const { h1 = true, h2 = true, h3 = true, h4 = true, lists = true, highlight = false } = options

  /** comment */
  const config: BlockDefinition = {
    type: 'block',
    name: 'block',
    lists: lists
      ? [
          { title: 'Numbered', value: 'number' },
          { title: 'Bullet', value: 'bullet' },
        ]
      : [],
    marks: {
      decorators: [
        // @TODO: Strong and Em are built in and not needed
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        {
          title: 'Sub',
          value: 'sub',
          icon: IconSubScript,
          component: SubScriptRenderer,
        },
        {
          title: 'Super',
          value: 'sup',
          icon: IconSuperScript,
          component: SuperScriptRenderer,
        },
        {
          title: 'Brand text color',
          value: 'highlight',
          icon: BiSolidColorFill,
          component: ({ children }: { children: React.ReactNode }) => {
            return <span style={{ color: defaultColors[8].value }}>{children}</span>
          },
        },
      ],
      annotations: [],
    },
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'Heading 1', value: 'h1' },
      { title: 'Heading 2', value: 'h2' },
      { title: 'Heading 3', value: 'h3' },
      { title: 'Heading 4', value: 'h4' },
      { title: 'Heading 5', value: 'h5' },
      { title: 'Heading 6', value: 'h6' },
    ],
  }

  type ReferenceType = {
    _ref: string
    _type: 'reference'
  }

  type ReferenceTarget = {
    type: string
  }

  return config
}

export default configureBlockContent()
