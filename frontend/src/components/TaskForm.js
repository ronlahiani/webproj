import { format } from 'date-fns';

import { useTasksContext } from "../hooks/useTasksContext";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = () => {

    const {dispatch} = useTasksContext();
    const [title,setTitle] = useState('');
    const [importantLevel,setImportantLevel] = useState('low');
    const [type,setType] = useState('personal');
    const [error,setError] = useState('');
    const [finishDate, setFinishDate] = useState(null);
    const today = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const task = {title,finishDate,importantLevel,type}
        const response = await fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setTitle('')
          setFinishDate('')
          setImportantLevel('')
          setType('')

          console.log('new task added:', json)
          //rendering it in the home
          dispatch({type:'CREATE_TASK',payload: json})
        }
    
      }
      const handleDateChange = (date) => {
        setFinishDate(date);
      };

    return ( 
        <form  className="create" onSubmit={handleSubmit}>
        <h2>Add New Task </h2>
        <label >Task name: </label>
        <textarea
              onChange={(e) => setTitle(e.target.value)}
               value={title}
        ></textarea>
         <label >Finish date: </label>
         <DatePicker
        selected={finishDate}
        onChange={handleDateChange}
        dateFormat="dd.MM.yyyy"
        minDate={today}
        placeholderText="Select a date"
        popperPlacement="bottom-start"
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport',
          },
        }}
        value={finishDate ? format(finishDate, 'dd.MM.yyyy') : ''}
      />
       <div className="ImportantLevel">
        <label>Important Level:</label>
        <select className="combobox" onChange={(e) => setImportantLevel(e.target.value)} value={importantLevel}>
        <option value="low">Low</option>
        <option value="middle">Middle</option>
       <option value="high">High</option>
       </select>
       </div>
       <div className="Type">
       <label>Type of Task:</label>
       <select className="combobox" onChange={(e) => setType(e.target.value)} value={type}>
       <option value="personal">Personal</option>
       <option value="business">Business</option>
       </select>
       </div>

        <button className='add'>Add Task</button>
        {error && <div className="error">{error}</div>}
    </form>
     );
}
 
export default TaskForm;