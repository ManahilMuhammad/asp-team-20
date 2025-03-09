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
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const passwordStrength = verifyPasswordStrenght(password);
    if (typeof passwordStrength === 'string') return res.status(400).json({ error: passwordStrength });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ id: user.id, name: user.name, email: user.email, avatar: user.avatar, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.finalizeRegistration = async (req, res) => {
  const { age, /* weight, height, */ avatar, goal, email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user.id !== req.user.id) {
      console.warn("Attempt to override details for a different, user id of the author:", req.user.id);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (user.age !== null) return res.status(401).json({ error: 'Account already setup' });

    // Update values obtained from the setup steps
    await User.update({
      age, avatar, goal
    }, {
      where: {
        id: req.user.id
      }
    });

    // Save weight to fitness metric ?
    // await FitnessMetric.create({
    //   userId: user.id,
    //   weight
    // });

    return res.status(200).json({});
  } catch (error) {
    console.error('Unable to finalize registration:', error);
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
    res.json({ token: generateToken(user.id), user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar } });
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
