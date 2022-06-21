const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true})
const db = mongoose.connection
db.on('error',() => {
    console.log('mongodb error!')
})
db.once('open',() => {
    console.log('mongodb connected!')
    for (let i = 0 ; i < 10; i++) {
        Record.create({name:'晚餐',date:'2022/6/10',amount:(i+1)*10,categoryId:mongoose.Types.ObjectId("62a2dd3595447d3e2804ca70")})
    }
})