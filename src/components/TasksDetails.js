import { useState } from "react";
import {useTasksContext} from "../hooks/useTasksContext"
const TasksDetailes = ({task}) => {
    const {dispatch} = useTasksContext();
    const [isMarked, setIsMarked] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleMark = () => {
        setIsMarked(!isMarked);
      };
    const handleClickSelect = () => {
      setIsDeleted(!isDeleted)
    };
    const handleClick = async () => {
        const response = await fetch('/api/tasks/'+task._id , {method:'DELETE',})
        const json = await response.json()
        if(response.ok){
          dispatch({type:'DELETE_TASK',payload:json})
        }
    }

    return (
        <div
        className={`task-details ${isMarked ? 'marked' : ''} ${isDeleted ? 'deleted' : ''}`}
        onClick={handleMark}
      >
        <h3 className={isMarked ? 'marked' : ''}>{task.title}</h3>
        <div className="properties">
          <p><label>Created date:</label> {new Date(task.createdAt).toLocaleDateString()}</p>
          <p><label>Finish Date:</label> {task.finishDate}</p>
          <p><label>Important level:</label> {task.importantLevel}</p>
          <p><label>Type:</label> {task.type}</p>
        </div>
        {isMarked && !isDeleted && (
          <span className="material-symbols-outlined delete-button" onClick={handleClick}>
            Delete
          </span>
        )}
      </div>
      );
    };
export default TasksDetailes;