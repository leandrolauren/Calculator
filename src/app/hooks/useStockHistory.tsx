'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { StockHistoryItem, ApiResponse } from '../interfaces/models'

export const useStockHistory = (ticker: string) => {
  const [historyData, setHistoryData] = useState<StockHistoryItem[] | null>(
    null,
  )
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const isFetching = useRef(false) // Prevent duplicate execution

  useEffect(() => {
    if (!ticker || isFetching.current) return

    const fetchData = async () => {
      isFetching.current = true // Mark as fetching

      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('access_token='))
          ?.split('=')[1]
        const tokenType = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token_type='))
          ?.split('=')[1]

        setIsLoadingHistory(true)
        let allData: StockHistoryItem[] = []
        let page = 1
        const maxPages = 4 // Limit to 4 pages (400 records)

        while (page <= maxPages) {
          const response = await axios.get<ApiResponse>(
            'https://cotacao.onrender.com/history',
            {
              headers: {
                Authorization: `${tokenType} ${token}`,
              },
              params: {
                ticker: ticker,
                days: 365,
                page: page,
              },
            },
          )

          allData = [...allData, ...response.data.data]
          if (page >= response.data.pagination.total_pages) break
          page++
        }

        setHistoryData(allData)
      } catch (error) {
        console.error('Error fetching stock history:', error)
        setHistoryData(null)
      } finally {
        setIsLoadingHistory(false)
        isFetching.current = false // Reset fetching state
      }
    }

    fetchData()
  }, [ticker])

  return {
    historyData: historyData || [],
    isLoadingHistory,
  }
}
