from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.tasks.routes import router as tasks_router
from app.api.v1.auth.routes import router as auth_router
from app.core.config import settings
from app.database.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    # Startup
    create_db_and_tables()
    yield
    # Shutdown (if needed)


app = FastAPI(title="Todo API", version="1.0.0", lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "https://hackhaton-ii-five.vercel.app/", "https://huggingface.co", "https://fatimaasad.hf.space"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(tasks_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Todo API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}