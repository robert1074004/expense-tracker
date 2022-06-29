const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/category/:categoryName', (req, res) => {
    const userId = req.user._id
    const categoryName = req.params.categoryName 
    Record.find({categoryName,userId})
          .lean()
          .then(records => {
              let totalAmount = 0
              records.forEach(record => {
                totalAmount += record.amount
              })
              res.render('index',{records,totalAmount})
          })
          .catch(error => console.error(error)) 
  })
  
  router.get('/new',(req,res) => {
    Category.find()
            .lean()
            .then(categorys => {
                  res.render('new',{categorys})
              })
            .catch(error => console.error(error))
  })
  
  router.post('/',(req,res) => {
    const userId = req.user._id
    const {name,date,category,amount} = req.body
    Category.findOne({name:category})
            .lean()
            .then(category => {
              Record.create({name,date,categoryFontawesome:category.fontawesome,categoryName:category.name,amount,userId})
                .then(() => res.redirect('/'))
                .catch(error => console.log(error))
            })
            .catch(err => console.log(err))
  })
  
  
  
  router.get('/:id/edit',(req,res) => {
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
  
  router.put('/:id',(req,res) => {
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
  
  router.delete('/:id',(req,res) => {
    const id = req.params.id
     Record.findById(id)
              .then(record => record.remove())
              .then(() => res.redirect('/'))
              .catch(err => console.log(err))
  })

module.exports = router