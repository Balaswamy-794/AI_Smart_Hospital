# Render Deployment Guide

This project is configured for Render using the root blueprint file [render.yaml](render.yaml).

## What Gets Deployed

1. Backend API (Flask + Gunicorn + Eventlet)
2. Appointment Service (Node.js + Express)
3. Frontend (React static site)

## One-Time Setup in Render

1. Open Render Dashboard.
2. Click **New +** -> **Blueprint**.
3. Connect GitHub repo: `Balaswamy-794/AI_Smart_Hospital`.
4. Select branch: `main`.
5. Render auto-detects [render.yaml](render.yaml) and creates all 3 services.

## Required Environment Variables

### Backend service: `ai-smart-hospital-backend`

- `HUGGINGFACE_API_KEY`: your Hugging Face token (required for chatbot/medical suggestions)
- `CORS_ORIGINS`: frontend URL (default in blueprint: `https://ai-smart-hospital-frontend.onrender.com`)

### Appointment service: `ai-smart-hospital-appointments`

- `MONGODB_URI`: your production MongoDB URI (optional if you want local JSON fallback)
- `CORS_ORIGIN`: frontend URL (default in blueprint: `https://ai-smart-hospital-frontend.onrender.com`)

### Frontend service: `ai-smart-hospital-frontend`

The blueprint already sets:

- `REACT_APP_API_ORIGIN`
- `REACT_APP_API_URL`
- `REACT_APP_BOOKING_API_ORIGIN`
- `REACT_APP_BOOKING_API_URL`

If Render assigns different subdomains, update these values in the frontend service settings and redeploy.

## Health Checks

After deploy:

1. Backend: `https://ai-smart-hospital-backend.onrender.com/api/health`
2. Frontend: open `https://ai-smart-hospital-frontend.onrender.com`
3. Appointment service: call an appointment endpoint from frontend

## Notes

- First request to free Render web services may be slow due to cold start.
- Backend uses [backend/wsgi.py](backend/wsgi.py) as Gunicorn entrypoint.
- Frontend uses SPA rewrite to `/index.html` so React Router routes work.