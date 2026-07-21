# TechMart API

API REST desenvolvida como solução para o desafio técnico de **Desenvolvedor Back-end** da **KNEX Consultoria Jr.**

O sistema simula o funcionamento de uma loja virtual, permitindo que vendedores gerenciem produtos e que clientes realizem compras, com autenticação, autorização e controle de estoque.

---

# Tecnologias Utilizadas

* Node.js
* Express.js
* PostgreSQL(pg)
* JWT (JSON Web Token)
* bcrypt
* dotenv

---

# Decisões Técnicas

O projeto foi desenvolvido utilizando **Node.js** e **Express**, por serem tecnologias leves, amplamente utilizadas no desenvolvimento de APIs REST e por oferecerem uma estrutura simples e organizada.

O banco de dados escolhido foi o **PostgreSQL**, permitindo armazenar as informações de usuários, produtos, pedidos e itens dos pedidos de forma relacional e consistente.

Para organizar o código foi utilizada a arquitetura em camadas:

* **Repositories**: responsáveis pelo acesso ao banco de dados e execução das consultas SQL.
* **Services**: responsáveis pelas regras de negócio e validações.
* **Controllers**: responsáveis por receber as requisições HTTP e retornar as respostas.
* **Routes**: responsáveis pelo mapeamento das rotas da aplicação.
* **Middlewares**: responsáveis pela autenticação e autorização dos usuários.

Essa organização facilita a manutenção do projeto, separando responsabilidades e tornando o código mais legível.

---

# Requisitos

Antes de executar o projeto é necessário possuir instalado:

* Node.js
* PostgreSQL
* Git

---

# Clonando o projeto


git clone https://github.com/FernandoSantos-0/techmart-api


Entre na pasta do projeto:

techmart-api

---

# Instalação

Instale as dependências:

npm install

---

# Configuração

Crie um arquivo .env na raiz do projeto.

Com as sequintes linhas:

PORT=3000

DATABASE_URL=postgres://usuario:senha@localhost:5432/nomedadb

JWT_SECRET=sua_chave_secreta


---

# Banco de Dados

    Crie um banco de dados PostgreSQL.

    Após criar o banco, execute os scripts SQL abaixo para criar todas as tabelas necessárias para o funcionamento da aplicação.

    Tabela users
    
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('client', 'seller')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    Tabela products

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        stock INTEGER NOT NULL CHECK (stock >= 0),
        sold BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    Tabela orders

    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        total NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_orders_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

    Tabela order_items

    CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        unit_price NUMERIC(10,2) NOT NULL,

        CONSTRAINT fk_order
            FOREIGN KEY (order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE,

        CONSTRAINT fk_product
            FOREIGN KEY (product_id)
            REFERENCES products(id)
    );

    Após executar os quatro scripts acima, o banco estará pronto para utilização pela aplicação.

---

# Executando o projeto

npm run dev

Servidor:

http://localhost:3000

---

# Autenticação

O sistema utiliza autenticação baseada em JWT.

Após realizar o login, copie o token retornado e envie em todas as rotas protegidas.

Exemplo De Token:

Authorization: Bearer SEU_TOKEN

---

# Como testar a API

As rotas podem ser testadas utilizando:

* Postman
* Insomnia

---

# Testando a API

## Exemplos de Requisições

### 1. Registrar Usuário

    POST /auth/register

    Body (JSON):

    {
        "name": "Fernando Santos",
        "email": "fernando@email.com",
        "password": "123456",
        "role": "seller"
    }

    Para cadastrar um cliente:

    {
        "name": "João Silva",
        "email": "joao@email.com",
        "password": "123456",
        "role": "client"
    }

### 2. Login

    POST /auth/login

    Body:

    {
        "email": "fernando@email.com",
        "password": "123456"
    }

    Copie o token retornado pela API.

    Nas próximas requisições protegidas adicione o cabeçalho:

    Authorization: Bearer SEU_TOKEN

### 3. Criar Produto

    POST /products

    Acesso: Vendedor

    Body:

    {
        "name": "Notebook Dell",
        "description": "Notebook Intel i5 16GB RAM",
        "price": 3500,
        "stock": 10
    }

### 4. Listar Produtos

    GET /products

    Não possui Body.

### 5. Buscar Produto

    GET /products/:id

    Exemplo:

    GET /products/1

    Não possui Body.

### 6. Atualizar Produto

    PUT /products/:id

    Acesso: Vendedor

    Exemplo:

    PUT /products/1

    Body:

    {
        "name": "Notebook Dell Inspiron",
        "description": "Notebook Intel i5 16GB RAM SSD 512GB",
        "price": 3900,
        "stock": 8
    }

### 7. Excluir Produto

    DELETE /products/:id

    Acesso: Vendedor

    Exemplo:

    DELETE /products/1

    Não possui Body.

### 8. Realizar Compra

    POST /orders

    Acesso: Cliente

    Body:

    {
        "products": [
            {
                "product_id": 1,
                "quantity": 2
            },
            {
                "product_id": 3,
                "quantity": 1
            }
        ]
    }

### 9. Listar Compras do Cliente

    GET /orders

    Acesso: Cliente

    Não possui Body.

### 10. Histórico Geral de Vendas

    GET /seller/sales

    Acesso: Vendedor

    Não possui Body.

### 11. Histórico de Vendas de um Produto

    GET /seller/sales/:product_id

    Exemplo:

    GET /seller/sales/1

    Não possui Body.

# Autor

Projeto desenvolvido como solução para o desafio técnico de Desenvolvedor Back-end da KNEX Consultoria Jr.
