const express = require('express');
const bodyParser = require('body-parser');
const {getTasks,getTask,createTask,deleteTask,updateTask} = require('../controllers/taskController')

const router = express.Router();

// Use body-parser middleware to parse request bodies
router.use(bodyParser.json());

router.get("/", getTasks);

router.get("/:id",getTask);

router.post('/', createTask);

router.delete('/:id',deleteTask );

router.patch('/:id',updateTask);

module.exports = router;
