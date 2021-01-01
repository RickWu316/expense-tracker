const express = require('express')
const router = express.Router()
const records = require('../../models/records')

router.get('/', (req, res) => {
    res.render('new')

})

router.post('/', (req, res) => {
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
