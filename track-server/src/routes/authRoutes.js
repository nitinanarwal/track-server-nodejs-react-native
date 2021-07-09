// SIGN UP_SIGN IN USER AND SEND JWT TOKEN
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()
// Sign up - Create User
router.post('/signup', async (req, res) => {
  // Destructure email and password for request body
  const { email, password } = req.body

  try {
    // Saving User in db
    const user = new User({ email, password })
    await user.save()
    // Create token - user id with key
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
    // Send token as response
    res.send({ token })
  } catch (err) {
    return res.status(422).send(err.message)
  }
})
// Sign In - Login User
router.post('/signin', async (req, res) => {
  // Destructure email and password for request body
  const { email, password } = req.body
  // Check for email and password input
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' })
  }
  // Query to db from email
  const user = await User.findOne({ email })
  if (!user) {
    // if didn't find email
    return res.status(422).send({ error: 'Invalid password or email' })
  }

  try {
    // Match imput password with db password
    await user.comparePassword(password)
    // Password match create token and send response
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
    res.send({ token })
  } catch (err) {
    // If password don't match
    return res.status(422).send({ error: 'Invalid password or email' })
  }
})

module.exports = router
