const Task = require('../models/taskModel');
const mongoose = require('mongoose')
//get all tasks

const getTasks = async (req, res) => {
    const { username } = req.params;
    console.log("server"+username);
  
    try {
      // Find tasks by username
      const tasks = await Task.find({ name: username }).sort({ createdAt: -1 });
      
  
      if (tasks.length === 0) {
        return res.status(404).json({ error: 'No tasks found for the provided username' });
      }
  
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}
  
//get a single task

const getTask = async (req, res) => {
    const { id } = req.params;
    const { username } = req.query;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such task' });
    }
  
    try {
      // Find task by username and ID
      const task = await Task.findOne({ _id: id, username });
  
      if (!task) {
        return res.status(404).json({ error: 'No such task' });
      }
  
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch task' });
    }

}
//create new task
const createTask = async(req,res)=>{
    const {title,finishDate,importantLevel,type,name} = req.body;
    try {
      const task = await Task.create({ title,finishDate,importantLevel,type, name});
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}

//delete a task
const deleteTask = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such task"})
    }

    const task = await Task.findOneAndDelete({_id:id})
    if(!task){
        return res.status(404).json({error:"No Such task"})
    }
    res.status(200).json(task)
}

// update a task
const updateTask = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such task"})
    }

    const task = await Task.findByIdAndUpdate({_id:id},{
       ...req.body
    })
    if(!task){
        return res.status(404).json({error:"No Such task"})
    }
    res.status(200).json(task)
}




module.exports = {getTasks,getTask,createTask,deleteTask,updateTask}