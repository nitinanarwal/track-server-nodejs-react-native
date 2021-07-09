// DEFINE USER SCHEMA / DCRYPT PASSWORD/ MATCH PASSWORD METHOD
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// Define db schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
// Run before saving user into db
userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  // Define salt with brcypt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    // Apply hash with salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      // Save user password with hash
      user.password = hash
      next()
    })
  })
})
// Compare method for input password with db password
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }

      if (!isMatch) {
        return reject(false)
      }
      // Password match then resolve
      resolve(true)
    })
  })
}

mongoose.model('User', userSchema)
