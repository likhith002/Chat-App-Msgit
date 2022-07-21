const User = require("../Models/userModel");
const generateToken = require("../Config/generateToken");

const register = async (req, res) => {
  //   async () => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all feilds" });
  }

  const user_exists = await User.findOne({ email });

  if (user_exists) res.status(400).json({ message: "User already Exists" });

  const user = await User.create({ name, email, password, pic });

  if (user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  else res.status(400).json({ message: "Registration Failed" });
  //   };
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log("user");
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else res.status(400).json({ message: "Bad Credentials" });
};

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports = { register, authUser, allUsers };
