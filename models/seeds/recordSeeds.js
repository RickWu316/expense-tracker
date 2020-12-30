
const Todo = require('../records') // 載入 todo model


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Records', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
// db.once('open', () => {
//     console.log('mongodb connected!')
// })

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        Todo.create({
            name: 'name-' + i,
            amount: Math.floor(Math.random() * 1000)
        })
    }
    console.log('done')
})

