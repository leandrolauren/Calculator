'use client'

import { FormEvent, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const LOCAL_STORAGE_KEY = 'calculatorData'

export default function CalcJuros() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (cached) setResult(JSON.parse(cached))
  }, [])

  useEffect(() => {
    if (result) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result))
    }
  }, [result])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const form = event.currentTarget as HTMLFormElement

      // Ensure tokens are available
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1]
      const tokenType = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token_type='))
        ?.split('=')[1]

      const formData = new FormData(form)
      const response = await fetch('https://cotacao.onrender.com/calculation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify({
          initial_value: formData.get('initial_value'),
          annual_interest: formData.get('annual_interest'),
          months: formData.get('months'),
          monthly_contribution: formData.get('monthly_contribution'),
        }),
      })

      if (!response.ok) {
        setLoading(false)
        throw new Error(`Failed to calculate, message: ${response.statusText}`)
      }

      const data = await response.json()
      setResult(data.data)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      setResult(null)
    }
  }

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0)
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Compound interest Calculator</h1>
        <input
          type="number"
          name="initial_value"
          placeholder="Initial Value"
          required
          step="0.01"
        />
        <input
          type="number"
          name="annual_interest"
          placeholder="Annual Interest %"
          required
          step="0.01"
          min="1"
        />
        <input
          type="number"
          name="months"
          placeholder="Months"
          required
          min="1"
        />
        <input
          type="number"
          name="monthly_contribution"
          placeholder="Monthly Contribution"
          required
          step="0.01"
        />
        <button type="submit">Calculate</button>
      </form>

      <div className="loading-screen" style={{ textAlign: 'center' }}>
        {loading && <CircularProgress />}
      </div>

      {!loading && error && <div className="error-message">{error}</div>}

      {!loading && result && (
        <div>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Value: {formatCurrency(result.total_value)}</td>
                <td>
                  Amount Invested: {formatCurrency(result.amount_invested)}
                </td>
                <td>Total Interest: {formatCurrency(result.total_interest)}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th colSpan={5}>Detail per Month</th>
              </tr>
              <tr>
                <th>Month</th>
                <th>Interest Amount</th>
                <th>Amount Invested</th>
                <th>Accumulated Interest</th>
                <th>Accumulated Total</th>
              </tr>
            </thead>
            <tbody>
              {result.months.map((month: any, index: number) => (
                <tr key={index}>
                  <td>{month['Month']}</td>
                  <td>{formatCurrency(month['Interest Amount'])}</td>
                  <td>{formatCurrency(month['Amount Invested'])}</td>
                  <td>{formatCurrency(month['Accumulated Interest'])}</td>
                  <td>{formatCurrency(month['Accumulated Total'])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
