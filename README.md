# Fullstack Setup: Laravel PHP Backend + React Vite Frontend

A clean, decoupled setup with **Laravel (PHP)** for the backend and **React + Vite** for the frontend.

---

## 📁 Directory Structure

```
ZMD_WEB/
├── backend/          # Fresh Laravel (PHP) Backend Setup
└── frontend/         # Fresh React + Vite Frontend Setup
```

---

## 🚀 How to Run

### 1. Run Laravel PHP Backend

```bash
cd backend
php artisan serve
```
* The Laravel API backend will start on **`http://127.0.0.1:8000`**

### 2. Run React + Vite Frontend

```bash
cd frontend
npm run dev
```
* The React dev server will start on **`http://localhost:5173`**

## Delibot contact email setup

The contact form sends its confirmation email through Laravel. Copy
`backend/.env.example` to `backend/.env`, then set the SMTP values supplied by
your email provider:

```dotenv
MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=sender@your-domain.com
MAIL_PASSWORD=your-smtp-password-or-app-password
MAIL_FROM_ADDRESS=sender@your-domain.com
MAIL_FROM_NAME="ZMD"
```

Keep `backend/.env` private and never place SMTP credentials in the React
frontend. For Gmail or Google Workspace, use an app password rather than the
account's normal password.
