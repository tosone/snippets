"use strict";
const koa = require("koa");
const path = require('path');
const _ = require('lodash');
const render = require('koa-ejs');
const sqlite3 = require('co-sqlite3');
const router = new require('koa-router')();
const bodyParser = require('koa-bodyparser');
const co = require('co');
const moment = require("moment");

const app = koa();
app.use(bodyParser());
app.use(require('koa-static')("./public"));
render(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'html',
    cache: true
});
var languages = ["html", "xml", "css", "clike", "javascript", "actionscript", "aspnet", "autoit", "bash", "c", "csharp", "cpp", "coffeescript", "fsharp", "fortran", "go", "java", "json", "less", "lua", "makefile", "matlab", "objectivec", "perl", "php", "sass", "scss"];

co(function*() {
    const db = yield sqlite3('snippets.db');

    router.get("/", function*() {
        yield this.render('index', {
            code: yield db.all('SELECT * FROM "code"'),
            moment: moment
        });
    });
    //无限加载
    router.get('/code/:id', function*() {

    });
    //
    router.get('/edit', function*() {
        yield this.render('edit', {
            id: this.query.id ? this.query.id : false,
            code: this.query.id ? yield db.get('SELECT * FROM "code" where id=' + this.query.id) : false,
            lang: languages
        });
    });
    router.post("/edit", function*() {
        var data = this.request.body;
        if (this.query.id) {
            this.body = "update";
        } else {
            var intro = data.intro;
            var code = data.code;
            var lang = data.lang;
            var time = moment();
            yield db.run("INSERT INTO 'code' ('intro','code','lang','timestamp') VALUES ('" + intro + "','" + code + "','" + lang + "','" + time + "')");
            this.body = yield {
                code: 200
            }
        }
    })

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(80, function() {
        console.log("listen 80")
    });
})
