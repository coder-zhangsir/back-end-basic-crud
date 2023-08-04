const express = require('express')
// 创建路由对象 
const router = express.Router() 

// 导入用户路由处理函数对象
const users_handle = require('../router_handle/users')

// 导入 schema 表单验证规则
const schema = require('../schema/users')
// 导入 exporess-joi 表单验证中间件工具
const expressJoi = require('@zhangyongxin/express-joi')

// 增加数据
router.post('/create', expressJoi.validate(schema.create_schema), users_handle.create)
// 删除数据
router.delete('/delete/:id', expressJoi.validate(schema.delete_schema, "params"), users_handle.delete)
// 更改数据
router.post('/update', expressJoi.validate(schema.update_schema), users_handle.update)
// 查找数据ByID
router.get('/read/:id', expressJoi.validate(schema.read_schema, "params"), users_handle.readById)
// 查找数据
router.get('/read', users_handle.read)


// 将路由对象共享出去 
module.exports = router