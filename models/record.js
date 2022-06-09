const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = newSchema({
    name: {
        type:String,
        required
    },
    date: {
        type:String,
        required
    },
    amount: {
        type:Number,
        required
    },
})

module.exports = mongoose.model('Record',recordSchema)