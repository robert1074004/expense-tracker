const mongoose = require('mongoose')
const Record = require('../record')
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
const db = mongoose.connection
db.on('error',() => {
    console.log('mongodb error!')
})
db.once('open',() => {
    console.log('mongodb connected!')
    for (let i = 0 ; i < 5; i++) {
        Record.create({name:'晚餐',date:'2022-06-10',amount:(i+1)*10,categoryFontawesome:'fa-solid fa-utensils',categoryName:'餐飲食品'})
    }
})