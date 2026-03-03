const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyRecaptcha = require("../utils/verifyRecaptcha");

const register = async (req, res) => {
  try {
    const { name, email, mobile, password, role, captcha } = req.body;
    if (!captcha) {
      return res.status(400).json({ message: "Captcha is required" });
    }
    const isHuman = await verifyRecaptcha(captcha);
    if (!isHuman) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: role || "farmer"
    });
    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};


const login = async (req, res) => {
  try {
    const { email, password, captcha } = req.body;
    if (!captcha) {
      return res.status(400).json({ message: "Captcha is required" });
    }
    const isHuman = await verifyRecaptcha(captcha);
    if (!isHuman) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
module.exports= {register,login}