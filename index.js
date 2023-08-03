// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 定义监听端口号
const port = 3007

// 导入 cors 中间件
const cors = require('cors')

// 将 cors 注册为全局中间件
app.use(cors())

// 配置解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

// 注册辅助反馈响应数据的方法
app.use((req, res, next) => {
    // status = 0 为成功，status = 1 为失败； 默认status = 1，方便处理失败的情况
    res.cc = (err, status=1) => {
        res.send({
          	// 状态
          	status,
            // 状态描述， 判断err是错误对象还是字符串
          	message: err instanceof Error ? err.message : err
        })
    }

    next()
})


// 导入并注册用户路由模块
const usersRouter = require('./router/users')

app.use('/api/users', usersRouter)


// write your code here...

// 调用 app.listen 方法，指定端口号并启动Web服务器
app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})


// 导入 joi 包
const joi = require('joi')

// 注册全局错误级别中间件
app.use((err, req, res, next) => {
    // 错误实例类型为 ValidationError , 表单数据校验失败
    if (err instanceof joi.ValidationError) return res.cc(err)

    // 未知报错
    res.cc(err)
})