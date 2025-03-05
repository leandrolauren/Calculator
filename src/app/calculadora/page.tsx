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

    if (!isClient) {
        return null;
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <h1>Calculadora de Juros Compostos</h1>
                <input type="number" name="valorInicial" placeholder="Valor Inicial" required />
                <input type="number" name="juros" placeholder="Juros %" required />
                <input type="number" name="periodo" placeholder="Período" required />
                <input type="number" name="aporteMensal" placeholder="Aporte Mensal" required />
                <button type="submit">Calcular</button>
            </form>

            {result && (
                <div>
                    <h2>Resultado</h2>
                    <p>Valor Total: R$ {result.valor_total.toFixed(2)}</p>
                    <p>Valor Investido: R$ {result.valor_investido.toFixed(2)}</p>
                    <p>Juros Total: R$ {result.juros_total.toFixed(2)}</p>
                    <h3>Detalhamento por Mês</h3>
                    <table>
                        <thead>
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
                                    <td>R$ {mes['Valor de Juros'].toFixed(2)}</td>
                                    <td>R$ {mes['Valor Investido'].toFixed(2)}</td>
                                    <td>R$ {mes['Juros Acumulado'].toFixed(2)}</td>
                                    <td>R$ {mes['Total Acumulado'].toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}