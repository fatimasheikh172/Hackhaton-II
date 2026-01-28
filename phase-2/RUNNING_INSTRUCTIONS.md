# Todo App - Setup and Running Instructions

## Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

## Setting up the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
# Or if requirements.txt doesn't exist:
pip install fastapi uvicorn sqlmodel python-jwt bcrypt passlib[bcrypt] python-multipart python-dotenv
```

3. Create a `.env` file in the backend directory with the following content:
```env
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./todo_app.db
```

4. Start the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The backend server will be available at `http://localhost:8000` .

## Setting up the Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory with the following content:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Running Both Servers Together

For the application to work properly, both the backend and frontend servers need to be running simultaneously.

## Troubleshooting

### "Network error. Please check your connection and try again."
This error occurs when the frontend cannot connect to the backend API. Make sure:
1. The backend server is running on `http://localhost:8000`
2. The `NEXT_PUBLIC_API_URL` in your frontend `.env.local` file is set correctly
3. There are no firewall or proxy settings blocking the connection

### "Server not found. Please check if the backend is running."
This error indicates that the backend server is not accessible. Please start the backend server using:
```bash
cd backend && uvicorn main:app --reload --port 8000
```

### Environment Variables
Make sure both the backend `.env` file and frontend `.env.local` file are properly configured as shown above.