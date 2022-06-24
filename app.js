
const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true}) 


const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
  Record.find()
        .lean()
        .then(records => {
            let totalamount = 0
            records.forEach(record => {
              totalamount += record.amount
            })
            res.render('index',{records,totalamount})
        })
        .catch(error => console.error(error)) 
})

app.get('/records/category/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName 
  Record.find({categoryName})
        .lean()
        .then(records => {
            let totalamount = 0
            records.forEach(record => {
              totalamount += record.amount
            })
            res.render('index',{records,totalamount})
        })
        .catch(error => console.error(error)) 
})

app.get('/records/new',(req,res) => {
  Category.find()
          .lean()
          .then(categorys => {
                res.render('new',{categorys})
            })
          .catch(error => console.error(error))
})

app.post('/records',(req,res) => {
  const {name,date,category,amount} = req.body
  Category.findOne({name:category})
          .lean()
          .then(category => {
            Record.create({name,date,categoryFontawesome:category.fontawesome,categoryName:category.name,amount})
              .then(() => res.redirect('/'))
              .catch(error => console.log(error))
          })
          .catch(err => console.log(err))
})



app.get('/records/:id/edit',(req,res) => {
  const id = req.params.id
  Record.findById(id)
        .lean()
        .then(record =>
          Category.find()
                  .lean()
                  .then(categorys => res.render('edit',{record,categorys})
          ))
        .catch(err => console.log(err))
})

app.post('/records/:id/edit',(req,res) => {
  const id = req.params.id
  const {name,date,category,amount} = req.body
  Category.findOne({name:category})
          .lean()
          .then(category => {
           Record.findById(id)
                    .then(record => {
                      record = Object.assign(record, req.body)
                      record.categoryName = category.name
                      record.categoryFontawesome = category.fontawesome
                      return record.save()  
                    })
                    .then(() => res.redirect(`/`))
                    .catch(error => console.log(error))
          })
          .catch(err => console.log(err))
})

app.get('/records/:id/delete',(req,res) => {
  const id = req.params.id
   Record.findById(id)
            .then(record => record.remove())
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})