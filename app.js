const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser') // 引用 body-parser
const mongoose = require('mongoose') // 載入 mongoose
const records = require('./models/records')
const Handlebars = require('handlebars')
const category = require('./category');
const { get } = require('http');

// const methodOverride = require('method-override')// 載入 method-override
// const routes = require('./routes')// 引用路由器
const PORT = 3000




app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// // 設定每一筆請求都會透過 methodOverride 進行前置處理
// app.use(methodOverride('_method'))


//載入轉換icon的helper
Handlebars.registerHelper('transferIcon', function (aString) {
    return category.categoryTransIcon(aString)
})

//載入轉換中文的helper
Handlebars.registerHelper('transferCN', function (aString) {
    return category.categoryTransCN(aString)
})

//載入轉換判斷相等的helper
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


mongoose.connect('mongodb://localhost/Records', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})


// console.log(test)

// // 將 request 導入路由器
// app.use(routes)


app.get('/', (req, res) => {
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


app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    return records.findById(id)
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(error => console.log(error))

})


app.post('/edit/:id', (req, res) => {
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


app.post('/delete/:id', (req, res) => {
    const body = req.body
    const id = req.params.id

    return records.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect(`/`))
        .catch(error => console.log(error))

})




app.get('/new', (req, res) => {
    res.render('new')

})

app.post('/new', (req, res) => {
    const error = "名稱為必填欄位"
    const body = req.body
    if (body.name === "") {
        res.render('new', { error })
    } else {
        return records.create(body)
            .then(() => res.redirect('/'))
    }
})


// 設定應用程式監聽的埠號
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

