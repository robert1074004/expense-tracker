
const Category = require('../category')
const db = require('../../config/mongoose')

const category = [{name:'家居物業',fontawesome:"fa-solid fa-house"},{name:'交通出行',fontawesome:"fa-solid fa-van-shuttle"},{name:'休閒娛樂',fontawesome:"fa-solid fa-face-grin-beam"},{name:'餐飲食品',fontawesome:"fa-solid fa-utensils"},{name:'其他',fontawesome:"fa-solid fa-pen"}]

db.once('open',() => {
    category.forEach(i => Category.create({name:i.name,fontawesome:i.fontawesome}))
    console.log('done')  
})