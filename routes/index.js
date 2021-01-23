// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const records = require('./modules/records')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware


// router.get('/', (req, res) => { res.redirect("./records") })  //預設records為首頁
// router.use('/records', records)
router.use('/users', users)
router.use('/records', authenticator, records) // 加入驗證程序
router.get('/', authenticator, (req, res) => { res.redirect("./records") }) // 加入驗證程序


// 匯出路由器
module.exports = router


