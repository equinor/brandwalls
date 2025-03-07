import {ReactNode} from 'react'

type Props = {
  children: ReactNode
}

export const SubScriptRenderer = ({children}: Props) => <sub>{children}</sub>

export const SuperScriptRenderer = ({children}: Props) => <sup>{children}</sup>

export const StrikeThroughRenderer = ({children}: Props) => <s>{children}</s>
