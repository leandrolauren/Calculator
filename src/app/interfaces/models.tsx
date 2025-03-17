export interface Stock {
    ticker: string;
    dataStock: {
        currentPrice: number;
        industry: string;
        sector: string;
        grossMargin: number;
        netMargin: number;
        priceEarning: number;
        variation: number;
    };
}

export interface StockData {
  currentPrice?: number;
  industry?: string;
  sector?: string;
  grossMargin?: number;
  netMargin?: number;
  priceEarning?: number;
  variation?: number;
  currency?: string;
  lastUpdated?: string;
}

export interface StockHistoryItem {
  date: string;
  close: number;
}

export interface Pagination {
  total_pages: number;
  current_page: number;
}

export interface ApiResponse {
  data: StockHistoryItem[];
  pagination: Pagination;
}

export interface StockCardProps {
  ticker?: string;
  data?: Partial<StockData>;
}