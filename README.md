<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  <p align="center">Este projeto é um aplicativo CRUD básico (Criar, Ler, Atualizar, Deletar) criado usando NestJS, framework utilizado para construir aplicativos do lado do servidor eficientes e escalonáveis.</p>

<div align="center">
<img src="https://img.shields.io/github/repo-size/thiagodinizsilva/ldapAdmin2.0?style=for-the-badge"/>
<img src="https://img.shields.io/github/contributors/thiagodinizsilva/ldapAdmin2.0?style=for-the-badge"/>
<img src="https://img.shields.io/github/issues/thiagodinizsilva/ldapAdmin2.0?style=for-the-badge"/>
<img src="https://img.shields.io/github/issues-pr/thiagodinizsilva/ldapAdmin2.0?style=for-the-badge"/>
<img src="https://img.shields.io/github/license/thiagodinizsilva/ldapAdmin2.0?style=for-the-badge"/>
</div>


## 🪪 Características

- Operações CRUD
- Endpoints de API RESTful
- TypeScript
- Integração com PostgreSQL
- Configuração baseada em variaveis de ambiente

## ✈️ Começando

### Endpoints da API
O aplicativo tem os seguintes endpoints da API RESTful:

- GET /Messages - Recupera uma lista de todas as mensagens
- GET /Messages/:id - Recupera uma única mensagem por ID
- POST /Mensagens - Criae uma nova mensagem
- PUT /Messages/:id - Atualiza uma mensagem existente por ID
- DELETE /Messages/:id - Exclui uma mensagem por ID


## 💻 Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina local:

- Node.js (>= 12.x)
- npm (>= 6.x) ou fio (>= 1.x)
-PostgreSQL

## Ambiente de Desenvolvimento

1. Clone o repositório:
```
    bash
    git clone https://github.com/ThiagoDinizSilva/nestjs-crud-app.git
    cd nestjs-crud-app
```

2. Instale as dependências
```
    bash
    npm install
    # or
    yarn install
```
### Configuração

1. Crie um arquivo `.env` no diretório `environment` para o seu ambiente de desenvolvimento e um arquivo `.env.production` para o seu ambiente de produção. Exemplo:
```
   **environment/.env**
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=username
   DATABASE_PASSWORD=password
   DATABASE_NAME=nestjs_crud
```

2. Atualize a configuração do TypeORM para usar as variáveis ​​de ambiente. Exemplo:
```
{
    type: 'postgres',
    host: getEnvVariable(configService, 'DB_HOST'),
    port: parseInt(getEnvVariable(configService, 'DB_PORT'), 10),
    username: getEnvVariable(configService, 'DB_USERNAME'),
    password: getEnvVariable(configService, 'DB_PASSWORD'),
    database: getEnvVariable(configService, 'DB_DATABASE'),
    entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    synchronize: true,
};
```

### Executando o aplicativo

1. Execute a aplicação em modo de desenvolvimento:
```
    npm run start:dev
```

2. Execute o aplicativo em modo de produção:
```
    npm run start:prod
```
