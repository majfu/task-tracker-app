from fastapi import FastAPI
from app.routes import task_group

app = FastAPI()

app.include_router(task_group.router)


@app.get("/health")
def health():
    return {"status": "ok"}
