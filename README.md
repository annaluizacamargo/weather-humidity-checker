# weather-humidity-checker

Descrição do Teste Técnico: Consulta de Umidade com Alerta

Objetivo: Desenvolver uma aplicação backend que permita ao usuário informar um valor de umidade e uma localização. A aplicação deve consultar a API do OpenWeather para obter a umidade atual do local informado e, se o valor retornado pela API for maior que o valor informado pelo usuário, retornar um alerta na resposta da API.

Requisitos:
Entrada do Usuário:
- Valor de umidade (em porcentagem).
- Localização desejada(latitude e longitude).

Processo:
- A aplicação deve fazer uma requisição à API do OpenWeather para obter os dados meteorológicos do local informado.
- Extrair o valor de umidade atual dos dados retornados pela API.

Lógica de Comparação:
- Comparar o valor de umidade retornado pela API com o valor informado pelo usuário.
- Se o valor de umidade retornado pela API for maior que o valor informado pelo usuário, exibir um alerta na tela.

Saída:
- Exibir no retorno da API se a condição acima for atendida.
- Caso contrário, exibir um retorno informando que a umidade está dentro do limite informado.

Exemplo de Fluxo:
- O usuário informa:
- Umidade: 60%
- Localização: -25.42778 -49.27306
- A aplicação consulta a API do OpenWeather e obtém a umidade atual de Curitiba (por exemplo, 70%).
- A aplicação compara os valores:
- 70% (API) > 60% (Usuário)
- A aplicação exibe um alerta na tela: “Alerta: A umidade atual em Curitiba é de 70%, que é maior que o valor informado de 60%.”

Tecnologias Sugeridas:
- Linguagem de programação: Node com typescript
- Frameworks: Nest.JS
- API: OpenWeather (https://openweathermap.org/api)
- Ferramentas de teste: Postman, Insomnia, etc.

Critérios de Avaliação:
- Correção e eficiência da lógica de comparação.
- Uso adequado da API do OpenWeather.
- Clareza e organização do código.
- Tratamento de erros e exceções.
- Documentação.
