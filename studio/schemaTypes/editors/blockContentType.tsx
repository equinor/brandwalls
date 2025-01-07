import { IconSubScript, IconSuperScript } from '../../icons'
import type { BlockDefinition } from 'sanity'
import { SubScriptRenderer, SuperScriptRenderer } from '../components'

import { strictExternal, warnHttpExternal, warnHttpOrNotValidSlugExternal } from '../validations/validateSlug'

export type BlockContentProps = {
  h2?: boolean
  h3?: boolean
  h4?: boolean
  lists?: boolean
  smallText?: boolean
  largeText?: boolean
  extraLargeText?: boolean
}

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
export const em = (px: number, base: number) => `${round(px / base)}em`

const SmallTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: '0.8rem' }}>{children}</span>
}
export const LargeTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: `${em(36, 16)}`, fontWeight: '600' }}>{children}</span>
}
export const ExtraLargeTextRender = (props: any) => {
  const { children } = props
  return <span style={{ fontSize: `${em(56, 16)}`, fontWeight: '600' }}>{children}</span>
}

// H1 not allowed in block content since it should be a document title.
export const configureBlockContent = (options: BlockContentProps = {}): BlockDefinition => {
  const {
    h2 = true,
    h3 = true,
    h4 = false,
    lists = true,
    largeText = false,
    extraLargeText = false,
    smallText = true,
  } = options

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
      ],
      annotations: [],
    },
  }

  const h2DefaultConfig = { title: 'Heading 2', value: 'h2' }
  const h3DefaultConfig = { title: 'Heading 3', value: 'h3' }
  const h4Config = { title: 'Heading 4', value: 'h4' }
  const smallTextConfig = {
    title: 'Small text',
    value: 'smallText',
    component: SmallTextRender,
  }
  const largeTextConfig = {
    title: 'Large text',
    value: 'largeText',
    component: LargeTextRender,
  }
  const extraLargeTextConfig = {
    title: 'Extra large text',
    value: 'extraLargeText',
    component: ExtraLargeTextRender,
  }

  type ReferenceType = {
    _ref: string
    _type: 'reference'
  }

  type ReferenceTarget = {
    type: string
  }

  if (h2) {
    config?.styles?.push(h2DefaultConfig)
  }

  if (h3) {
    config?.styles?.push(h3DefaultConfig)
  }

  if (h4) {
    config?.styles?.push(h4Config)
  }
  if (smallText) {
    config?.styles?.push(smallTextConfig)
  }
  if (largeText) {
    config?.styles?.push(largeTextConfig)
  }
  if (extraLargeText) {
    config?.styles?.push(extraLargeTextConfig)
  }

  return config
}

export default configureBlockContent()
