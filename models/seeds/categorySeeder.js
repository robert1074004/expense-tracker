const mongoose = require('mongoose')
const Category = require('../category')
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const category = [{name:'家居物業',fontawesome:"fa-solid fa-house"},{name:'交通出行',fontawesome:"fa-solid fa-van-shuttle"},{name:'休閒娛樂',fontawesome:"fa-solid fa-face-grin-beam"},{name:'餐飲食品',fontawesome:"fa-solid fa-utensils"},{name:'其他',fontawesome:"fa-solid fa-pen"}]
const db = mongoose.connection
db.on('error',() => {
    console.log('mongodb error!')
})
db.once('open',() => {
    console.log('mongodb connected!')
    category.forEach(i => Category.create({name:i.name,fontawesome:i.fontawesome}))  
})