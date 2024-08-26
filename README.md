<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 20px;
        }
        h1, h2, h3 {
            color: #007acc;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 90%;
        }
        a {
            color: #007acc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .important {
            background-color: #fffae6;
            border-left: 6px solid #ffecb3;
            padding: 10px;
            margin: 20px 0;
            border-radius: 5px;
        }
    </style>
    <title>README - Desafio Alura</title>
</head>
<body>
    <h1>Desafio Alura</h1>

    <p>Este projeto é uma aplicação web de gerenciamento de tarefas desenvolvida como parte do <strong>Desafio Alura</strong>. A aplicação é composta por um backend em Node.js utilizando Express e MongoDB, e um frontend em React.</p>

    <h2>Pré-requisitos</h2>
    <ul>
        <li>Node.js instalado</li>
        <li>MongoDB em execução (local ou em nuvem)</li>
        <li>NPM ou Yarn instalado para gerenciamento de pacotes</li>
        <li>Git para clonar o repositório</li>
    </ul>

    <h2>Configuração do ambiente</h2>
    <ol>
        <li>Clone o repositório do projeto:</li>
        <pre><code>git clone https://github.com/vlimap/desafioalura.git</code></pre>

        <li>Acesse a pasta do projeto:</li>
        <pre><code>cd desafioalura</code></pre>
    </ol>

    <h2>Instalação do Projeto</h2>

    <h3>Instalando as dependências do Backend</h3>
    <ol>
        <li>Acesse a pasta do backend:</li>
        <pre><code>cd backend</code></pre>

        <li>Instale as dependências:</li>
        <pre><code>npm install</code></pre>
    </ol>

    <h3>Instalando as dependências do Frontend</h3>
    <ol>
        <li>Acesse a pasta do frontend:</li>
        <pre><code>cd ../frontend</code></pre>

        <li>Instale as dependências:</li>
        <pre><code>npm install</code></pre>
    </ol>

    <h2>Configuração das variáveis de ambiente</h2>

    <p>Crie um arquivo <code>.env</code> tanto no diretório do backend quanto no frontend com as seguintes variáveis:</p>

    <h3>Backend (<code>backend/.env</code>)</h3>
    <ul>
        <li><code>MONGODB_URI</code>: URI de conexão com o MongoDB. Exemplo:</li>
        <pre><code>MONGODB_URI=mongodb://localhost:27017/desafioalura</code></pre>
        <li><code>PORT</code>: Porta em que o servidor backend será executado (opcional). Exemplo:</li>
        <pre><code>PORT=5000</code></pre>
    </ul>

    <h3>Frontend (<code>frontend/.env</code>)</h3>
    <ul>
        <li><code>VITE_API_URL</code>: URL do backend. Exemplo:</li>
        <pre><code>VITE_API_URL=http://localhost:5000</code></pre>
    </ul>

    <h2>Executando o Backend</h2>
    <ol>
        <li>Acesse o diretório do backend:</li>
        <pre><code>cd backend</code></pre>

        <li>Execute o servidor backend:</li>
        <pre><code>node src/index.js</code></pre>
    </ol>
    <p>O backend será executado em <a href="http://localhost:5000">http://localhost:5000</a> (ou na porta especificada no arquivo <code>.env</code>).</p>

    <h2>Executando o Frontend</h2>
    <ol>
        <li>Acesse o diretório do frontend:</li>
        <pre><code>cd frontend</code></pre>

        <li>Execute o servidor frontend:</li>
        <pre><code>npm run dev</code></pre>
    </ol>
    <p>O frontend será executado em <a href="http://localhost:5173">http://localhost:5173</a>.</p>

    <h2>Executando os Testes no Backend</h2>
    <p>Para garantir que o backend está funcionando corretamente, execute os testes automatizados:</p>
    <ol>
        <li>Acesse o diretório do backend:</li>
        <pre><code>cd backend</code></pre>

        <li>Execute os testes:</li>
        <pre><code>npm test</code></pre>
    </ol>
    <div class="important">
        <strong>Explicação do comando:</strong> <code>npm test</code> executa todos os testes definidos no projeto. Ele utiliza o framework de testes (por exemplo, Jest) para rodar os testes unitários e de integração, verificando se o código está funcionando como esperado.
    </div>

    <h2>Endpoints Disponíveis (Backend)</h2>
    <ul>
        <li><code>GET /api/tasks</code>: Retorna todas as tarefas</li>
        <li><code>POST /api/tasks</code>: Cria uma nova tarefa</li>
        <li><code>GET /api/tasks/:id</code>: Retorna uma tarefa específica pelo ID</li>
        <li><code>PUT /api/tasks/:id</code>: Atualiza uma tarefa específica pelo ID</li>
        <li><code>DELETE /api/tasks/:id</code>: Deleta uma tarefa específica pelo ID</li>
    </ul>

    <h2>Estrutura de Diretórios</h2>
    <pre><code>
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
    </code></pre>

    <h2>Contribuindo</h2>
    <p>Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. Certifique-se de seguir as práticas recomendadas de contribuição.</p>

    <h2>Licença</h2>
    <p>Este projeto é licenciado sob os termos da licença MIT. Veja o arquivo <a href="LICENSE">LICENSE</a> para mais detalhes.</p>
</body>
</html>
