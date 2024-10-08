# 🌦️ Weather Humidity Checker
![image](https://github.com/user-attachments/assets/715264f8-6670-4805-8ec5-92d3f7dbea98)

## 📋 Descrição do Projeto

O **Weather Humidity Checker** é uma aplicação backend desenvolvida para realizar consultas de umidade do ar em uma localização específica. O usuário informa um valor de referência para a umidade e uma localização (latitude e longitude). A aplicação consulta a API do OpenWeather para obter a umidade atual dessa localização e retorna um alerta caso a umidade seja maior do que o valor informado pelo usuário.

## 🎯 Objetivo

O objetivo deste projeto é permitir que o usuário compare o valor de umidade atual de uma localização específica com um valor de referência que ele mesmo define. Se a umidade atual for maior que o valor informado, a aplicação emite um alerta, informando que a umidade está acima do limite definido.

## 🛠️ Tecnologias Utilizadas

- **Linguagem de Programação:** Node.js com TypeScript
- **Framework:** NestJS
- **API de Dados Meteorológicos:** [OpenWeather API](https://openweathermap.org/api)
- **Ferramentas de Teste:** Jest, Postman

## 🚀 Funcionalidades

### 📝 Entrada do Usuário

- **Valor de Umidade:** Percentual informado pelo usuário.
- **Localização:** Latitude e longitude da área desejada.

### 🔄 Processo

1.  O usuário informa o valor de umidade e a localização desejada.
2.  A aplicação faz uma requisição à API do OpenWeather para obter os dados meteorológicos da localização fornecida.
3.  O valor de umidade atual é extraído dos dados retornados pela API.

### ⚖️ Lógica de Comparação

- O valor de umidade retornado pela API é comparado com o valor informado pelo usuário.
- Se o valor de umidade da API for maior que o valor informado, a aplicação gera um alerta.
- Caso contrário, a aplicação informa que a umidade está dentro do limite especificado.

### 📤 Saída

- **Alerta:** Caso a umidade retornada pela API seja maior que o valor informado, a resposta da API conterá um alerta.
- **Mensagem Informativa:** Caso a umidade esteja dentro do limite, uma mensagem informativa será exibida.

### 🛠️ Exemplo de Fluxo

1.  O usuário informa uma umidade de `60%` e a localização com latitude `-25.42778` e longitude `-49.27306`.
2.  A aplicação consulta a API do OpenWeather e recebe um valor de umidade atual para a cidade de Curitiba (como por exemplo humidade de de `70%`).
3.  A aplicação compara os valores: `70% (API) > 60% (Usuário)`.
4.  A aplicação retorna:
    - **Mensagem de alerta:** "`Alerta: A umidade atual em Curitiba é de 70%, que é maior que o valor informado de 60%.`"

## ⚙️ Requisitos de Instalação e Configuração

### 📋 Pré-requisitos

- **Node.js:** Certifique-se de que você tenha o Node.js instalado em sua máquina.
- **NPM:** O NPM é necessário para instalar as dependências do projeto.
- **Chave de acesso da OpenWeatherAPI:** Necessária para validar as requisições, para se cadastrar basta acessar o site https://openweathermap.org/api, e possui a versão da API gratuita para ser utilizada nos testes.

### 🛠️ Passo a Passo

1.  **Clone o repositório:**

```sh
    git clone https://github.com/annaluizacamargo/weather-humidity-checker.git
```

2.  **Instale as dependências:**

```sh
    cd weather-humidity-checker
    npm install
```

3.  **Configuração da API Key:**
    - Clone o arquivo `.env.example` e atualize o parâmetro `OPENWEATHER_API_KEY` com a sua chave da API do OpenWeather ou crie um arquivo `.env` na raiz do projeto edicione a sua chave da API do OpenWeather.

```env
OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5/
OPENWEATHER_API_KEY=your-openweather-api-key
IP_API_URL=http://ip-api.com/json/
```

4.  **Inicie o servidor:**

```sh
    `npm run start`
```

- Projetos NestJS são executados por padrão na porta 3000, então acesse [`a porta 3000`](http://localhost:3000) para visualizar a aplicação.

5.  **Acesse a view ou realize as requisições via Postman:**
    - Caso queira realizar os testes de forma visual, basta acessar a url em um navegador para visualizar uma view simples criada para exibir o desenvolvimento feito do back-end.
      - Acesse [`http://localhost:3000/`](http://localhost:3000/)
      - Insira a latitude, longitude e umidade desejada para realizar a consulta.
      - Clique no botão "Consultar Umidade" para visualizar o resultado.
    - No caso do Postman no final da documentação tem a collection e enviroments para testes, além do curl anexado na parte dos endpoints logo abaixo.
      - Para realizar as requisições via Postman, utilize os endpoints descritos na documentação da API.
      - Envie uma requisição via Postman para a url [`http://localhost:3000/`](http://localhost:3000/) para validar o funcionamento da aplicação, com o retorno "Welcome to the Weather Humidity Checker API".
      - Envie uma requisição via Postman para a url [`http://localhost:3000/humidity-verifier/get-location-from-ip`](http://localhost:3000/humidity-verifier/get-location-from-ip) para obter a localização a partir do IP.
      - Envie uma requisição via Postman para a url [`http://localhost:3000/humidity-verifier/get-user-humidity`](http://localhost:3000/humidity-verifier/get-user-humidity) para obter a umidade do usuário.
      - Envie uma requisição via Postman para a url [`http://localhost:3000/humidity-verifier/check-humidity`](http://localhost:3000/humidity-verifier/check-humidity) para verificar a umidade.

## 🧪 Testes

Os testes foram escritos utilizando o Jest. Para rodar os testes, execute:

```sh
npm run test
```

- ⚠️ Lembre-se de adicionar a `OPENWEATHER_API_KEY` na constante `personalApiKey` porque se não os testes irão falhar.

## 📊 Critérios de Avaliação

### **Descrição do Teste Técnico**: Consulta de Umidade com Alerta

- **Objetivo**: Desenvolver uma aplicação backend que permita ao usuário informar um valor de umidade e uma localização. A aplicação deve consultar a API do OpenWeather para obter a umidade atual do local informado e, se o valor retornado pela API for maior que o valor informado pelo usuário, retornar um alerta na resposta da API.

- **Requisitos**:

  - **Entrada do Usuário**:
    - Valor de `umidade` (em porcentagem).
    - Localização desejada(`latitude` e `longitude`).

- **Processo**:

  - A aplicação deve fazer uma requisição à API do OpenWeather para obter os dados meteorológicos do local informado.
  - Extrair o valor de umidade atual dos dados retornados pela API.

- **Lógica de Comparação**:

  - Comparar o valor de umidade retornado pela API com o valor informado pelo usuário.
  - Se o valor de umidade retornado pela API for maior que o valor informado pelo usuário, exibir um alerta na tela.

- **Saída**:

  - Exibir no retorno da API se a condição acima for atendida.
  - Caso contrário, exibir um retorno informando que a umidade está dentro do limite informado.

- **Exemplo de Fluxo**:

  - O usuário informa:
    - Umidade: `60%`
    - Localização: `-25.42778` `-49.27306`
  - A aplicação consulta a API do OpenWeather e obtém a umidade atual de Curitiba (por exemplo, `70%`).
  - A aplicação compara os valores:
    - `70% (API) > 60% (Usuário)`
  - A aplicação exibe um alerta na tela: “`Alerta: A umidade atual em Curitiba é de 70%, que é maior que o valor informado de 60%.`”

- **Tecnologias Sugeridas**:

  - **Linguagem de programação**: Node com typescript
  - **Frameworks**: Nest.JS
  - **API**: [OpenWeather API](https://openweathermap.org/api)
  - **Ferramentas de teste**: Postman, Insomnia, etc.

- **Critérios de Avaliação**:
  - Correção e eficiência da lógica de comparação.
  - Uso adequado da API do OpenWeather.
  - Clareza e organização do código.
  - Tratamento de erros e exceções.
  - Documentação.
  - **Entrega extra que foi realizada no teste**:
    - Interface visual podendo ser acessada pela url em um navegador após rodar `npm start`, construída no `views > index.hbs`.
    - Testes implementados no `src > controllers > humidity-alert.controller.spec.ts`.
    - Collection e enviroments para testes no Postman.

## 📚 Documentação da API

### Endpoints

#### 1\. 🌍 Pegar Localização a partir do IP

- **Método:** GET
- **URL:** `/humidity-verifier/get-location-from-ip`
- **Curl para Teste:**

```sh
curl --location 'http://localhost:3000/humidity-verifier/get-location-from-ip'
```

- **Resposta:**

```json
{
  "lat": -25.42778,
  "lon": -49.27306,
  "city": "Curitiba"
}
```

#### 2\. 💧 Pegar a Umidade do Usuário

- **Método:** POST
- **URL:** `/humidity-verifier/get-user-humidity`
- **Body:**

```json
{
  "lat": "-25.42778",
  "lon": "-49.27306",
  "humidity": "60"
}
```

- **Curl para Teste:**

```sh
curl --location 'http://localhost:3000/humidity-verifier/get-user-humidity' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'lat=-25.42778' \
--data-urlencode 'lon=-49.27306' \
--data-urlencode 'humidity=60%'
```

- **Resposta:**

```json
{
  "openWeatherData": {
    "lat": -25.42778,
    "lon": -49.27306,
    "humidity": 62
  },
  "currentCity": "Curitiba"
}
```

#### 3\. ✅ Verificar Umidade

- **Método:** POST
- **URL:** `/humidity-verifier/check-humidity`
- **Body:**

```json
{
  "lat": "-25.42778",
  "lon": "-49.27306",
  "humidity": "60%"
}
```

- **Curl para Teste:**

```sh
curl --location 'http://localhost:3000/humidity-verifier/check-humidity' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'lat=-25.42778' \
  --data-urlencode 'lon=-49.27306' \
  --data-urlencode 'humidity=60%'' \
```

- **Resposta:**

```json
"Alerta: A umidade atual em Curitiba é de 70%, que é maior que o valor informado de 60%."
```

## 🛠️ Explicações Adicionais de implementação do projeto

Visando obter o melhor desempenho e organização do código, foram utilizados os seguintes conceitos e práticas:

- **Injeção de Dependências:** Utilização do conceito de injeção de dependências do NestJS para injetar o serviço `WeatherAlertService` em todos os controllers.
- **Tratamento de Erros:** Implementação de tratamento de erros para lidar com situações inesperadas e retornar mensagens de erro claras.
  - Pensando em uma tratativa de erro extra desenvolvi a captura da latitude, longitude e cidade via IP, caso o usuário não informe esses dados.
  - O único dado obrigatório é a umidade, visto que é o dado principal para a comparação.
- **Variáveis de Ambiente:** Utilização de variáveis de ambiente para armazenar a chave da API do OpenWeather e as URLs das APIs.
- **Testes Automatizados:** Implementação de testes automatizados para garantir o funcionamento correto das funções.
- **Documentação:** Criação de uma documentação clara e concisa para orientar o usuário sobre o funcionamento da API.
- **Organização do Código:** Separação das funções em métodos privados para facilitar a manutenção e a leitura do código, mesmo sendo um projeto pequeno.
- **Interface Visual:** Criação de uma interface visual simples para facilitar os testes e a visualização do desenvolvimento do back-end.

## 📞 Contato

Desenvolvido por **Anna Luiza Fistarol**.

- 🌷 **LinkedIn:** [anna-luiza-camargo-fistarol](https://www.linkedin.com/in/anna-luiza-camargo-fistarol/)
- 🌸 **GitHub:** [annaluizacamargo](https://github.com/annaluizacamargo)
- 🌺 **Email:** [luizafistarol@gmail.com](mailto:luizafistarol@gmail.com)


## 🛠️ Postman Collection

```json
{
	"info": {
		"_postman_id": "af8fe88c-83b5-487d-b088-8008f2b950ff",
		"name": "🌦️ Weather Humidity Checker",
		"description": "# 📚 Documentação da API\n\n## Descrição\n\nSeja bem-vindo(a) ao repositório do **Weather Humidity Checker**, uma API que permite verificar a umidade do ar em uma localização específica e comparar com um valor de referência fornecido pelo usuário. A API utiliza dados do OpenWeather para realizar essa verificação.\n\n## Endpoints\n\n### 1\\. 🌍 Pegar Localização a partir do IP \\[Get Location From IP\\]\n\n- **Método:** GET\n    \n- **URL:** `/humidity-verifier/get-location-from-ip`\n    \n- **Descrição:** Obtém a localização (latitude, longitude e cidade) com base no IP do usuário.\n    \n- **Exemplo de Requisição:**\n    \n\n``` bash\ncurl --location 'http://localhost:3000/humidity-verifier/get-location-from-ip'\n\n ```\n\n- **Resposta de Sucesso:**\n    \n\n``` json\n{\n  \"lat\": -25.42778,\n  \"lon\": -49.27306,\n  \"city\": \"Curitiba\"\n}\n\n ```\n\n### 2\\. 💧 Pegar a Umidade do Usuário \\[Get Humidity Data\\]\n\n- **Método:** POST\n    \n- **URL:** `/humidity-verifier/get-user-humidity`\n    \n- **Descrição:** Obtém a umidade atual de uma localização específica fornecida pelo usuário.\n    \n- **Body:**\n    \n\n``` json\n{\n  \"lat\": \"-25.42778\",\n  \"lon\": \"-49.27306\",\n  \"humidity\": \"60\"\n}\n\n ```\n\n- **Exemplo de Requisição:**\n    \n\n``` bash\ncurl --location 'http://localhost:3000/humidity-verifier/get-user-humidity' \\\n--header 'Content-Type: application/x-www-form-urlencoded' \\\n--data-urlencode 'lat=-25.42778' \\\n--data-urlencode 'lon=-49.27306' \\\n--data-urlencode 'humidity=60%'\n\n ```\n\n- **Resposta de Sucesso:**\n    \n\n``` json\n{\n  \"openWeatherData\": {\n    \"lat\": -25.42778,\n    \"lon\": -49.27306,\n    \"humidity\": 62\n  },\n  \"currentCity\": \"Curitiba\"\n}\n\n ```\n\n### 3\\. ✅ Verificar Umidade \\[Check Humidity\\]\n\n- **Método:** POST\n    \n- **URL:** `/humidity-verifier/check-humidity`\n    \n- **Descrição:** Verifica se a umidade atual de uma localização específica é maior que o valor de referência fornecido pelo usuário.\n    \n- **Body:**\n    \n\n``` json\n{\n  \"lat\": \"-25.42778\",\n  \"lon\": \"-49.27306\",\n  \"humidity\": \"60%\"\n}\n\n ```\n\n- **Exemplo de Requisição:**\n    \n\n``` bash\ncurl --location 'http://localhost:3000/humidity-verifier/check-humidity' \\\n  --header 'Content-Type: application/x-www-form-urlencoded' \\\n  --data-urlencode 'lat=-25.42778' \\\n  --data-urlencode 'lon=-49.27306' \\\n  --data-urlencode 'humidity=60%'' \\\n\n ```\n\n- **Resposta de Sucesso:**\n    \n\n``` json\n\"Alerta: A umidade atual em Curitiba é de 70%, que é maior que o valor informado de 60%.\"\n\n ```\n\n## 📝 Variáveis de Ambiente\n\nCertifique-se de configurar as seguintes variáveis de ambiente no Postman para facilitar a configuração e reutilização dos valores:\n\n- **`baseUrl`**: URL base da API (ex: `http://localhost:3000`)\n    \n- **`lat`**: Latitude a ser validada (ex: `-25.42778`)\n    \n- **`lon`**: Longitude a ser validada (ex: `-49.27306`)\n    \n- `humity`: Umidade do local a ser comparado (ex. `60%`)\n    \n\nE lembre de clone o arquivo `.env.example` e atualize o parâmetro `OPENWEATHER_API_KEY` com a sua chave da API do OpenWeather ou crie um arquivo `.env` na raiz do projeto edicione a sua chave da API do OpenWeather.\n\n```\nOPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5/\nOPENWEATHER_API_KEY=your-openweather-api-key\nIP_API_URL=http://ip-api.com/json/\n\n ```\n\n## 📞 Contato\n\nDesenvolvido por **Anna Luiza Fistarol**.\n\n- 🌷 **LinkedIn:** [anna-luiza-camargo-fistarol](https://www.linkedin.com/in/anna-luiza-camargo-fistarol/)\n    \n- 🌸 **GitHub:** [annaluizacamargo](https://github.com/annaluizacamargo)\n    \n- 🌺 **Email:** [luizafistarol@gmail.com](https://mailto:luizafistarol@gmail.com)",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "27834411"
	},
	"item": [
		{
			"name": "Get Location From IP",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{url}}humidity-verifier/get-location-from-ip",
					"host": [
						"{{url}}humidity-verifier"
					],
					"path": [
						"get-location-from-ip"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Humidity Data",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "lat",
							"value": "{{lat}}",
							"description": "Insira a latitude a ser validada",
							"type": "text"
						},
						{
							"key": "lon",
							"value": "{{lon}}",
							"description": "Insira a longitude a ser validada",
							"type": "text"
						},
						{
							"key": "humidity",
							"value": "{{humity}}",
							"description": "Insira a humidade do local a ser comparado",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "{{url}}humidity-verifier/get-user-humidity",
					"host": [
						"{{url}}humidity-verifier"
					],
					"path": [
						"get-user-humidity"
					]
				}
			},
			"response": []
		},
		{
			"name": "Check Humidity",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "lat",
							"value": "{{lat}}",
							"description": "Insira a latitude a ser validada",
							"type": "text"
						},
						{
							"key": "lon",
							"value": "{{lon}}",
							"description": "Insira a longitude a ser validada",
							"type": "text"
						},
						{
							"key": "humidity",
							"value": "{{humity}}",
							"description": "Insira a humidade do local a ser comparado",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "{{url}}humidity-verifier/check-humidity",
					"host": [
						"{{url}}humidity-verifier"
					],
					"path": [
						"check-humidity"
					]
				}
			},
			"response": []
		}
	]
}
```

## 🛠️ Postman Environment

```json
{
	"id": "6e184961-b203-433d-b246-5b62b36ff196",
	"name": "humidity_alert_test_parameters",
	"values": [
		{
			"key": "url",
			"value": "http://localhost:3000/",
			"type": "default",
			"enabled": true
		},
		{
			"key": "lat",
			"value": "-25.42778",
			"type": "default",
			"enabled": true
		},
		{
			"key": "lon",
			"value": "-49.27306",
			"type": "default",
			"enabled": true
		},
		{
			"key": "humity",
			"value": "60%",
			"type": "default",
			"enabled": true
		}
	],
	"_postman_variable_scope": "environment",
	"_postman_exported_at": "2024-08-29T15:58:48.408Z",
	"_postman_exported_using": "Postman/11.2.35"
}
```
