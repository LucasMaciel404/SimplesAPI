# 📦 Luska API – Backend com NestJS

API desenvolvida com **NestJS**, **TypeORM** e **PostgreSQL**. Gerencia autenticação de usuários e um sistema de *cards* protegidos por autenticação JWT.

---

## 🧩 Funcionalidades

- ✅ Registro de usuários (`/auth/register`)
- ✅ Login com JWT (`/auth/login`)
- ✅ Recuperação de senha via e-mail (`/auth/recover`)
- ✅ Alteração de senha autenticada (`/auth/change-password`)
- ✅ CRUD completo de Cards:
  - Criar (`POST /cards`)
  - Listar (`GET /cards`)
  - Atualizar (`PATCH /cards/:id`)
  - Deletar (`DELETE /cards/:id`)
- 🔐 Todas as rotas de Cards são protegidas com JWT

---

## 🚀 Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (substitua com suas variáveis reais):

```env
# Banco de Dados PostgreSQL
DB_HOST=your_host
DB_PORT=your_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT
JWT_SECRET=your_jwt_secret

# E-mail (SMTP)
MAIL_HOST=your_smtp_host
MAIL_PORT=your_smtp_port
MAIL_USER=your_email_user
MAIL_PASS=your_email_password
MAIL_FROM="Your Name <your_email>"
```

> ⚠️ Nunca exponha esse arquivo em repositórios públicos!

### 4. Rode as migrações (se necessário)

```bash
npm run typeorm:migration:run
```

### 5. Inicie a aplicação

```bash
npm run start:dev
```

---

## 🧪 Testes

### Testes unitários

```bash
npm run test
```

### Testes de integração

```bash
npm run test:e2e
```

---

## 🛠️ Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/)
- [Jest](https://jestjs.io/)

---

## 🗂️ Estrutura do projeto

```
src/
├── auth/             # Módulo de autenticação
├── user/             # Módulo de usuário
├── card/             # Módulo de cards
├── mail/             # Módulo para envio de e-mails
test/                 # Testes de integração
```

---

## 👨‍💻 Desenvolvido por

**Lucas Maciel**  
📧 [maciellucas487@gmail.com](mailto:maciellucas487@gmail.com)