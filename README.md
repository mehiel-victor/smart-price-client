# Client

Este projeto é responsável pela interface de usuário para visualização e gestão de informações de produtos e histórico de preços. Ele se conecta ao backend para buscar e exibir os dados, é obrigatório que o projeto server esteja rodando antes de executar este.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instale as dependências do projeto](#instale-as-dependências-do-projeto)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)

## Instale as dependências do projeto

1. Clone o repositório:
   ```
   git clone https://github.com/mehiel-victor/client
   cd client 
   ```

2. Instale as dependências do projeto:
  ```
    npm install
  ```

## Configuração

### Crie um arquivo .env.local na raiz do projeto e adicione as seguintes variáveis de ambiente:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3000/graphql
  ```

## Executando o Projeto
### Inicie o servidor de desenvolvimento:
  ```
  npm run dev
  ```
A aplicação estará disponível em http://localhost:3001.

## EEstrutura do Projeto
  ```
  /src
    /app
      /products
        /[id]
          page.tsx        # Página de detalhes do produto
      apollo-client.ts    # Configuração do Apollo Client
      layout.tsx          # Layout principal da aplicação
      page.tsx            # Página inicial da aplicação
    /components
      ProductDetails.tsx  # Componente para exibir detalhes do produto
      ProductList.tsx     # Componente para listar e pesquisar produtos
    /public
      favicon.ico
    globals.css           # Estilos globais
  /__generated__
    fragment-masking.ts
    gql.ts
    graphql.ts
    index.ts
  /.eslintrc.json         # Configurações do ESLint
  /package.json           # Dependências e scripts do projeto
  /tsconfig.json          # Configurações do TypeScript
  /.gitignore             # Arquivos e pastas a serem ignorados pelo Git
  ```

## Scripts Disponíveis
  ```
  npm run dev: Inicia a aplicação.
  npm run build: Cria a build para produção.
  npm run start: Inicia a aplicação em modo de produção.
  npm run lint: Verifica o código com o ESLint.
  ```
