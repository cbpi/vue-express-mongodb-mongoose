const mongoose = require('mongoose');

/************** 定义模式loginSchema **************/
const movieSchema = mongoose.Schema({
  poster: String,
  director: String,
  actor: String,
  categort: String,
  officalweb: String,
  publishcountry: String,
  language: String,
  length: String,
  origin_title: String,
  title: String
})

/************** 定义模型Model **************/
const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie

