const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 


const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')


app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})