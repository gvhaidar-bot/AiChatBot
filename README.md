# 🤖 AI Chatbot

Chatbot AI dengan Express backend + Clerk authentication.

## 📁 Struktur

```
aiChatbot/
├── frontend/   # UI (React/Vite/Next)
└── backend/    # API server (Express + Clerk)
```

## 🚀 Setup

### Prasyarat

- Node.js 18+
- npm / yarn / pnpm
- Akun Clerk

### 1. Clone repo

```bash
git clone https://github.com/username/aiChatbot.git
cd aiChatbot
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# isi .env dengan API key kamu
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
# isi .env dengan API key kamu
npm run dev
```

## 🛠 Tech Stack

**Backend:**

- Express
- Clerk (`@clerk/express`)
- Axios
- CORS
- dotenv

**Frontend:**

- (isi sendiri: React / Vite / Tailwind, dll)

## 🔐 Environment Variables

Lihat `.env.example` di tiap folder. **Jangan commit `.env` asli!**

## 📝 License

MIT
