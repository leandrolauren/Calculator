'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Loading from '../components/Loading';

// Carregamento dinâmico com fallback de loading
const StockList = dynamic(() => import('../components/StockList'), {
  ssr: false,
  loading: () => <Loading />
});

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  .search-container {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .search-button {
    background: #0070f3;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;
    height: 50px;

    &:hover {
      background: #0051a2;
      transform: translateY(-1px);
    }

    &:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
  }

  .error-messages {
    position: absolute;
    bottom: -25px;
    left: 0;
    color: #ff4444;
    font-size: 0.9rem;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
  }

  .loading-dots {
    &::after {
      content: '.';
      animation: dots 1.5s infinite;
    }
  }

  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80%, 100% { content: ''; }
  }
`;

export default function Stock() {
  return (
    <PageContainer>
      <h1>Stock Market Tracker</h1>
      <Suspense fallback={<Loading />}>
        <StockList />
      </Suspense>
    </PageContainer>
  );
}