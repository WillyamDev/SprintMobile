
# SprintMobile

## 📱 Descrição Geral

- **Objetivo:** Prover uma plataforma simples e acessível para acompanhamento de sintomas em tempo real.
- **Público-alvo:** Estudantes, professores, funcionários e gestores escolares.
- **Funcionalidades principais:**
  - Registro de sintomas
  - Envio de feedbacks
  - Autenticação de usuários
  - Visualização de histórico
  - Integração com backend Node.js e banco de dados SQLite

---

## 🧰 Requisitos para Execução

### Requisitos do sistema:
- **Sistema Operacional:** Windows, macOS ou Linux
- **Node.js:** v14 ou superior
- **npm:** v6 ou superior
- **Expo CLI:** `npm install -g expo-cli`
- **Android Studio ou Emulador iOS** (para testes)
- **Dispositivo Android** (para instalação do APK)

---

## 🚀 Instalação e Execução

### 1. Clone o repositório:

```bash
git clone <URL-do-repositório>
cd SprintMobile-main
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Inicie o servidor backend:

```bash
cd Back-Sprint2-master
npm install
node server.js
```

### 4. Execute o aplicativo mobile:

```bash
cd ../SprintMobile-main
expo start
```

Use o app **Expo Go** no seu celular para escanear o QR Code ou execute num emulador Android/iOS.

---

### 5. Instalar APK

[👉 Clique aqui para baixar o APK](https://drive.google.com/uc?export=download&id=11hMs_NExtN5WQK-3t0YIiL4lFxnK_khO)

---

## 🛠️ Tecnologias Utilizadas

- **React Native** (Frontend mobile)
- **Expo** (Ambiente de desenvolvimento e build)
- **Node.js + Express** (Backend RESTful)
- **SQLite** (Banco de dados local)
- **JWT** (Autenticação)
- **Axios** (Requisições HTTP)

---

## 📁 Estrutura do Projeto

```
SprintMobile-main/
├── SprintMobile-main/        # App mobile (React Native)
│   ├── App.js
│   ├── assets/               # Imagens e fontes
│   ├── components/           # Componentes reutilizáveis
│   ├── screens/              # Telas do aplicativo
│   └── services/             # Configuração de API
├── Back-Sprint2-master/      # Backend (Node.js)
│   ├── app.js
│   ├── server.js
│   ├── controllers/          # Lógica de negócio
│   ├── db/                   # Banco de dados SQLite
│   ├── middlewares/          # Autenticação e validações
│   └── routes/               # Rotas da API
└── Documentação.pdf          # Documento descritivo do projeto
```

