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
    merchant: {
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
    },
    userId: {  // 加入關聯設定
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }


})



module.exports = mongoose.model('records', recordSchema)