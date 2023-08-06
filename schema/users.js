const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
*/

// 用户名的验证规则
const id = joi.number().required().min(1)
const name = joi.string().min(2).max(8).required()
const email = joi.string().email().allow('')
const phone = joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/).allow('')
const state = joi.string().valid("在职", "离职").required()
const address = joi.string().min(2).max(18).allow('')

const ids = joi.array().items(joi.number().required().min(1))


/**
 * with(key, peers[, option]) 必须要有key键，同时要有peers
 * without(key, peers[, option]) 必须要有key，但不能有peers
 * xor(key, peers[, option]) 必须要有key。peers如果是数组，那么可以有一个，如果是字符串那么就是必须的
 * or(key, peers[, option]) 必须要有key。peers如果是数组，那么可以有一个或多个，如果是字符串那么就是必须的
 * oxor(key, peers[, option]) key和peers只能有一个
 * params -peers: 可以是字符串或字符串数组
*/

// 对外共享验证规则对象
const create_obj = { name, email, phone, state, address }

exports.create_schema = joi.object(create_obj)
exports.delete_schema = joi.object({ id })
exports.delete_multiple_schema = joi.object({ ids })
exports.update_schema = joi.object({ id, ...create_obj })
exports.read_schema = this.delete_schema