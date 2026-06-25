from fastapi import FastAPI

app = FastAPI(
    title="HairFlow API",
    version="1.0.0",
    description="Smart Appointment Management Platform"
)

@app.get("/")
def root():
    return {
        "message": "HairFlow API is running!"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }