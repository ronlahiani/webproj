const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tasktSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    finishDate:{
        type: String,
        required: true
    },
    importantLevel:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    name:{
        type:String
    }
//timestamps -write when the object created.
},{timestamps:true})

//creating model and export it 
const Task = mongoose.model('Task', tasktSchema);
module.exports = Task;
