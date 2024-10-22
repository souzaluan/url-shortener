<div align="center">
  <h3 align="center">:scissors: URL shortener :scissors:</h3>

  <p align="center">
    <i>API de encurtamento de URLs com suporte a autenticação e gestão de links</i>
    <br />
    <a href="https://url-shortener-6qdt.onrender.com/docs/"><strong>Documentação »</strong></a>
  </p>
</div>

# :gear: Funcionalidades
- [x] Cadastro de novos usuários
- [x] Autenticação de usuários
- [x] Encurtar URL, com ou sem autenticação
- [x] Listar URLs criadas pelo usuário autenticado
- [x] Editar uma URL criada pelo usuário autenticado
- [x] Remover uma URL criada pelo usuário autenticado
- [x] Redirecionamento para a URL de origem

# :rocket: Teste a aplicação
**Você pode acessar e testar a aplicação através de: `https://url-shortener-6qdt.onrender.com/`**

_Sinta-se à vontade para encurtar URLs e explorar as funcionalidades da API._

# :wrench: Tecnologias

* **Node.js**
* **Express.js** para criação da API REST
* **PostgreSQL** para armazenamento de dados
* **Docker e Docker Compose** para ambiente local
* **Swagger** para documentação da API
* **Jest** para testes unitários

# :feet: Primeiros passos

## Pré-requisitos

**Para executar o projeto, é necessário que vocẽ atenda os seguintes pré-requisitos:**

* Node.js@20.18.0
* NPM@10.8.2
* Docker e Docker compose (se optar executar o projeto via Docker)

## Variáveis de ambiente

**Crie um arquivo `.env` na raiz do projeto e preencha as seguintes variáveis:**

* `PORT` Porta onde o servidor será executado
* `DB_HOST` Endereço do banco de dados
* `DB_PORT` Porta do banco de dados
* `DB_USERNAME` Usuário do banco de dados
* `DB_PASSWORD` Senha do banco de dados
* `DB_NAME` Nome do banco de dados
* `JWT_SECRET` Secret usada para assinar o JWT
* `JWT_EXPIRES_IN` Tempo de expiração do JWT

## Instalação e execução

### Sem Docker

1. **Clone o repositório**
   ```bash
   git clone https://github.com/souzaluan/url-shortener.git
   ```

2. **Certifique-se de que está utilizando a versão correta do Node.js**
   
   Verifique a versão atual instalada:
   ```bash
   node --version
   ```
   Se a versão não corresponder à especificada no projeto, recomendamos o uso do nvm para gerenciar versões de Node.js. Para alternar automaticamente para a versão correta, execute o seguinte comando na raiz do projeto:
   ```bash
   nvm use
   ```
   _Caso não tenha o nvm instalado, siga este [guia de instalação](https://github.com/nvm-sh/nvm#installing-and-updating)_

4. **Instale as dependências**
   ```bash
   npm install
   ```
5. **Crie um arquivo `.env` com base no arquivo `.env.example` e preencha as variáveis**

6. **Execute as migrations**
   ```bash
   npm run migration:run
   ```
7. **Inicie o servidor em ambiente de desenvolvimento**
   ```bash
   npm run dev:server
   ```
8. **Acesse a documentação em: `http://localhost:<PORT>/docs`**

### Com Docker

1. **Clone o repositório**
   ```bash
   git clone https://github.com/souzaluan/url-shortener.git
   ```
2. **Crie um arquivo `.env` com base no arquivo `.env.example` e preencha as variáveis**

3. **Construa e inicie os containers:**
    ```bash
    docker-compose up --build
    ```
4. **Acesse a documentação em: `http://localhost:3000/docs`**
