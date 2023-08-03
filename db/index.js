// 导入 mysql 模块
const mysql = require('mysql')
// 创建连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: `admin123`,
    database: `basic_crud`
})

// 将数据库连接对象对外共享
module.exports = db