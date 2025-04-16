'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { StockHistoryItem, ApiResponse } from '../interfaces/models'

const getToken = async () => {
  const token = Cookies.get('authToken')
  if (!token) {
    throw new Error('User is not authenticated')
  }
  return token
}

export const useStockHistory = (ticker: string) => {
  const [historyData, setHistoryData] = useState<StockHistoryItem[] | null>(
    null,
  )
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)

  useEffect(() => {
    if (!ticker) return

    const fetchData = async () => {
      const token = await getToken()
      setIsLoadingHistory(true)
      let allData: StockHistoryItem[] = []
      let page = 1
      let totalPages = 1

      try {
        do {
          const response = await axios.get<ApiResponse>(
            'https://cotacao.onrender.com/history',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                ticker: ticker,
                days: 365,
                page: page,
              },
            },
          )

          allData = [...allData, ...response.data.data]
          totalPages = response.data.pagination.total_pages
          page++
        } while (page <= totalPages)

        setHistoryData(allData)
      } catch (error) {
        console.error('Error fetching stock history:', error)
        setHistoryData(null)
      } finally {
        setIsLoadingHistory(false)
      }
    }

    fetchData()
  }, [ticker])

  return {
    historyData: historyData || [],
    isLoadingHistory,
  }
}
