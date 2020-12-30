
const Todo = require('../records') // 載入 todo model


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Records', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})


const category = ['home', 'shuttle', 'fun', 'food', 'other']
const categoryImage = {

    home: '<i class= "fas fa-home fa-3x"></i>',
    shuttle: '<i class="fas fa-shuttle-van fa-3x"></i>',
    fun: '<i class="fas fa-grin-beam fa-3x"></i>',
    food: '<i class="fas fa-utensils fa-3x"></i>',
    other: '<i class= "fas fa-pen fa-3x"></i> '

}

db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
        Todo.create({
            name: 'name-' + i,
            category: categoryImage[category[Math.floor(Math.random() * 4)]],
            date: `2020-12-${Math.floor(Math.random() * 30)}`,
            amount: Math.floor(Math.random() * 1000)
        })
    }
    console.log('done')
})



