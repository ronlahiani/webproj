const User = require('../models/userModel');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await User.findOne({ name: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password.toString()) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Authentication successful
    res.status(200).json(user); // Return the entire user object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getUsers=async(req,res)=>{
  try {
    const users = await User.find({ type: 'Worker' }); // Retrieve users with type "Worker"
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  getUser,
  getUsers
};
