// DEFINE SERVER AND DATABASE CONNECTION HERE
require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()
// app use body parser
app.use(bodyParser.json())
// app use auth routes
app.use(authRoutes)
// app use track routes
app.use(trackRoutes)
// DB connection string with user and password
const mongoUri ='MONGO DB STRING'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err)
})
// Require auth for access
app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})
// Listening port
app.listen(3000, () => {
  console.log('listening on port 3000')
})
