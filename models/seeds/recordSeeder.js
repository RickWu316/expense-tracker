const db = require('../../config/mongoose')
const records = require('../records')
const Category = require('../category')


db.once('open', async () => {
    let record = []
    let category_name = []
    const category = await Category.find()
    category.forEach(element => category_name.push(element.category_name))

    for (let i = 0; i < 10; i++) {
        record.push(
            {
                name: 'name-' + i,
                category: category_name[Math.floor(Math.random() * 4)],
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

