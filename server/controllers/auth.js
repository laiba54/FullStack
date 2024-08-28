const User = require('../models/user');
const {setUser} = require('../service/auth')
const {getUser} = require('../service/auth')
const bcrypt = require('bcrypt');

async function handleLoginFunction(req, res) {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).send({ msg: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).send({ msg: 'Invalid email or password' });
      }
      const token = setUser(user);
      res.cookie('uid', token, { httpOnly: true, maxAge: 31536000000 }); 
      user.token = token;
      await user.save()
      return res.status(200).send({ msg: 'Login successful', user });
  } catch (error) {
      console.error(error);
      res.status(500).send({ msg: 'Login failed', error });
  }
}

async function getLoginUsers(req, res) {
  const token = req.cookies.uid;
  if (!token) {
    return res.status(401).send({ msg: 'No token provided' });
  }
  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ msg: 'Failed to fetch users', error });
  }
}

const handleforgetpassword = async (req, res) => {
  try {
    const token = req.cookies?.uid;
    if (!token) {
      return res.status(401).send({
        success: false,
        msg: 'Unauthorized: No token provided',
      });
    }

    const user = getUser(token);
    if (!user) {
      return res.status(401).send({
        success: false,
        msg: 'Invalid token',
      });
    }

    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        msg: 'User not found',
      });
    }

    const { oldpassword, password, confirmpassword } = req.body;

    if (!oldpassword || !password || !confirmpassword) {
      return res.status(400).send({
        success: false,
        msg: 'All fields are required',
      });
    }

    // Compare old password with the stored hashed password
    const isMatch = await bcrypt.compare(oldpassword, existingUser.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        msg: 'Old password is incorrect',
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).send({
        success: false,
        msg: 'New passwords do not match',
      });
    }

    // Hash the new password and update
    const hashedPassword = await bcrypt.hash(password, 8);
    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(200).send({
      success: true,
      msg: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).send({
      success: false,
      msg: error.message,
    });
  }
};


module.exports = {
  getLoginUsers,
  handleLoginFunction,
  handleforgetpassword
}
