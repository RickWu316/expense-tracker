const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },

    category: {
        type: String,
        required: false
    },

    date: {
        type: String,
        required: false
    },
    amount: {
        type: Number, // 資料型別是字串
        required: false
    }


})


const categoryImage = {

    home: '<i class= "fas fa-home" ></i>',
    shuttle: '< i class="fas fa-shuttle-van" ></i >',
    fun: '< i class="fas fa-grin-beam" ></i >',
    food: '< i class="fas fa-utensils" ></i >',
    other: ' < i class= "fas fa-pen" ></i > '

}

module.exports = mongoose.model('records', recordSchema)