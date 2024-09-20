# CirandarApp - Backend

O CirandarApp é um aplicativo desenvolvido para a cadeira de Programação de Dispositivos Móveis, na universidade Unisinos. 

Alunos participantes:
- Álvaro Souza Pereira da Silva
- Carla Viganigo Rangel de Castilhos
- Gabriela Madalosso
- Hierro de Almeida Zaro
- Weslen Sevéro Mombach

## Descrição

Este repositório contém o backend do CirandarApp, responsável por fornecer APIs para a gestão de usuários e bibliotecas, além de implementar a autenticação e a persistência de sessões de usuário.

### Funcionalidades e Rotas

#### Autenticação

- `POST /api/login`: Realiza o login de um usuário com base no e-mail e senha fornecidos. Ao autenticar com sucesso, uma sessão é criada para o usuário.
- `POST /api/logout`: Encerra a sessão do usuário autenticado.
- `GET /profile`: Retorna o perfil do usuário autenticado. Se o usuário não estiver logado, retorna um erro de autenticação.

#### Usuários

- `GET /api/usuarios`: Retorna a lista de todos os usuários registrados no sistema. Disponível apenas para usuários autenticados.

#### Bibliotecas

- Rotas para manipulação de dados de bibliotecas, implementadas no arquivo `bibliotecaRoutes`. Estas rotas permitem a interação com a base de dados de bibliotecas, incluindo operações como criação, consulta, edição e exclusão de registros.

## Como executar o projeto

### Pré-requisitos

- Docker instalado
- Node.js instalado, versão @19.0.0 ou superior

### Instruções

1. Clone o repositório para a sua máquina:

   ```bash
   git clone https://github.com/gmadalosso/CirandarApp-Backend.git

2. Instale as dependências necessárias:

   ```bash
   npm install

3. Tenha docker rodando (Docker desktop no windows, ou então de acordo com seu SO)

4. Faça o build da aplicação no docker:

   ```bash
   docker-compose up --build

- Se necessário fazer alguma alteração, rodar

   ```bash
   docker-compose down

- E depois rodar build novamente.