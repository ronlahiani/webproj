import { useEffect, useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
// components
import TasksDetails from '../components/TasksDetails'

import TaskForm from "../components/TaskForm"
const Home = () => {
  const {tasks,dispatch} = useTasksContext()
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/tasks')
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_TASKS',payload:json})
      }
    }

    fetchWorkouts()
  }, [dispatch])
  return (
    <div className="home">
      <div className="tasks">
        <h1>My Tasks</h1>
        <div className="task-list">
          {tasks &&
            tasks.map((task) => (
              <TasksDetails task={task} key={task._id} />
            ))}
        </div>
      </div>
      <TaskForm />
    </div>
  );
  
            }
export default Home