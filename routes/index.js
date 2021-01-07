// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const records = require('./modules/records')

router.get('/', (req, res) => { res.redirect("./records") })  //預設records為首頁
router.use('/records', records)



// 匯出路由器
module.exports = router
