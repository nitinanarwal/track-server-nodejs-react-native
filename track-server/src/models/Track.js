// DEFINE TRACK SCHEMA AND TIE UP WITH USER
const mongoose = require('mongoose')
// Define pointSchema for trackschema
const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
})
// Define trackschema
const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  locations: [pointSchema],
})

mongoose.model('Track', trackSchema)
