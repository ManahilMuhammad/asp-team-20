const { User } = require("../models");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const verifyPasswordStrenght = (password) => {
  if (password.length < 6) return 'Password is too short';
  
  const regex = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  if (!regex.test(password)) return 'Password must contain at least one uppercase letter and one symbol';

  return true;
}

module.exports.registerUser = async (req, res) => {
  const { name, email, password, age, goal, avatar } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const passwordStrength = verifyPasswordStrenght(password);
    if (typeof passwordStrength === 'string') return res.status(400).json({ error: passwordStrength });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, age, goal, avatar });

    res.status(201).json({ id: user.id, name: user.name, email: user.email, avatar: user.avatar, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Send token and user data to client to ensure data sync across devices
    res.json({ token: generateToken(user.id), user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
