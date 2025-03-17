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