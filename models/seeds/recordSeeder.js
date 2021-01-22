const db = require('../../config/mongoose')
const records = require('../records')
const Category = require('../category')


db.once('open', async () => {

    try {
        let record = []
        let category_name = []
        const category = await Category.find()

        if (!category) return res.render("errorPage")

        category.forEach(element => category_name.push(element.category_name))

        for (let i = 0; i < 10; i++) {
            let categoryRandom = Math.floor(Math.random() * 4)
            let monthRandom = Math.floor(Math.random() * 12) + 1
            let dateRandom = Math.floor(Math.random() * 30) + 1

            record.push(
                {
                    name: 'name-' + i,
                    category: category_name[categoryRandom],
                    merchant: '隨便哪裡',
                    date: `2020-${monthRandom > 9 ? monthRandom : '0' + monthRandom}-${dateRandom > 9 ? dateRandom : '0' + dateRandom}`,
                    amount: Math.floor(Math.random() * 1000)
                })
        }
        records.create(record)
            .then(() => {
                console.log('done')
                return db.close()
            }
            )

    } catch (error) {
        console.log(error)

    }

})

