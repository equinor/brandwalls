import useSWR from 'swr'
import * as xml2js from 'xml2js'
import { format } from 'date-fns'
import { CircularProgress } from '@equinor/eds-core-react'

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
  const { data, error, isLoading } = useSWR(ENDPOINT, fetchData, { refreshInterval: 60000 })

  if (error) {
    console.error('An error occured while fetching stock values: ', error)
  }

  const getOSETemplate = (price: string, currency: string, change: string, title: string, date: Date) => {
    return (
      <div className="flex h-full w-full flex-col items-start justify-start p-4">
        <div className="flex items-baseline gap-1 *:leading-none">
          <div className="text-6xl font-normal text-norwegian-woods-100">
            {isLoading ? (
              <div className="translate-x-6 scale-[2.5]">
                <CircularProgress size={48} />
              </div>
            ) : (
              <>{error || !data?.OSE ? '---' : price}</>
            )}
          </div>
          <div className="text-2xl font-normal">{isLoading || error || !data ? '' : currency}</div>
        </div>
        <div className="text-xl font-light">{isLoading || error || !data ? '' : `${change}%`}</div>
        <h2 className="mt-4 text-xl font-normal">
          {isLoading || error || !data ? 'Oslo Stock Exchange (OSE)' : title}
        </h2>
        <div className="text-lg font-normal">
          {isLoading || error || !data ? '' : format(new Date(date), 'd LLLL yyyy hh:mm (z)')}
        </div>
      </div>
    )
  }
  const getNYSETemplate = (price: string, currency: string, change: string, title: string, date: Date) => {
    return (
      <div className="flex h-full w-full flex-col items-start justify-start p-4">
        <div className="flex items-baseline gap-1 *:leading-none">
          <div className="text-6xl font-normal text-norwegian-woods-100">
            {isLoading ? (
              <div className="translate-x-6 scale-[2.5]">
                <CircularProgress size={48} />
              </div>
            ) : (
              <>{error || !data?.NYSE ? '---' : price}</>
            )}
          </div>
          <div className="text-2xl font-normal">{isLoading || error || !data ? '' : currency}</div>
        </div>
        <div className="text-xl font-light">{isLoading || error || !data ? '' : `${change}%`}</div>
        <h2 className="mt-4 text-xl font-normal">
          {isLoading || error || !data ? 'New York Stock Exchange (NYSE)' : title}
        </h2>
        <div className="text-lg font-normal">
          {isLoading || error || !data ? '' : format(new Date(date), 'd LLLL yyyy hh:mm (z)')}
        </div>
      </div>
    )
  }

  return (
    <>
      {getOSETemplate(data?.OSE?.Quote, data?.OSE?.currency, data?.OSE.PctChange, data?.OSE?.title, data?.OSE?.Date)}
      {getNYSETemplate(
        data?.NYSE?.Quote,
        data?.NYSE?.currency,
        data?.NYSE.PctChange,
        data?.NYSE?.title,
        data?.NYSE?.Date,
      )}
    </>
  )
}

export default StockValues
