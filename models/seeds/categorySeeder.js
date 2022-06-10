const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const category = ['家居物業','交通出行','休閒娛樂','餐飲食品','其他']
const db = mongoose.connection
db.on('error',() => {
    console.log('mongodb error!')
})
db.once('open',() => {
    console.log('mongodb connected!')
    category.forEach(i => Category.create({name:i}))  
})