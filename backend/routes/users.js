const express = require('express');
const bodyParser = require('body-parser');
const {getUser} = require('../controllers/userController')

const router = express.Router();

// Use body-parser middleware to parse request bodies
router.use(bodyParser.json());

router.get("/", getUser);


module.exports = router;