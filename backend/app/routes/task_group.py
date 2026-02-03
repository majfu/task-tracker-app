from fastapi import APIRouter
from app.firebase import db
from datetime import datetime

router = APIRouter(prefix="/api/task-group")


@router.get("/all")
def get_all_task_groups():
    docs = (
        db.collection("TaskGroup")
        .order_by("created_at")
        .stream()
    )

    task_groups = []

    for doc in docs:
        task_groups.append({
            "id": doc.id,
            **doc.to_dict()
        })

    return task_groups
