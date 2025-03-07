'use client';

import { FormEvent, useEffect, useState } from "react";

export default function CalcJuros() {        
    const [result, setResult] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        setError(null);

        try{

            const formData = new FormData(event.currentTarget);
            const response = await fetch('https://cotacao.onrender.com/calculation', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    initial_value: formData.get('initial_value'),
                    annual_interest: formData.get('annual_interest'),
                    months: formData.get('months'),
                    monthly_contribution: formData.get('monthly_contribution')
                })
            });
            const data = await response.json();
            setResult(data.data);
        }catch (err){
            setError(err instanceof Error ? err.message: "Erro desconhecido");
            setResult(null);
        }
    }

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value|| 0);
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
            
            {error && <div className="error-message">{error}</div>}

            {result && (
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
                                <td>Amount Invested: {formatCurrency(result.amount_invested)}</td>
                                <td>Total Interest: {formatCurrency(result.total_interest)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <tr><th colSpan={5}>Detail per Month</th></tr>
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
    );
}