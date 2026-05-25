# Command Log

All shell commands run during project setup, in order.

## Environment Setup

```bash
# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Django dependencies
pip install django djangorestframework django-cors-headers
```

## Django Backend

```bash
# Scaffold Django project and API app
django-admin startproject config backend
cd backend
python manage.py startapp api

# Run database migrations
cd /Users/jameskeary/Projects/heavy-shrug-website
source venv/bin/activate
cd backend
python manage.py migrate
```

## React Frontend

```bash
# Scaffold Vite + React frontend
npm create vite@latest frontend -- --template react

# Install frontend dependencies
cd frontend
npm install
npm install react-router-dom axios
```

## Development Servers

```bash
# Start Django backend (from project root)
source venv/bin/activate && cd backend && python manage.py runserver

# Start React frontend (from project root, separate terminal)
cd frontend && npm run dev
```

## Freeze Dependencies

```bash
pip freeze > backend/requirements.txt
```
