'use client';

import { useState, useEffect } from 'react';
import { useStockHistory } from '../hooks/useStockHistory';
import type { StockData } from '../interfaces/interface';
import dynamic from 'next/dynamic';
import { Chart, registerables } from 'chart.js';
import type { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import LoadingSpinner from './LoadingSpinner';

Chart.register(...registerables, ChartDataLabels);

interface StockHistoryItem {
  date: string;
  close: number;
}

interface StockCardProps {
  ticker?: string;
  data?: Partial<StockData>;
}

const Line = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Line),
  { 
    ssr: false,
    loading: () => <div className="chart-loading"><LoadingSpinner /></div>
  }
);

const StockCard = ({ ticker = '', data = {} }: StockCardProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [chartKey, setChartKey] = useState(Date.now());
  const { historyData, isLoadingHistory } = useStockHistory(ticker);
  
  useEffect(() => {
    if(showHistory) setChartKey(Date.now());
  }, [showHistory]);

  const safeHistoryData = historyData || [];
  
  const {
    currentPrice = 0,
    industry = '',
    sector = '',
    grossMargin = 0,
    netMargin = 0,
    priceEarning = 0,
    variation = 0
  } = data;

  const chartData = {
    labels: safeHistoryData.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Preço de Fechamento',
        data: safeHistoryData.map((item) => item.close),
        borderColor: 'rgba(88, 207, 187, 0.8)',
        backgroundColor: 'rgba(88, 207, 187, 0.1)',
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 5,
        borderWidth: 2
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500,
      easing: 'easeInOutQuad' 
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: true,
        grid: { color: 'rgba(255, 255, 255, 0.41)' },
        ticks: { 
          color: '#ccc',
          callback: (value) => `$${Number(value).toFixed(2)}`
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(250, 249, 249, 0.8)',
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: $${value.toFixed(2)}`;
          }
        }
      },
      datalabels: { display: false }
    }, elements: {
        point: {
        radius: 0, 
        hoverRadius: 5 
    }
    }
  };

  const getValueStyle = (value: number) => 
    value >= 0 ? 'positive' : 'negative';

  return (
    <div className="stock-card">
      <div className="card-actions">
        <button 
          className="history-button"
          onClick={() => setShowHistory(!showHistory)}
          aria-label={showHistory ? 'Ocultar histórico' : 'Mostrar histórico'}
        >
          {showHistory ? 'Ocultar Histórico' : 'Mostrar Histórico'}
        </button>
      </div>

      <div className="stock-header">
        <h3>{ticker || 'N/A'}</h3>
        <span className="price">${currentPrice.toFixed(2)}</span>
      </div>

      <div className="stock-info">
        {[
          { label: 'Indústria', value: industry },
          { label: 'Setor', value: sector },
          { 
            label: 'Margem Bruta', 
            value: `${grossMargin >= 0 ? '+' : ''}${grossMargin.toFixed(2)}%`,
            style: getValueStyle(grossMargin)
          },
          { 
            label: 'Margem Líquida', 
            value: `${netMargin >= 0 ? '+' : ''}${netMargin.toFixed(2)}%`,
            style: getValueStyle(netMargin)
          },
          { 
            label: 'P/L', 
            value: priceEarning.toFixed(2)
          },
          { 
            label: 'Variação', 
            value: `${variation >= 0 ? '+' : ''}${variation.toFixed(2)}%`,
            style: getValueStyle(variation)
          }
        ].map((item, index) => (
          <div key={index} className="info-item">
            <span>{item.label}</span>
            <span className={item.style || ''}>
              {item.value || 'N/A'}
            </span>
          </div>
        ))}
      </div>

      {showHistory && (
        <div className="chart-container" style={{ height: '400px', position: 'relative' }}>
          {isLoadingHistory ? (
            <div className="chart-loading">
              <LoadingSpinner />
              <p>Carregando histórico...</p>
            </div>
          ) : (
            <>
              {safeHistoryData.length > 0 ? (
                <Line
                  key={chartKey}
                  data={chartData}
                  options={chartOptions}
                  plugins={[ChartDataLabels]}
                  data-testid="stock-chart"
                />
              ) : (
                <div className="chart-empty">
                  Nenhum dado histórico disponível
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StockCard;