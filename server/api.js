"use strict";
const db = require('./db');
const peopleinfomodels = require('../models/peopleinfo');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建 人物信息接口
router.post('/api/createinfo', (req, res) => {
  let newPeopleinfo = new peopleinfomodels({
    name: req.body.name,
    sex: req.body.sex,
    hobby: req.body.hobby,
  })
  // 保存人物信息的方法
  newPeopleinfo.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('created successed')
    }
  })
})

// 创建 获取所有人物信息列表
router.get('/api/getallinfo', (req, res) => {
  // 查找所有人物信息的方法
  peopleinfomodels.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

// 删除 根据id删除对应人物信息
router.delete('/api/deleteByid/:id', (req, res) => {
  // 查找所有人物信息的方法
  peopleinfomodels.findOneAndRemove({_id: req.params.id}, function(err, res) {
    if (!err) {

    }
  })
  res.sendStatus(200)
})

// 更新 根据id更新对应人物信息
router.post('/api/updateByid/:id', (req, res) => {
  peopleinfomodels.findByIdAndUpdate(
    {
      _id: req.params.id
    }, 
    {
      name: req.body.name,
      sex: req.body.sex,
      hobby: req.body.hobby
    },
    {
      new: true
    },
    function (err, res) {
      if (err) {
        console.log("Error:" + err);
      } else {
        console.log("Res:" + res);
      }
    }
  )
  res.sendStatus(200)
})

module.exports = router;
