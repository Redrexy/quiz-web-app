# Trivia Web App

A simple trivia web app where users can choose a mode and submit to a leaderboard. The project uses React for the frontend and Django for the backend with PostgreSQL for the database.

## Tech Stack
- Frontend: React, JavaScript, CSS
- Backend: Django, Python
- Database: PostgreSQL

## Setup

### Setup for React

```bash
cd react
npm install
npm start
```

### Setup for Django

```bash
cd django
py -3 -m venv .venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Running the app
1. Start Django backend
   ```bash
   python manage.py runserver
   ```
2. In a separate terminal, start the React frontend
   ```bash
   npm start
   ```
3. App should be running!
