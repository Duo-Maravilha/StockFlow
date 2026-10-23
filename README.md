# StockFlow

> Sistema de Gestão de Inventário e Armazém

O **StockFlow** é uma aplicação de gestão de inventário desenvolvida para uma pequena empresa de distribuição comercial que pretende substituir o controlo de stock realizado através de folhas de cálculo por uma solução centralizada, segura e consistente.

O projeto disponibiliza uma **API REST** para gestão de produtos, categorias, fornecedores, stock, movimentos de entrada e saída, utilizadores e histórico de operações.

O principal objetivo é garantir que o inventário se mantém atualizado, que todas as operações ficam devidamente registadas e que os diferentes utilizadores possuem apenas as permissões que lhes são atribuídas.

---

## 📋 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Modelo de dados](#-modelo-de-dados)
- [API REST](#-api-rest)
- [Regras de negócio](#-regras-de-negócio)
- [Segurança](#-segurança)
- [Validação e tratamento de erros](#-validação-e-tratamento-de-erros)
- [Testes](#-testes)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Execução](#-execução)
- [Docker](#-docker)
- [Documentação da API](#-documentação-da-api)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Critérios de aceitação](#-critérios-de-aceitação)
- [Roadmap](#-roadmap)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 📦 Sobre o projeto

Uma empresa de distribuição comercializa produtos para diferentes clientes e atualmente utiliza folhas de cálculo para controlar o inventário.

Este processo apresenta vários problemas:

- dificuldade em saber o stock disponível;
- existência de produtos duplicados;
- falta de documentação adequada das entradas e saídas;
- dificuldade em identificar produtos com stock reduzido;
- dificuldade em consultar o histórico de movimentos;
- ausência de controlo de acesso para os funcionários.

O **StockFlow** pretende resolver estes problemas através de uma aplicação centralizada com uma API REST, persistência em PostgreSQL, regras de negócio implementadas no backend e controlo de acesso baseado em perfis.

---

## 🎯 Objetivos

O sistema deverá permitir:

- gerir produtos;
- gerir categorias;
- gerir fornecedores;
- controlar entradas de stock;
- controlar saídas de stock;
- consultar o inventário;
- pesquisar e filtrar produtos;
- identificar produtos com stock reduzido;
- consultar o histórico de movimentos;
- gerir utilizadores;
- controlar permissões;
- disponibilizar uma API REST documentada;
- garantir a integridade dos dados;
- manter as operações de stock transacionais.

---

## ✨ Funcionalidades

### Produtos

- Criar produtos;
- Consultar produtos;
- Atualizar produtos;
- Ativar/desativar produtos;
- Pesquisar por nome ou SKU;
- Filtrar por categoria e estado;
- Ordenar resultados;
- Paginar resultados;
- Identificar produtos com stock reduzido.

Cada produto possui, entre outros, os seguintes dados:

| Campo | Descrição |
|---|---|
| `id` | Identificador único |
| `sku` | Código único do produto |
| `name` | Nome comercial |
| `description` | Descrição opcional |
| `category` | Categoria do produto |
| `costPrice` | Preço de custo |
| `salePrice` | Preço de venda |
| `quantity` | Stock atual |
| `minimumStock` | Stock mínimo |
| `active` | Estado do produto |
| `createdAt` | Data de criação |

### Categorias

Permite:

- criar categorias;
- consultar categorias;
- editar categorias;
- desativar categorias;
- associar produtos a categorias.

### Fornecedores

Permite gerir:

- nome;
- NIF;
- email;
- telefone;
- morada.

Os fornecedores podem ser associados às entradas de mercadoria.

### Entradas de stock

Cada entrada regista:

- produto;
- quantidade recebida;
- fornecedor;
- data e hora;
- utilizador responsável;
- referência documental opcional;
- observações opcionais.

A atualização do stock e o registo do movimento devem ocorrer dentro da mesma transação.

### Saídas de stock

As saídas permitem retirar produtos do inventário, respeitando as regras de negócio definidas.

Uma saída:

- deve possuir quantidade superior a zero;
- não pode ultrapassar o stock disponível;
- fica associada ao utilizador responsável;
- deve permitir reconstruir a evolução do stock.

### Histórico

Cada produto possui um histórico dos seus movimentos, incluindo:

- tipo de movimento;
- quantidade;
- data;
- hora;
- utilizador responsável;
- stock anterior;
- stock posterior.

Os movimentos históricos não devem ser alterados livremente.

### Alertas de stock

O sistema identifica automaticamente produtos cujo stock seja:

```text
stock atual <= stock mínimo
```

Por exemplo:

```text
Stock atual: 4
Stock mínimo: 5

→ Produto com stock reduzido
```

---

## 🛠️ Tecnologias

### Obrigatórias

| Tecnologia | Utilização |
|---|---|
| Java 21+ | Linguagem de programação |
| Spring Boot | Framework principal |
| Spring Web | API REST |
| Spring Data JPA | Persistência |
| Spring Security | Autenticação e autorização |
| Bean Validation | Validação dos pedidos |
| PostgreSQL | Base de dados |
| Maven | Gestão do projeto |
| JUnit 5 | Testes |
| Mockito | Testes unitários |
| Swagger / OpenAPI | Documentação da API |
| Git / GitHub | Versionamento |

### Recomendadas

- Flyway — migrações da base de dados;
- Docker;
- Docker Compose;
- Testcontainers;
- GitHub Actions;
- SonarQube ou ferramenta equivalente de análise estática.

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura por camadas, separando responsabilidades entre os diferentes componentes da aplicação.

```text
┌──────────────────────────────┐
│          Cliente             │
│ Postman / Swagger / Frontend │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│        Controllers           │
│   REST endpoints + validação │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│          Services            │
│   Regras de negócio +        │
│       transações             │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Repositories          │
│       Spring Data JPA        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         PostgreSQL           │
│     Dados persistentes       │
└──────────────────────────────┘
```

### Responsabilidades

#### Controller

Responsável por:

- receber pedidos HTTP;
- validar os dados de entrada;
- devolver respostas HTTP;
- encaminhar as operações para os services.

#### Service

Responsável por:

- implementar as regras de negócio;
- controlar operações transacionais;
- validar operações de stock;
- coordenar diferentes repositories.

#### Repository

Responsável por:

- acesso à base de dados;
- operações CRUD;
- consultas específicas;
- persistência através do Spring Data JPA.

---

## 🗄️ Modelo de dados

O modelo contempla, no mínimo, as seguintes entidades:

```text
User
 │
 │
 └──────────────┐
                │
                ▼
         StockMovement
          │         │
          │         │
          ▼         ▼
       Product   Supplier
          │
          │
          ▼
       Category
```

### Entidades principais

#### Product

Representa um produto existente no inventário.

Principais atributos:

- ID;
- SKU;
- nome;
- descrição;
- preço de custo;
- preço de venda;
- quantidade;
- stock mínimo;
- estado;
- data de criação.

#### Category

Representa a categoria de um produto.

#### Supplier

Representa um fornecedor de mercadoria.

#### StockMovement

Representa uma entrada ou saída de stock.

#### User

Representa um utilizador da aplicação, incluindo as respetivas credenciais, perfil e estado.

As relações, chaves primárias, chaves estrangeiras e restrições devem ser definidas no modelo de dados da aplicação.

---

## 🌐 API REST

### Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/products` | Criar produto |
| `GET` | `/api/products` | Listar/pesquisar produtos |
| `GET` | `/api/products/{id}` | Consultar produto |
| `PUT` | `/api/products/{id}` | Atualizar produto |
| `PATCH` | `/api/products/{id}/status` | Alterar estado |

### Stock

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/stock-movements/inbound` | Registar entrada |
| `POST` | `/api/stock-movements/outbound` | Registar saída |
| `GET` | `/api/products/{id}/movements` | Consultar histórico |
| `GET` | `/api/products/low-stock` | Consultar produtos com stock reduzido |

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Autenticar utilizador |

> Os endpoints apresentados correspondem à proposta inicial da especificação e poderão ser ajustados durante o desenvolvimento, desde que a API mantenha uma estrutura clara e consistente.

---

## 📏 Regras de negócio

### Produtos

- O SKU deve ser único.
- Os preços não podem ser negativos.
- A quantidade inicial não pode ser negativa.
- Um produto desativado não deve receber novas operações comerciais.
- A eliminação de um produto não pode comprometer o histórico de movimentos.

### Entradas

- A quantidade recebida deve ser válida.
- A entrada deve ficar associada a um produto.
- A entrada deve ficar associada ao fornecedor.
- O utilizador responsável deve ser registado.
- O registo do movimento e a atualização do stock devem ocorrer na mesma transação.

### Saídas

- A quantidade deve ser superior a zero.
- Não é permitido retirar mais unidades do que as existentes.
- A operação deve ficar associada ao utilizador responsável.
- O sistema deve manter informação suficiente para reconstruir a evolução do stock.
- Uma operação inválida não pode deixar o inventário parcialmente atualizado.

### Histórico

Os movimentos devem ser tratados como registos de auditoria.

Quando for necessário corrigir uma operação, deverá ser utilizado um mecanismo controlado de correção ou estorno em vez de alterar livremente o movimento original.

---

## 🔐 Segurança

A aplicação possui dois perfis iniciais:

### ADMIN

Pode:

- gerir utilizadores;
- gerir produtos;
- gerir fornecedores;
- gerir categorias;
- gerir movimentos.

### FUNCIONÁRIO

Pode:

- consultar produtos;
- registar entradas;
- registar saídas.

As permissões devem ser aplicadas **no backend**, através do Spring Security, e não apenas através da ocultação de funcionalidades numa eventual interface gráfica.

---

## ✅ Validação e tratamento de erros

Os pedidos da API devem ser validados através de **Bean Validation**.

Exemplos de validações:

```text
SKU obrigatório
SKU único
Nome obrigatório
Preço >= 0
Quantidade >= 0
Stock mínimo >= 0
Quantidade de saída > 0
Quantidade de saída <= stock disponível
```

As respostas de erro devem utilizar códigos HTTP adequados e fornecer informação suficientemente clara para o cliente identificar o problema.

Exemplo:

```json
{
  "status": 400,
  "message": "A quantidade solicitada excede o stock disponível."
}
```

---

## 🧪 Testes

O projeto utiliza:

- **JUnit 5**;
- **Mockito**;
- testes unitários;
- testes de integração.

### Cenários principais

Devem ser testados, pelo menos, os seguintes casos:

- criação de produto válido;
- rejeição de SKU duplicado;
- entrada de stock;
- atualização do stock após entrada;
- saída de stock válida;
- rejeição de saída superior ao stock;
- rollback de operações inválidas;
- associação dos movimentos ao utilizador;
- controlo de permissões;
- pesquisa de produtos;
- paginação;
- identificação de produtos com stock reduzido.

Executar os testes com:

```bash
./mvnw test
```

No Windows:

```powershell
.\mvnw.cmd test
```

---

## 💻 Pré-requisitos

Antes de executar o projeto é necessário ter instalado:

- Java 21 ou superior;
- Maven, caso não seja utilizado o Maven Wrapper;
- PostgreSQL;
- Git.

Opcionalmente:

- Docker;
- Docker Compose.

Verificar a versão do Java:

```bash
java -version
```

---

## 🚀 Instalação

Clonar o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entrar na pasta:

```bash
cd stockflow
```

Construir o projeto:

```bash
./mvnw clean install
```

No Windows:

```powershell
.\mvnw.cmd clean install
```

---

## ⚙️ Configuração

A aplicação necessita de uma ligação ao PostgreSQL.

Exemplo de configuração:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/stockflow
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=validate

spring.jpa.properties.hibernate.format_sql=true
```

> Os valores reais de configuração devem ser definidos através de variáveis de ambiente ou de um ficheiro de configuração local que não seja enviado para o GitHub.

Exemplo:

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stockflow
DB_USERNAME=postgres
DB_PASSWORD=********
```

**Nunca guardar passwords ou outras credenciais diretamente no repositório.**

---

## ▶️ Execução

Depois de configurar a base de dados, executar:

```bash
./mvnw spring-boot:run
```

No Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Por defeito, a aplicação ficará disponível em:

```text
http://localhost:8080
```

---

## 🐳 Docker

O projeto poderá ser executado através de Docker Compose.

Exemplo de arquitetura:

```text
┌─────────────────┐
│   StockFlow API │
│   Spring Boot   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
└─────────────────┘
```

Executar:

```bash
docker compose up --build
```

Parar os containers:

```bash
docker compose down
```

Para remover também os volumes:

```bash
docker compose down -v
```

---

## 📚 Documentação da API

A API deverá ser documentada através de **Swagger/OpenAPI**.

Depois de executar a aplicação, a documentação estará disponível no endpoint configurado pelo projeto.

Exemplo habitual:

```text
http://localhost:8080/swagger-ui/index.html
```

A documentação deverá permitir:

- consultar os endpoints;
- visualizar parâmetros;
- consultar modelos de dados;
- testar pedidos;
- consultar respostas;
- compreender os requisitos de autenticação.

---

## 📁 Estrutura do projeto

A estrutura recomendada é:

```text
stockflow/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── .../
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       ├── exception/
│   │   │       ├── security/
│   │   │       └── config/
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/
│   │           └── migration/
│   │
│   └── test/
│       └── java/
│
├── .gitignore
├── docker-compose.yml
├── pom.xml
└── README.md
```

A organização poderá ser adaptada conforme a arquitetura adotada durante o desenvolvimento.

---

## ☑️ Critérios de aceitação

| Requisito | Estado |
|---|:---:|
| Criar produto com dados válidos | ⬜ |
| Rejeitar produtos com SKU duplicado | ⬜ |
| Registar entrada e atualizar stock | ⬜ |
| Rejeitar saída superior ao stock | ⬜ |
| Impedir alterações parciais em operações inválidas | ⬜ |
| Associar movimentos ao utilizador | ⬜ |
| Restringir operações de acordo com o perfil | ⬜ |
| Pesquisa e paginação corretas | ⬜ |
| Identificação de stock reduzido | ⬜ |
| Testes automatizados e aplicação configurada | ⬜ |

À medida que cada requisito for implementado e testado, o estado poderá ser alterado para:

```text
✅ Concluído
```

---

## 🗺️ Roadmap

### Fase 1 — Planeamento e estrutura

- [ ] Criar repositório GitHub
- [ ] Criar projeto Spring Boot
- [ ] Configurar Java 21
- [ ] Configurar PostgreSQL
- [ ] Definir entidades
- [ ] Definir relações
- [ ] Criar modelo da base de dados

### Fase 2 — Funcionalidades principais

- [ ] Produtos
- [ ] Categorias
- [ ] Fornecedores
- [ ] CRUD
- [ ] Validações
- [ ] Pesquisa
- [ ] Paginação

### Fase 3 — Gestão de stock

- [ ] Entradas
- [ ] Saídas
- [ ] Transações
- [ ] Alertas de stock
- [ ] Histórico
- [ ] Auditoria

### Fase 4 — Segurança e testes

- [ ] Spring Security
- [ ] Autenticação
- [ ] Perfis ADMIN/FUNCIONÁRIO
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testcontainers

### Fase 5 — Finalização

- [ ] Swagger/OpenAPI
- [ ] Docker Compose
- [ ] Migrações Flyway
- [ ] GitHub Actions
- [ ] Análise estática
- [ ] Diagrama de entidades
- [ ] Exemplos de pedidos/respostas
- [ ] Screenshots/demonstração
- [ ] Revisão do README

---

## 📊 Estado atual

> 🚧 **Em desenvolvimento**

O projeto encontra-se em desenvolvimento. O objetivo inicial é disponibilizar uma API REST funcional capaz de ligar ao PostgreSQL e permitir criar e consultar produtos com validação e testes básicos.

Posteriormente serão implementados os movimentos de stock, segurança, histórico, auditoria e restantes funcionalidades.

---

## 👨‍💻 Autor

**[Nome do autor]**

Projeto desenvolvido como parte do portefólio académico/profissional.

---

## 📄 Licença

Este projeto poderá ser distribuído ao abrigo da licença:

```text
Este projeto está licenciado ao abrigo da MIT License.

Copyright (c) 2026 Daniel Silva e Luigy Lima

É permitido utilizar, copiar, modificar, fundir, publicar, distribuir, sublicenciar e/ou vender cópias do software, desde que o aviso de copyright e o texto da licença sejam mantidos nas cópias ou partes substanciais do software.
```

---
