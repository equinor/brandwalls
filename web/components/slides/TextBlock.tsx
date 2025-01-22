import { PortableTextBlock } from 'next-sanity'
import Blocks from '../Blocks'
import { TextOptions } from '@/sanity.types'
import { useMemo } from 'react'

type TextBlockProps = {
  text: PortableTextBlock[]
  textOptions?: TextOptions
}

const FirstColumnScreens = ['1', '5', '9', '13']
const SecondColumnScreens = ['2', '6', '10', '14']
const ThirdColumnScreens = ['3', '7', '11', '15']
const FourthColumnScreens = ['4', '8', '12', '16']
const FirstRowScreens = ['1', '2', '3', '4']
const SecondRowScreens = ['5', '6', '7', '8']
const ThirdRowScreens = ['9', '10', '11', '12']
const FourthRowScreens = ['13', '14', '15', '16']

const arrayIncludesScreen = (arr: string[], screen: string) =>
  arr.some((v) => {
    return parseInt(screen, 10) == parseInt(v, 10)
  })

const getColumnUtility = (screen: string, hasAdjacentScreen: boolean) => {
  if (arrayIncludesScreen(FirstColumnScreens, screen)) {
    return `col-start-1 ${hasAdjacentScreen ? 'col-end-2' : 'col-end-1'}`
  }
  if (arrayIncludesScreen(SecondColumnScreens, screen)) {
    return `col-start-2 ${hasAdjacentScreen ? 'col-end-3' : 'col-end-2'}`
  }
  if (arrayIncludesScreen(ThirdColumnScreens, screen)) {
    return `col-start-3 ${hasAdjacentScreen ? 'col-end-4' : 'col-end-3'}`
  }
  if (arrayIncludesScreen(FourthColumnScreens, screen)) {
    return 'col-start-4 col-end-4'
  }
}
const getRowUtility = (screen: string, hasAdjacentScreen: boolean) => {
  if (arrayIncludesScreen(FirstRowScreens, screen)) {
    return `row-start-1 ${hasAdjacentScreen ? 'row-end-2' : 'row-end-1'}`
  }
  if (arrayIncludesScreen(SecondRowScreens, screen)) {
    return `row-start-2 ${hasAdjacentScreen ? 'row-end-3' : 'row-end-2'}`
  }
  if (arrayIncludesScreen(ThirdRowScreens, screen)) {
    return `row-start-3 ${hasAdjacentScreen ? 'row-end-4' : 'row-end-3'}`
  }
  if (arrayIncludesScreen(FourthRowScreens, screen)) {
    return 'row-start-4 row-end-4'
  }
}

export default function TextBlock({ text, textOptions }: TextBlockProps) {
  const { screens, textAlignment } = textOptions

  const sortedScreens = useMemo(
    () =>
      screens
        ? screens?.sort(function (a: string, b: string) {
            return Number(a) - Number(b)
          })
        : ['5'],
    [screens],
  )
  //Restricted in studio to only 2
  const hasAdjacentColumn = useMemo(() => {
    return sortedScreens?.length > 1 ? String(sortedScreens[1]) === String(sortedScreens[0] + 1) : false
  }, [sortedScreens])
  const hasAdjacentRow = useMemo(() => {
    return sortedScreens?.length > 1 ? (hasAdjacentColumn ? false : true) : false
  }, [sortedScreens, hasAdjacentColumn])

  const textX: Record<string, string> = {
    center: 'text-center',
    right: 'text-end',
    left: 'text-start',
  }

  const getPlacement = (screen: string, hasAdjacentColumnScreen: boolean, hasAdjacentRowScreen: boolean) => {
    const x = getColumnUtility(screen, hasAdjacentColumnScreen) ?? 'col-start-2 col-end-2'
    const y = getRowUtility(screen, hasAdjacentRowScreen) ?? 'row-start-2 row-end-2'
    return { x, y }
  }

  const getPosition = () => {
    //Restricted in studio to only 2
    if (screens?.length <= 1) {
      return getPlacement(sortedScreens[0], false, false)
    } else {
      // if adjacent screen is on next column
      if (hasAdjacentColumn) {
        return getPlacement(sortedScreens[0], true, false)
      } else {
        //then it must be next row
        return getPlacement(sortedScreens[0], false, true)
      }
    }
  }

  const getPadding = () => {
    const usesFirstColumn = FirstColumnScreens.includes(sortedScreens[0])
    const usesLastColumn = FourthColumnScreens.includes(sortedScreens[0])
    const usesFirstRow = FirstRowScreens.includes(sortedScreens[0])
    const usesLastRow = FourthRowScreens.includes(sortedScreens[0])
    return `${usesFirstColumn ? 'ps-12' : ''} ${usesLastColumn ? 'pe-12' : ''} 
    ${usesFirstRow ? 'pt-12' : ''} ${usesLastRow ? 'pb-12' : ''}`
  }

  return (
    <div
      className={`grid h-full w-full grid-cols-4 grid-rows-4 ${hasAdjacentColumn || hasAdjacentRow ? 'items-start justify-start' : 'items-center justify-center'}`}
    >
      {text && (
        <Blocks
          value={text}
          className={` ${hasAdjacentColumn ? 'max-w-[50vw]' : 'max-w-[25vw]'} ${hasAdjacentRow ? 'max-h-[50vw]' : 'max-h-[25vh]'} ${getPosition().x} ${getPosition().y} ${getPadding()} ${textX[textAlignment ?? 'left']} text-balance`}
        />
      )}
    </div>
  )
}
