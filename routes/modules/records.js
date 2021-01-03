const express = require('express')
const router = express.Router()
const records = require('../../models/records')

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return records.findById(id)
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(error => console.log(error))

})


router.put('/:id/edit', (req, res) => {
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

router.delete('/:id/delete', (req, res) => {
    const body = req.body
    const id = req.params.id

    return records.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect(`/`))
        .catch(error => console.log(error))

})

router.get('/new', (req, res) => {
    res.render('new')

})

router.post('/new', (req, res) => {
    const error = "名稱為必填欄位"
    const body = req.body
    if (body.name === "") {
        res.render('new', { error })
    } else {
        return records.create(body)
            .then(() => res.redirect('/'))
    }
})




module.exports = router
