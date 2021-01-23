const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const records = require('../records')
const User = require('../user')
const Category = require('../category')
const SEED_USER = {
    name: 'root',
    email: 'root@example.com',
    password: '12345678'
}


db.once('open', async () => {

    try {
        let record = []
        let category_name = []
        const category = await Category.find()

        if (!category) return res.render("errorPage")

        category.forEach(element => category_name.push(element.category_name))

        bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(SEED_USER.password, salt))
            .then(hash => User.create({
                name: SEED_USER.name,
                email: SEED_USER.email,
                password: hash
            }))
            .then((user) => {
                const userId = user._id
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
                            amount: Math.floor(Math.random() * 1000),
                            userId: userId
                        })

                }
                records.create(record)
                    .then(() => {
                        console.log('done')
                        return db.close()
                    }
                    )
            })


    } catch (error) {
        console.log(error)

    }

})

