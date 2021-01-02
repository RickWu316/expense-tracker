
// const categoryCN = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品 ', '其他']

// const category = ['home', 'shuttle', 'fun', 'food', 'other']

// const categoryImage = {
//     home: '<i class= "fas fa-home fa-3x"></i>',
//     shuttle: '<i class="fas fa-shuttle-van fa-3x"></i>',
//     fun: '<i class="fas fa-grin-beam fa-3x"></i>',
//     food: '<i class="fas fa-utensils fa-3x"></i>',
//     other: '<i class= "fas fa-pen fa-3x"></i> '
// }


const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {
    Category.create(
        {
            category_name: 'home',
            category_name_CN: '家居物業',
            icon: 'fas fa-home',
        },
        {
            category_name: 'traffic',
            category_name_CN: '交通出行',
            icon: 'fas fa-shuttle-van',
        },
        {
            category_name: 'entertainment',
            category_name_CN: '休閒娛樂',
            icon: 'fas fa-grin-beam',
        },
        {
            category_name: 'food',
            category_name_CN: '餐飲食品',
            icon: 'fas fa-utensils',
        },
        {
            category_name: 'others',
            category_name_CN: '其他',
            icon: 'fas fa-pen',
        },
    )
        .then(() => {
            console.log('Category seed data created in mongodb')
            db.close()
        })

})