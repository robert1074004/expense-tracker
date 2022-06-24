const Record = require('../record')
const db = require('../../config/mongoose')
db.once('open',() => {
    for (let i = 0 ; i < 5; i++) {
        Record.create({name:'晚餐',date:'2022-06-10',amount:(i+1)*10,categoryFontawesome:'fa-solid fa-utensils',categoryName:'餐飲食品'})
    }
    console.log('done')
})