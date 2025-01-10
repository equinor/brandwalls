import useSWR from 'swr'
import * as xml2js from 'xml2js'
import { twMerge } from 'tailwind-merge'
import Data from '@/icons/Data'
import { format } from 'date-fns'
import ArrowRight from '@/icons/ArrowRight'

const fetchData = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    const error = new Error('An error occurred while fetching StockValues data.')
    throw error
  }

  try {
    const textResponse = await response.text()
    const parser = new xml2js.Parser({ explicitArray: false })
    const parsed = await parser.parseStringPromise(textResponse)

    const stockData = parsed.EuroInvestorQuotes.data

    const OSE = {
      ...stockData.filter((i: any) => i.RicCode === 'EQNR.OSL')[0],
      title: 'Oslo Stock Exchange (OSE)',
      currency: 'NOK',
    }
    const NYSE = {
      ...stockData.filter((i: any) => i.RicCode === 'EQNR.NYSE')[0],
      title: 'New York Stock Exchange (NYSE)',
      currency: 'USD',
    }

    return { OSE, NYSE }
  } catch (error) {
    throw new Error('An error occurred while parsing StockValues data.')
  }
}

const ENDPOINT = `https://tools.eurolandir.com/tools/pricefeed/xmlirmultiiso5.aspx?companyid=9053`

const StockValues = ({ className }: { className?: string }) => {
  const { data, error } = useSWR(ENDPOINT, fetchData, { refreshInterval: 60000 })

  if (error) {
    console.error('An error occured while fetching stock values: ', error)
    return null
  }

  if (!data) return null

  const getTemplate = (price: string, currency: string, change: string, title: string, date: Date) => {
    return (
      <>
        <div className="grid grid-cols-[1fr_max-content] items-baseline gap-12">
          <div className="flex items-baseline gap-1">
            <div className="text-8xl font-normal text-norwegian-woods-100">{price}</div>
            <div className="text-lg font-normal text-grey-60">{currency}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-lg">{change}%</div>
            <ArrowRight className={`-mt-1 scale-150 ${Number(change) < 0 ? 'rotate-90' : '-rotate-90'}`} />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Data className="h-fit w-auto scale-75 text-slate-80" />
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <div>
              <div className="text-base font-normal">{format(new Date(date), 'd LLLL yyyy hh:mm (z)')}</div>{' '}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={twMerge(`flex flex-col gap-16`, className)}>
      <div>{getTemplate(data.OSE?.Quote, data.OSE?.currency, data.OSE.PctChange, data.OSE?.title, data.OSE?.Date)}</div>
      <div>
        {getTemplate(data.NYSE?.Quote, data.NYSE?.currency, data.NYSE.PctChange, data.NYSE?.title, data.NYSE?.Date)}
      </div>
    </div>
  )
}

export default StockValues
