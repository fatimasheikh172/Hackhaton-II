from fastapi import FastAPI

app = FastAPI(title="Todo API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Todo API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Run with: uvicorn minimal:app --reload --port 8000