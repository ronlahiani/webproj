const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const UserSchema= new Schema({
name:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
},
type:{
    type: String,
    required: true
}


},{timestamps:true});
 //create a modole
 const Users= mongoose.model('Users',UserSchema);
 
 module.exports=Users;