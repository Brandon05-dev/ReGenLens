# Deployment Guide

## Quick Deploy Options

### Vercel (Frontend)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Brandon05-dev/ReGenLens)

### Railway (Backend)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/ReGenLens)

## Manual Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd backend
# Set environment variables
# Deploy backend folder
```

## Environment Variables

See `.env.example` files for required configuration.

## Database Setup

Run the SQL provided in `backend/supabaseClient.js` to create the required tables.