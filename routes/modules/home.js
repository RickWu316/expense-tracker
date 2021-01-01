const express = require('express')
const router = express.Router()
const records = require('../../models/records')

router.get('/', (req, res) => {
    const filterType = req.query.filter
    let filterRecords = {}
    // console.log(filterType)

    if (filterType) {  //讓空集合有東西
        filterRecords = records.find({ 'category': filterType })
    } else {
        filterRecords = records.find()
    }

    filterRecords.find() // 取出 Todo model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(record => {
            let totalAmount = 0
            for (const element in record) {
                totalAmount += record[element].amount
            }
            res.render('index', { record, filterType, totalAmount })

        }) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
})

router.delete('/delete/:id', (req, res) => {
    const body = req.body
    const id = req.params.id

    return records.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect(`/`))
        .catch(error => console.log(error))

})

module.exports = router