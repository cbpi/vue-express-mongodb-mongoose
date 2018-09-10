# 准备
用vue-cli脚手架生成生

	npm install -g @vue/cli
	init <template> <app-name> 从一个远程模板生成一个项目 (遗留 API, 依赖 `@vue/cli-init`)
关于vue-cli的文档可以看[这里](https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli.md)

安装脚手架完成后就可以看到一个完整的项目结构了

#后端配置
接下来我们需要生辰成一个本地服务器，在根目录下新建一个server的文件夹,文件夹里面新建

api.js(配置项目所需api)

db.js(配置数据库的链接)

index.js(服务器入口文件)

这个三个文件

![image](http://pdfetjd6h.bkt.clouddn.com/mongooseimg2.png)

安装express，mongoose模块

	npm install express mongoose --save

在db.js中配置配置mongodb

	'server/db.js'

	// 引入mongoose模块
	const mongoose = require('mongoose')
	// 连接数据库 如果不自己创建 默认生成端口号后面的名字，如这里会生成一个peopleinfo的库
	mongoose.connect('mongodb://localhost:27017/peopleinfo')

	const db = mongoose.connection
	db.once('error', () => console.log('Mongo connection error'))
	db.once('open', () => console.log('Mongo connection successed'))
在根目录下新建models文件夹，在该文件加下新建peopleinfo.js

	'models/peopleinfo.js'

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

直接用node来操作数据库比较繁琐，一般推荐使用'mongoose'这个第三方模块来对数据库进行增删改查，关于mongoose中Schemas，Models的概念可以在官方网站上阅读

英文：[https://mongoosedoc.top/docs/cnhome.html](https://mongoosedoc.top/docs/cnhome.html)

中文：[http://mongoosejs.com/](http://mongoosejs.com/)

在peopleinfo.js中定义了一个peopleinfoSchema的Model，项目中对人物信息的增删改查我们可以基于这个People的Model来进行操作。

接下来编写增删改查的API，进入api.js

```
server/api.js

"use strict";
const db = require('./db');
const peopleinfomodels = require('../models/peopleinfo');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建create 人物信息接口
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

// 读取get 获取所有人物信息列表
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

// 删除delete 根据id删除对应人物信息
router.delete('/api/deleteByid/:id', (req, res) => {
  // 查找所有人物信息的方法
  peopleinfomodels.findOneAndRemove({_id: req.params.id}, function(err, res) {
    if (!err) {

    }
  })
  res.sendStatus(200)

})

module.exports = router;
```
在这个文件中，首先引入了三个模块，引入express，使用它的路由功能([express 文档](http://www.expressjs.com.cn))，还用到了mongoose中基于模型操作的一些方法，最后导出路由，在入口文件index.js中引入。

```
server/index.js

// 引入编写好的api
const api = require('./api')
// 引入文件模块
const fs = require('fs')
// 引入处理路径的模块
const path = require('path')
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(api)
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
// 监听8088端口
app.listen(8088)
console.log('success listen…………')

```
打开更目录下的package.json文件，找到"script"这个选项，添加一条命令

	"server": "node server/index.js"

在终端中执行 'npm run server'来启动本地后台。在这之前确保本地已经安装了MongoDB，并且已经启动。
链接数据库成功后终端会有这样的提示：

![image](http://pdfetjd6h.bkt.clouddn.com/mongooseimg1.png)

到这一步，后台的配置算是结束了。


[这里](https://drakecb.cn/javascript/2018/05/25/node01.html)有详细的步骤
---
