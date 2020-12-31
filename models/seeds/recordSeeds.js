
const records = require('../records') // 載入 todo model
// const categoryTransfer = require('../../category')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Records', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

const category = ['home', 'shuttle', 'fun', 'food', 'other']

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        records.create({
            name: 'name-' + i,
            category: category[Math.floor(Math.random() * 4)],
            date: `2020-12-${Math.floor(Math.random() * 30)}`,
            amount: Math.floor(Math.random() * 1000)
        })
    }
    console.log('done')

})

