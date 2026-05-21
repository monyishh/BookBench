import User from "../model/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body

    // Input validation
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" })
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase()

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const hashPassword = await bcryptjs.hash(password, 10)

    // Create user
    const newUser = new User({
      fullname,
      email: normalizedEmail,
      password: hashPassword,
    })

    await newUser.save()

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "your-secret-key", // Use a secure key in production
      { expiresIn: "1h" }
    )

    // Respond with success
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
      token,
    })
  } catch (error) {
    console.error("Error: ", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

//user login check
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid username or password" })
    } else {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      })
    }
  } catch (error) {
    console.log("Error: " + error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}
