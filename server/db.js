// 引入mongoose模块
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认生成端口号的名字，如这里会生成一个peopleinfo的库
mongoose.connect('mongodb://localhost:27017/peopleinfo')

const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))

// /************** 定义模式loginSchema **************/
// const loginSchema = mongoose.Schema({
//   account: String,
//   password: String
// })
//
// /************** 定义模型Model **************/
// const Models = {
//   Login: mongoose.model('Login', loginSchema)
// }
//
// module.exports = Models
