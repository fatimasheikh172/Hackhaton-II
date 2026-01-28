# Quickstart Guide

## Prerequisites
- Node.js 18+ with npm
- Python 3.11+
- PostgreSQL (for production) or SQLite (for development)
- Docker and Docker Compose (optional, for containerized setup)

## Setup Instructions

### 1. Clone and Initialize Repository
```bash
git clone [repository-url]
cd [repository-name]
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file:
```env
DATABASE_URL=sqlite:///./todo_app.db
BETTER_AUTH_SECRET=your-super-secret-key-here
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

### 4. Run the Application

**Option A: Separate terminals**
```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Option B: Using Docker Compose**
```bash
docker-compose up --build
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs