'use client'
import { useState, useEffect, useRef } from 'react'
import { Stock } from '../interfaces/models'
import StockCard from './StockCard'
import SearchInput from './SearchInput'
import getToken from '../hooks/getToken'

const StockList = () => {
  const [searchTicker, setSearchTicker] = useState('')
  const [stocksList, setStocksList] = useState<Stock[]>([])
  const [searchError, setSearchError] = useState(false)
  const [searchEqual, setSearchEqual] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchStockData = async (ticker: string) => {
    try {
      const tokenFetched = await getToken()
      const response = await fetch(
        `https://cotacao.onrender.com/stock/${ticker}`,
        {
          headers: {
            Authorization: tokenFetched,
          },
        },
      )
      const data = await response.json()

      if (!data.success) {
        setSearchError(true)
        return null
      }

      return {
        ticker,
        dataStock: {
          currentPrice: data.data['Actual Price'] || 0,
          industry: data.data['Industry'] || 'N/A',
          sector: data.data['Sector'] || 'N/A',
          grossMargin: data.data['Gross Margin'] || 0,
          netMargin: data.data['Net Margin'] || 0,
          priceEarning: data.data['P/E'] || 0,
          variation: data.data['Variation'] || 0,
        },
      } as Stock
    } catch (error) {
      console.error(`Error fetching stock ${ticker}: `, error)
      setSearchError(true)
      return null
    }
  }

  const handleSearch = async () => {
    if (!searchTicker) return

    if (stocksList.some((stock) => stock.ticker === searchTicker)) {
      setSearchEqual(true)
      return
    }

    setIsLoading(true)
    setSearchError(false)
    setSearchEqual(false)

    const newStock = await fetchStockData(searchTicker)

    if (newStock) {
      setStocksList((prev) => [...prev, newStock])
      setSearchTicker('')
      inputRef.current?.focus()
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const updateStocks = async () => {
      const updatedStocks = await Promise.all(
        stocksList.map(async (stock) => {
          const updatedStock = await fetchStockData(stock.ticker)
          return updatedStock || stock
        }),
      )
      setStocksList(updatedStocks.filter(Boolean) as Stock[])
    }

    if (stocksList.length > 0) {
      const interval = setInterval(updateStocks, 300000)
      return () => clearInterval(interval)
    }
  }, [stocksList])

  return (
    <div className="stock-list">
      <div className="search-container">
        <div className="search-input-container">
          <SearchInput
            ref={inputRef}
            value={searchTicker}
            onChange={setSearchTicker}
            error={searchError || searchEqual}
          />
          {searchError && (
            <span className="error-message">Ticker not found!</span>
          )}
          {searchEqual && (
            <span className="error-message">Ticker already consulted!</span>
          )}
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="search-button"
        >
          {isLoading ? <span className="loading-dots">Loading</span> : 'Search'}
        </button>
      </div>

      <div className="cards-grid">
        {stocksList.map((stock) => (
          <StockCard
            key={stock.ticker}
            ticker={stock.ticker}
            data={stock.dataStock}
          />
        ))}
      </div>
    </div>
  )
}

export default StockList
