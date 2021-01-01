
const db = require('../../config/mongoose')
const records = require('../records') // 載入 todo model
// const categoryTransfer = require('../../category')

const category = ['home', 'shuttle', 'fun', 'food', 'other']

db.once('open', () => {
    let record = []
    for (let i = 0; i < 10; i++) {
        record.push(
            {
                name: 'name-' + i,
                category: category[Math.floor(Math.random() * 4)],
                date: `2020-12-${Math.floor(Math.random() * 30)}`,
                amount: Math.floor(Math.random() * 1000)
            })
    }
    records.create(record)
        .then(() => {
            console.log('done')
            return db.close()
        }
        )

})

