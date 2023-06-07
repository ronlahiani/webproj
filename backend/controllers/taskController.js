const Task = require('../models/taskModel');
const mongoose = require('mongoose')
//get all tasks
const getTasks = async(req,res)=>{
    //finding all tasks
    const tasks = await Task.find().sort({createdAt:-1})
    res.status(200).json(tasks)
}

//get a single task

const getTask = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such task"})
    }

    //finding all tasks
    const task = await Task.findById(id)
    if(!task){
        return res.status(404).json({error:"No Such task"})
    }
    res.status(200).json(task);
}
//create new task
const createTask = async(req,res)=>{
    const { title,finishDate,importantLevel,type} = req.body;
    try {
      const task = await Task.create({ title,finishDate,importantLevel,type});
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