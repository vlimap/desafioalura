
# Desafio Alura

Este projeto é uma aplicação web de gerenciamento de tarefas desenvolvida como parte do Desafio Alura. 
A aplicação é composta por um backend em Node.js utilizando Express e MongoDB, e um frontend em React.

## Pré-requisitos

- Node.js instalado
- MongoDB em execução (local ou em nuvem)
- NPM ou Yarn instalado para gerenciamento de pacotes
- Git para clonar o repositório

## Configuração do ambiente

1. Clone o repositório do projeto:

```bash
git clone https://github.com/vlimap/desafioalura.git
```

2. Acesse a pasta do projeto:

```bash
cd desafioalura
```

## Instalação do Projeto

### Instalando as dependências do Backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

### Instalando as dependências do Frontend

1. Acesse a pasta do frontend:

```bash
cd ../frontend
```

2. Instale as dependências:

```bash
npm install
```

## Configuração das variáveis de ambiente

Crie um arquivo `.env` tanto no diretório do backend quanto no frontend com as seguintes variáveis:

#### Backend (`backend/.env`):

- `MONGODB_URI`: URI de conexão com o MongoDB. Exemplo:
```
MONGODB_URI=mongodb://localhost:27017/desafioalura
```
- `PORT`: Porta em que o servidor backend será executado (opcional). Exemplo:
```
PORT=5000
```

#### Frontend (`frontend/.env`):

- `VITE_API_URL`: URL do backend. Exemplo:
```
VITE_API_URL=http://localhost:5000
```

## Executando o Backend

1. Acesse o diretório do backend:

```bash
cd backend
```

2. Execute o servidor backend:

```bash
node src/index.js
```

O backend será executado em [http://localhost:5000](http://localhost:5000) (ou na porta especificada no arquivo `.env`).

## Executando o Frontend

1. Acesse o diretório do frontend:

```bash
cd frontend
```

2. Execute o servidor frontend:

```bash
npm run dev
```

O frontend será executado em [http://localhost:5173](http://localhost:5173).

## Endpoints Disponíveis (Backend)

### Endpoints Disponíveis:

- `GET /api/tasks`: Retorna todas as tarefas
- `POST /api/tasks`: Cria uma nova tarefa
- `GET /api/tasks/:id`: Retorna uma tarefa específica pelo ID
- `PUT /api/tasks/:id`: Atualiza uma tarefa específica pelo ID
- `DELETE /api/tasks/:id`: Deleta uma tarefa específica pelo ID

## Estrutura de Diretórios

```
desafioalura/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── tarefas/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── utils/
│   │   ├── index.js
│   ├── .env
│   ├── package.json
├── frontend/
│   ├── src/
│   │   ├── componentes/
│   │   ├── paginas/
│   │   ├── App.js
│   ├── .env
│   ├── package.json
└── README.md
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. Certifique-se de seguir as práticas recomendadas de contribuição.

## Licença

Este projeto é licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
