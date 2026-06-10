const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../app_server/models/user');

const jwtSecret = process.env.JWT_SECRET || 'travlrSecret123';

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  const user = new User({ name: req.body.name, email: req.body.email, hash: '' });
  user.setPassword(req.body.password);
  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err });
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.validPassword(req.body.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err });
  }
};

module.exports = { register, login };
