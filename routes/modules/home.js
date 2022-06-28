const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
    const userId = req.user._id
    Record.find({userId})
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

  module.exports = router