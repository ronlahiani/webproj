import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      console.log('hi');
      return { 
        tasks: action.payload 
      }
    case 'CREATE_TASK':
      return { 
        tasks: [action.payload, ...state.tasks] 
      }
    case 'DELETE_TASK':
        return {
          //removing the tasks we dont want
          tasks: state.tasks.filter((s)=>
            s._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, { 
    tasks: null
  })
  
  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TasksContext.Provider>
  )
}