from fastapi import FastAPI
from app.routes import tasks
from fastapi.middleware.cors import CORSMiddleware
from app.models import task_model
from app.database import engine
import os

FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI()


@app.on_event("startup")
def on_startup():
    task_model.Base.metadata.create_all(bind=engine)


origins = ["http://localhost:5173", "http://localhost:3000"]

if FRONTEND_URL is not None:
    origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)


@app.get("/health")
def health():
    return {"status": "ok"}
