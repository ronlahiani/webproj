const express = require('express');
const bodyParser = require('body-parser');
const {getUser,getUsers} = require('../controllers/userController')

const router = express.Router();

// Use body-parser middleware to parse request bodies
router.use(bodyParser.json());


router.get("/", getUsers);
router.get("/user", getUser);
module.exports = router;