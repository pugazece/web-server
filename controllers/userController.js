import bcrypt from 'bcrypt'

import User from '../models/User.js'

// Register User
export const register = async (request, response) => {
  const { email, password, confirmPassword, name } = request.body

  // Validate request params
  if (!email || !password || !confirmPassword || !name)
    return response.status(400).json({ message: 'Missing required parameter' })
  else if (password !== confirmPassword)
    return response.status(400).json({ message: 'Passwords do not match' })

  // Encrypt password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    })
    response.status(201).json(user)
  } catch (error) {
    if (error.message.includes('duplicate key error')) {
      response.status(400).json({ message: 'Email already in use' })
    } else {
      response.status(500).json({ message: error.message })
    }
  }
}

// Login user
export const login = async (request, response) => {
  const { email, password } = request.body

  // Validate request params
  if (!email || !password)
    return response.status(400).json({ message: 'Missing required parameter' })

  try {
    const user = await User.findOne({ email })

    if (!user) return response.status(404).json({ message: 'User not found' })

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword)
      return response.status(404).json({ message: 'Invalid email or password' })

    response.status(200).json(user)
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
}

// Logout user
export const logout = (request, response) => {
  response.status(200).json({ message: 'Logged out' })
}
