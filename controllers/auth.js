const User = require("../models/user");
const { generateToken, verifyToken } = require("../utils/jwt");

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = generateToken(user._id);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: "Password is incorrect" });
    }
    const token = generateToken(user._id);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
