'use client';

import { FormEvent, useEffect, useState } from "react";

export default function CalcJuros() {        
    const [result, setResult] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    async function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const response = await fetch('http://localhost:8000/calcular_juros_compostos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                valorInicial: formData.get('valorInicial'),
                juros: formData.get('juros'),
                periodo: formData.get('periodo'),
                aporteMensal: formData.get('aporteMensal')
            })
        });
        const data = await response.json();
        setResult(data);
    }

    function formatCurrency(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    if (!isClient) {
        return null;
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <h1>Calculadora de Juros Compostos</h1>
                <input type="number" name="valorInicial" placeholder="Valor Inicial" required />
                <input type="number" name="juros" placeholder="Juros % ano" required />
                <input type="number" name="periodo" placeholder="Periodo (Meses)" required />
                <input type="number" name="aporteMensal" placeholder="Aporte Mensal" required />
                <button type="submit">Calcular</button>
            </form>

            {result && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={3}>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Valor Total: {formatCurrency(result.valor_total)}</td>
                                <td>Valor Investido: {formatCurrency(result.valor_investido)}</td>
                                <td>Juros Total: {formatCurrency(result.juros_total)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <tr><th colSpan={5}>Detalhamento por Mês</th></tr>
                            <tr>
                                <th>Mês</th>
                                <th>Valor de Juros</th>
                                <th>Valor Investido Acumulado</th>
                                <th>Juros Acumulado</th>
                                <th>Total Acumulado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.meses.map((mes: any, index: number) => (
                                <tr key={index}>
                                    <td>{mes['Mês']}</td>
                                    <td>{formatCurrency(mes['Valor de Juros'])}</td>
                                    <td>{formatCurrency(mes['Valor Investido'])}</td>
                                    <td>{formatCurrency(mes['Juros Acumulado'])}</td>
                                    <td>{formatCurrency(mes['Total Acumulado'])}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}