const mongoose = require('mongoose');

/************** 定义模式loginSchema **************/
const peopleinfoSchema = mongoose.Schema({
  name: String,
  sex: String,
  hobby: String
})

/************** 定义模型Model **************/
const People = mongoose.model('Peopleinfo', peopleinfoSchema)

module.exports = People


