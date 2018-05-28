// 引入mongoose模块
const mongoose = require('mongoose');

/************** 定义模式 peopleinfoSchema **************/
const peopleinfoSchema = mongoose.Schema({
  name: String,
  sex: String,
  hobby: String
})

/************** 定义模型 Model **************/
const People = mongoose.model('Peopleinfo', peopleinfoSchema)

module.exports = People
