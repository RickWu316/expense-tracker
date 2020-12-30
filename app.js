const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser') // 引用 body-parser
// const methodOverride = require('method-override')// 載入 method-override
// const routes = require('./routes')// 引用路由器
const PORT = 3000




app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// // 設定每一筆請求都會透過 methodOverride 進行前置處理
// app.use(methodOverride('_method'))




// // 將 request 導入路由器
// app.use(routes)

app.get('/', (req, res) => {

    res.render('index')

})


// 設定應用程式監聽的埠號
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

