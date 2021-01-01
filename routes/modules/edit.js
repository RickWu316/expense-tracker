const express = require('express')
const router = express.Router()
const records = require('../../models/records')

router.get('/:id', (req, res) => {
    const id = req.params.id
    return records.findById(id)
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(error => console.log(error))

})


router.put('/:id', (req, res) => {
    const body = req.body
    const id = req.params.id

    return records.findById(id)
        .then(record => {
            for (const element in body) {
                record[element] = body[element]
            }
            return record.save()
        })
        .then(() => res.redirect(`/`))
        .catch(error => console.log(error))

})

module.exports = router
