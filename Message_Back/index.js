const express = require('express')
const path = require('path')
// 解析html
var ejs = require('ejs')
var config = require('./config/default')

const app = express()

// 获取静态路径
// app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/data'));

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
    // 允许访问ip，*为所有
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1');
    // 为了方便返回 json
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == "OPTIONS") {
        // 让options请求快速返回
        res.sendStatus(200);
    } else {
        next();
    }
});

// 加入 html 视图
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 解析前端数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 引入路由
require('./routes/index')(app);
require('./routes/files')(app);

app.listen(config.port, () => {
    console.log(`我启动了${config.port}端口`);
})