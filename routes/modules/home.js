const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
    const userId = req.user._id
    Record.find({userId})
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

  module.exports = router