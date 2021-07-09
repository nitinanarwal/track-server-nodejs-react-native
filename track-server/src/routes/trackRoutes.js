const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
const route = require('./authRoutes')

const Track = mongoose.model('Track')

const router = express.Router()
// User can access links after requireauth(User))
route.use(requireAuth)
// Get Track
route.get('/tracks', async (req, res) => {
  // Query db to find tracks with userid get from after requireauth
  const tracks = await Track.find({ userId: req.user._id })
  // Send all tracks in response
  res.send(tracks)
})
// Post Track
route.post('/tracks', async (req, res) => {
  const { name, locations } = req.body
  if (!name || !locations) {
    req.status(422).send({ error: 'You must provide a name and locations' })
  }
  try {
    const track = new Track({ name, locations, userId: req.user._id })
    await track.save()
    console.log(track)
    res.send(track)
  } catch (error) {
    res.status(422).send({ error: error.message })
  }
})

module.exports = router
