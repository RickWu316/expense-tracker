const mongoose = require('mongoose')
const Schema = mongoose.Schema

// require('./config/mongoose')

const CategorySchema = new Schema({
    category_name: {
        type: String,
        required: true
    },
    category_name_CN: {
        type: String,

    },
    icon: {
        type: String,
    }
})

module.exports = mongoose.model('Category', CategorySchema)
