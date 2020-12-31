const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser') // 引用 body-parser
const mongoose = require('mongoose') // 載入 mongoose
const records = require('./models/records')
const Handlebars = require('handlebars')
const category = require('./category')

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
    // console.log(categoryImage.home)
    // console.log(categoryTransfer('home'))
    records.find() // 取出 Todo model 裡的所有資料
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        // .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
        .then(record => res.render('index', { record })) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
})

app.get('/new', (req, res) => {
    res.render('new')

})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    // console.log(id)
    return records.findById(id)
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(error => console.log(error))

    // res.render('edit')
})


app.post('/edit/:id', (req, res) => {
    const body = req.body
    console.log(body)
    // return records.findById(id)
    //     .lean()
    //     .then(record => res.render('edit', { record }))
    //     .catch(error => console.log(error))

    // // res.render('edit')
})

app.post('/new', (req, res) => {
    const error = "名稱為必填欄位"
    const body = req.body
    console.log(body)

    if (body.name === "") {
        res.render('new', { error })
    } else {
        return records.create(body)
            .then(() => res.redirect('/'))

    }
    // return records.findById(id)
    //     .lean()
    //     .then(record => res.render('edit', { record }))
    //     .catch(error => console.log(error))

    // // res.render('edit')
})


// 設定應用程式監聽的埠號
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

