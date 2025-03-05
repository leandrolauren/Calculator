import requests

url = "http://127.0.0.1:8000/calcular_juros_compostos"
data = {
    "valorInicial": 1000,
    "aporteMensal": 100,
    "taxa": 5,
    "periodo": 12
}

response = requests.get(url, json=data)

if response.status_code == 200:
    print("Resposta do servidor:")
    print(response.json())
else:
    print(f"Erro: {response.status_code}")
