from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware 
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/calcular_juros_compostos")
async def calcular_endpoint(request: Request) -> dict:
    data = await request.json()
    vl_in = float(data['valorInicial'])
    vl_mes = float(data['aporteMensal'])
    tx = float(data['juros']) / 100 / 12
    periodo = int(data['periodo'])

    valor_total, valor_investido, juros_total, meses = calculo_juros_compostos(vl_in, vl_mes, tx, periodo)

    return {
        'valor_total': valor_total,
        'valor_investido': valor_investido,
        'juros_total': juros_total,
        'meses': meses
    }

def calculo_juros_compostos(vl_in, vl_mes, tx, periodo):
    valor_total = vl_in
    valor_investido = vl_in
    juros_total = 0
    meses = []

    for i in range(1, periodo + 1):
        juros = valor_total * tx
        valor_total += juros + (vl_mes if i > 1 else 0)
        valor_investido += vl_mes if i > 1 else 0
        juros_total += juros

        meses.append({
            'Mês': i,
            'Valor de Juros': juros,
            'Valor Investido': valor_investido,
            'Juros Acumulado': juros_total,
            'Total Acumulado': valor_total
        })

    return valor_total, valor_investido, juros_total, meses


def main():
    vl_in = float(input("Digite o valor inicial: "))
    vl_mes = float(input("Digite o valor de aporte mensal: "))
    tx = float(input("Digite o percentual de juros (em %): ")) / 100

    periodo_tipo = input("O período será mensal ou anual? (m/a): ")

    if periodo_tipo.lower() == 'm':
        periodo = int(input("Digite o período em meses: "))
        tx_mes = tx
    else:
        periodo = int(input("Digite o período em anos: ")) * 12
        tx_mes = tx / 12

    valor_total, valor_investido, juros_total, meses = calculo_juros_compostos(vl_in, vl_mes, tx_mes, periodo)

    print("\n\nTabela de Resultados:")
    print("Mês\tValor de Juros\tValor Investido\tJuros Acumulado\tTotal Acumulado")
    for mes in meses:
        print(f"{mes['Mês']}\tR$ {mes['Valor de Juros']:,.2f}\tR$ {mes['Valor Investido']:,.2f}\tR$ {mes['Juros Acumulado']:,.2f}\tR$ {mes['Total Acumulado']:,.2f}")

    print("\nResumo:")
    print(f"Valor Total Final: R$ {valor_total:,.2f}")
    print(f"Valor Total Investido: R$ {valor_investido:,.2f}")
    print(f"Valor Total de Juros: R$ {juros_total:,.2f}")


if __name__ == "__main__":
    #main()
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

