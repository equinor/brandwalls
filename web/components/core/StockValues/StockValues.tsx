import useSWR from 'swr'
import * as xml2js from 'xml2js'
import { format } from 'date-fns'

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

const StockValues = ({}: {}) => {
  const { data, error } = useSWR(ENDPOINT, fetchData, { refreshInterval: 60000 })

  if (error) {
    console.error('An error occured while fetching stock values: ', error)
    return null
  }

  if (!data) return null

  const getTemplate = (price: string, currency: string, change: string, title: string, date: Date) => {
    return (
      <div className="flex h-full w-full flex-col items-start justify-start p-4">
        <div className="flex items-baseline gap-1 *:leading-none">
          <div className="text-6xl font-normal text-norwegian-woods-100">{price}</div>
          <div className="text-3xl font-normal">{currency}</div>
        </div>
        <div className="text-xl">{change}%</div>
        <h2 className="mt-4 text-2xl font-normal">{title}</h2>
        <div className="text-xl font-normal">{format(new Date(date), 'd LLLL yyyy hh:mm (z)')}</div>{' '}
      </div>
    )
  }

  return (
    <>
      {getTemplate(data.OSE?.Quote, data.OSE?.currency, data.OSE.PctChange, data.OSE?.title, data.OSE?.Date)}
      {getTemplate(data.NYSE?.Quote, data.NYSE?.currency, data.NYSE.PctChange, data.NYSE?.title, data.NYSE?.Date)}
    </>
  )
}

export default StockValues
