import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists"
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user"
    })
    await newUser.save();
    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const accessToken = jwt.sign({
      userId: user._id,
      username: user.username,
      role: user.role
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m"
    })

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
const getAllUsers = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const users = await User.find().select("-password -__v");

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}


export {
  registerUser,
  loginUser,
  getAllUsers,
  changePassword
}