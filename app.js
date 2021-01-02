const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser') // 引用 body-parser
const Handlebars = require('handlebars')
const methodOverride = require('method-override')
const app = express()
const { get } = require('http');
const PORT = process.env.PORT || 3000
const routes = require('./routes')// 引用路由器

app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// // 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))


//載入轉換判斷相等的helper
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

require('./config/mongoose')

// // 將 request 導入路由器
app.use(routes)


// 設定應用程式監聽的埠號
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

