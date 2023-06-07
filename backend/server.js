const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
//express app
const app = express();


const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
//using the routers with the app
//when we make request to the route then use workoutRoutes
app.use('/api/tasks',taskRoutes)
app.use('/api/users',userRoutes)


//setting the requests as json object
app.use(express.json())

//middleware so we can advance with requests.
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

//connect to db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
    console.log(`connected to db && Listening on port ${process.env.PORT}`);
});

}).catch((err)=>{
    console.log(err);
})

