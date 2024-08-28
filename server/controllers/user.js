const User = require('../models/user');
const bcrypt = require('bcrypt');

async function handlesignupFunction(req, res) {
  try {
    const { name, email, password, age, gender } = req.body;
    const profile = req.file ? req.file.filename : null;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      email,
      password : hashedPassword,
      name,
      gender,
      age,
      profile,
    });
    
    return res.status(201).send({ msg: 'User Created successful', user });

  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Signup failed', error });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Failed to fetch users', error });
  }
}


const handleUpdateFunction = async (req, res) => {
  const { id } = req.params;
  const { name, email, age, gender } = req.body;
  const profile = req.file ? req.file.filename : undefined;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, gender, profile },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = {
  handlesignupFunction,
  getUsers,
  handleUpdateFunction,
};
