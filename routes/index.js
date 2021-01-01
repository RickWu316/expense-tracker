// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const edit = require('./modules/edit')
const create = require('./modules/new')


router.use('/', home)
router.use('/edit', edit)
router.use('/new', create)



// 匯出路由器
module.exports = router
