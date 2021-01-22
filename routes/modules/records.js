const express = require('express')
const router = express.Router()
const records = require('../../models/records')
const Category = require('../../models/category')
const moment = require('moment')



router.get('/', async (req, res) => {


    let months = []
    for (i = 1; i < 13; i++) {
        months.push(i)
    }
    try {
        const categorise = await Category.find().lean()
        // const filterType = req.query.filter
        const categoryFilter = req.query.category
        const monthFilter = req.query.month
        const categoryTransIcons = {}
        const categoryTransCN = {}
        let filterRecords = {}
        // if (!categorise) return res.render("errorPage")

        //定義category轉換關係
        for (category of categorise) {
            categoryTransIcons[category.category_name] = category.icon
            categoryTransCN[category.category_name] = category.category_name_CN
        }

        if (categoryFilter) {  //讓空集合有東西
            filterRecords = records.find({ 'category': categoryFilter })
        } else {
            filterRecords = records.find().lean()
        }

        // if (monthFilter) {
        //     filterRecords.find()
        //         .then((record) => {
        //             let month = record.filter(element => {
        //                 if (element.date !== "") {
        //                     return moment(element.date).format("M") === "12"
        //                 }
        //             })

        //             // filterRecords = records.find({ 'category': categoryFilter })
        //         } else {
        //             filterRecords = records.find().lean()
        //         }


        // console.log(filterRecords)

        // records.find({})
        //     .then((record) => {
        //         let month = record.filter(element => {
        //             console.log(element.date)
        //             console.log(moment(element.date).format("M"))
        //             if (element.date !== "") {
        //                 return moment(element.date).format("M") === "12"
        //             }
        //         })
        //         console.log(month)
        //     })



        filterRecords.find() // 取出 Todo model 裡的所有資料
            .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
            .then(record => {
                let filterCN = categoryTransCN[categoryFilter]
                let totalAmount = 0

                //先把月份篩選放到這裡
                if (monthFilter) {
                    record = record.filter(element => {
                        return moment(element.date).format("M") === monthFilter
                    })

                }

                for (const element in record) {
                    record[element].category = categoryTransIcons[record[element].category]
                    totalAmount += record[element].amount
                }
                res.render('index', { record, filterCN, totalAmount, categoryFilter, monthFilter, months })

            }) // 將資料傳給 index 樣板
            .catch(error => console.error(error)) // 錯誤處理
    } catch (error) {
        console.log(error)
    }

})

router.post('/', (req, res) => {

    console.log(req.query)
    console.log(req.body)

})


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
        console.log(body)
        return records.create(body)
            .then(() => res.redirect('/'))
    }

})




module.exports = router
