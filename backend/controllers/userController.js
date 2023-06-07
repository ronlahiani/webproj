const User = require('../models/userModel');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
  const { email, password } = req.query;
  console.log(email,password)
  try {
    const user = await User.findOne({ name: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password.toString()) {
      console.log(user.password, password);
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Authentication successful
    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUser
};
