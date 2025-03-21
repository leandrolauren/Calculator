'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Loading from '../components/Loading';

const StockList = dynamic(() => import('../components/StockList'), {
  ssr: false,
  loading: () => <Loading />
});

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 1500px;
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

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    padding: 1rem 0;
    justify-content: center;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    word-wrap: break-word;

    .card-label {
      font-weight: bold;
      margin-bottom: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      cursor: pointer;

      &:hover .tooltip {
        visibility: visible;
        opacity: 1;
      }

      .tooltip {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: #fff;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 10;
        transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

      }
    }

    .card-value {
      font-size: 1rem;
      color: #333333;
      word-break: break-word;
    }
  }

  .error-messages {
    position: absolute;
    bottom: -25px;
    left: 0;
    color: #ff4444;
    font-size: 0.9rem;
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