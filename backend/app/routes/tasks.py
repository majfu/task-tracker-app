from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import case
from sqlalchemy.orm import Session
from app.models import task_model
from app.deps import get_db
from app.schemas import task_schemas

router = APIRouter(prefix="/api/tasks")


@router.post("/", status_code=status.HTTP_200_OK)
def create_task(
        task: task_schemas.TaskCreate,
        db: Session = Depends(get_db)
):
    db_task = task_model.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        effort_estimate=task.effort_estimate
    )

    try:
        db.add(db_task)
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Something went wrong while creating the task...")

    return db_task


@router.get("/", status_code=status.HTTP_200_OK)
def get_tasks(db: Session = Depends(get_db)):
    tasks = (
        db.query(task_model.Task)
        .order_by(
            task_model.Task.due_date.asc().nullslast()
        )
        .all()
    )

    return tasks


@router.delete("/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(
        task_id: int,
        db: Session = Depends(get_db)
):
    db_task = db.query(task_model.Task).filter(task_model.Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Could not find the task...")

    try:
        db.delete(db_task)
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Something went wrong while deleting the task...")
