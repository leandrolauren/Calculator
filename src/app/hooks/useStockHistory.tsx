'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { StockHistoryItem, ApiResponse } from "../interfaces/models";

export const useStockHistory = (ticker: string) => {
  const [historyData, setHistoryData] = useState<StockHistoryItem[] | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      setIsLoadingHistory(true);
      let allData: StockHistoryItem[] = [];
      let page = 1;
      let totalPages = 1;

      try {
        do {
          const response = await axios.get<ApiResponse>('https://cotacao.onrender.com/history', {
            params: {
              ticker: ticker,
              days: 365,
              page: page
            }
          });

          allData = [...allData, ...response.data.data];
          totalPages = response.data.pagination.total_pages;
          page++;
        } while (page <= totalPages);

        setHistoryData(allData);
      } catch (error) {
        console.error('Error fetching stock history:', error);
        setHistoryData(null);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchData();
  }, [ticker]);

  return { 
    historyData: historyData || [], 
    isLoadingHistory 
  };
};