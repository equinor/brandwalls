import { PortableTextBlock } from 'next-sanity'
import Blocks from '../Blocks'
import { TextOptions } from '@/sanity.types'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

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
    return parseInt(screen, 10) === parseInt(v, 10)
  })

const getColumnUtility = (screen: string, hasAdjacentScreen: boolean) => {
  if (arrayIncludesScreen(FirstColumnScreens, screen)) {
    return `col-start-1 ${hasAdjacentScreen ? 'col-end-3' : 'col-end-2'}`
  }
  if (arrayIncludesScreen(SecondColumnScreens, screen)) {
    return `col-start-2 ${hasAdjacentScreen ? 'col-end-4' : 'col-end-2'}`
  }
  if (arrayIncludesScreen(ThirdColumnScreens, screen)) {
    return `col-start-3 ${hasAdjacentScreen ? 'col-end-5' : 'col-end-3'}`
  }
  if (arrayIncludesScreen(FourthColumnScreens, screen)) {
    return 'col-start-4 col-end-5'
  }
}
const getRowUtility = (screen: string, hasAdjacentScreen: boolean) => {
  if (arrayIncludesScreen(FirstRowScreens, screen)) {
    return `row-start-1 ${hasAdjacentScreen ? 'row-end-3' : 'row-end-2'}`
  }
  if (arrayIncludesScreen(SecondRowScreens, screen)) {
    return `row-start-2 ${hasAdjacentScreen ? 'row-end-4' : 'row-end-2'}`
  }
  if (arrayIncludesScreen(ThirdRowScreens, screen)) {
    return `row-start-3 ${hasAdjacentScreen ? 'row-end-5' : 'row-end-3'}`
  }
  if (arrayIncludesScreen(FourthRowScreens, screen)) {
    return 'row-start-4 row-end-4'
  }
}

export default function TextBlock({ text, textOptions }: TextBlockProps) {
  const { useLight, applyGradient, screens, textAlignment } = textOptions || {}

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
    return sortedScreens?.length > 1 ? true : false
  }, [sortedScreens])
  const hasAdjacentRow = useMemo(() => {
    return sortedScreens?.length > 1 ? (hasAdjacentColumn ? false : true) : false
  }, [sortedScreens, hasAdjacentColumn])

  const getTextAlignX = () => {
    switch (String(textAlignment)) {
      case 'right':
        return 'text-right'
      case 'center':
        return 'text-center'
      case 'left':
      default:
        return 'text-left'
    }
  }

  const getPlacement = (screen: string, hasAdjacentColumnScreen: boolean, hasAdjacentRowScreen: boolean) => {
    const x = getColumnUtility(screen, hasAdjacentColumnScreen) ?? 'col-start-2 col-end-2'
    const y = getRowUtility(screen, hasAdjacentRowScreen) ?? 'row-start-2 row-end-2'
    return { x, y }
  }

  const getPosition = () => {
    //Restricted in studio to only 2
    if (sortedScreens?.length <= 1) {
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
    const usesFirstColumn = FirstColumnScreens.some((fcs: string) => {
      return parseInt(fcs, 10) === parseInt(sortedScreens[0], 10)
    })
    const usesLastColumn = FourthColumnScreens.some((fcs: string) => {
      return parseInt(fcs, 10) === parseInt(sortedScreens[0], 10)
    })
    const usesFirstRow = FirstRowScreens.some((fcs: string) => {
      return parseInt(fcs, 10) === parseInt(sortedScreens[0], 10)
    })
    const usesLastRow = FourthRowScreens.some((fcs: string) => {
      return parseInt(fcs, 10) === parseInt(sortedScreens[0], 10)
    })

    const padding = twMerge(
      `ps-2xl pe-2xl pt-2xl pb-2xl`,
      `${usesFirstColumn ? 'ps-4xl' : ''} 
      ${usesLastColumn ? 'pe-4xl' : ''}
       ${usesFirstRow ? 'pt-4xl' : ''} 
       ${usesLastRow ? 'pb-4xl' : ''}`,
    )
    return padding
  }

  const getGradient = () => {
    const leftColumns = sortedScreens.some((screen: string) => {
      return FirstColumnScreens?.includes(screen) || SecondColumnScreens?.includes(screen)
    })
    const rightColumns = sortedScreens.some((screen: string) => {
      return ThirdColumnScreens?.includes(screen) || FourthColumnScreens?.includes(screen)
    })
    const topColumns = sortedScreens.some((screen: string) => {
      return FirstRowScreens?.includes(screen)
    })
    const bottomColumns = sortedScreens.some((screen: string) => {
      return FourthRowScreens?.includes(screen)
    })
    let grad = ``
    if (leftColumns) {
      grad = useLight ? `black-right-gradient` : `white-right-gradient`
    }
    if (rightColumns) {
      grad = useLight ? `black-left-gradient` : `white-left-gradient`
    }
    if (topColumns) {
      grad = useLight ? `black-top-gradient` : `white-top-gradient`
    }
    if (bottomColumns) {
      grad = useLight ? `black-bottom-gradient` : `white-bottom-gradient`
    }
    return grad
  }

  return (
    <div
      className={`${useLight ? 'dark' : ''} grid h-full w-full grid-cols-4 grid-rows-4 ${applyGradient ? getGradient() : ''}`}
    >
      {text && (
        <Blocks
          value={text}
          className={`h-full w-full ${hasAdjacentColumn ? 'max-w-[50vw]' : 'max-w-[25vw]'} ${hasAdjacentRow ? 'max-h-[50vw]' : 'max-h-[25vh]'} ${getPosition().x} ${getPosition().y} ${getPadding()} ${getTextAlignX()} text-balance`}
        />
      )}
    </div>
  )
}
