const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = newSchema({
    name: {
        type:String,
        required
    },
    
})

module.exports = mongoose.model('User',userSchema)