// VERFIY TOKEN AND SEND RESPONE (USER DETIALS)
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
  // Desstructure header for bearer token
  const { authorization } = req.headers
  if (!authorization) {
    // Header doesn't have bearer token
    return res.status(401).send({ error: 'You must be logged in' })
  }
  // Break token from header
  const token = authorization.replace('Bearer ', '')
  // Verfity token with key and run callback
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      // if token doesn't match
      res.status(401).send({ error: 'You must be logged in' })
    }
    // token match then destructure payload
    const { userId } = payload
    // Query to db by userId
    const user = await User.findById(userId)
    // Send user object in response
    req.user = user
    next()
  })
}
