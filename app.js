"use strict";
const app = require("koa")();
const path = require('path');
const render = require('koa-ejs');
const router = new require('koa-router')();
const bodyParser = require('koa-bodyparser');
const moment = require("moment");
const model = require('./model');
const fs = require('fs');
app.use(bodyParser());
app.use(require('koa-static')("./public"));
app.use(router.routes()).use(router.allowedMethods());
render(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true,
    strict: true
});
const langs = ["html", "xml", "css", "clike", "javascript", "actionscript", "aspnet", "autoit", "bash", "c", "csharp", "cpp", "coffeescript", "fsharp", "fortran", "go",
    "java", "json", "less", "lua", "makefile", "matlab", "objectivec", "perl", "php", "sass", "scss"
];
router.get("/", function*(req, res, next) {
    let page = parseInt(this.query.page) ? parseInt(this.query.page) : 1;
    page = page <= 1 ? 1 : page;
    yield this.render('index', {
        page: {
            count: yield model.count(),
            cpage: page
        },
        code: yield model.findCode(page - 1)
    });
});
router.get("/lang/:lang", function*() {
    let page = parseInt(this.query.page) ? parseInt(this.query.page) : 1;
    page = page <= 1 ? 1 : page;
    let lang = this.params.lang;
    yield this.render('index', {
        page: {
            count: yield model.count(),
            cpage: page
        },
        code: yield model.findCode(page - 1, lang)
    });
});
router.get('/edit', function*() {
    let codeInfo = {},
        codeid = this.query.id;
    if (codeid) {
        codeInfo = yield model.findCodeByID(codeid);
    }
    yield this.render('edit', {
        id: codeid ? codeid : false,
        code: codeid ? codeInfo.code : false,
        langs: langs,
        codelang: codeid ? codeInfo.lang : langs[0],
        intro: codeid ? codeInfo.intro : false
    });
});
router.post("/edit", function*() {
    let data = this.request.body,
        codeid = this.query.id,
        intro = data.intro,
        lang = data.lang,
        time = moment().format('YYYY/MM/DD HH:mm:ss'),
        code = data.code,
        sql = "";
    if (codeid) {
        sql = "UPDATE code set intro='" + intro + "', code='" + code + "', lang='" + lang + "', timestamp='" + time + "' where id='" + codeid + "'";
    } else {
        sql = "INSERT INTO code (intro, code, lang, timestamp) VALUES ('" + intro + "','" + code + "','" + lang + "','" + time + "')";
    }
    if (yield model.run(sql)) {
        this.body = {
            code: 200
        }
    } else {
        this.body = {
            code: 500
        }
    }
});
router.get("/delete", function*() {
    let id = this.query.id;
    if (yield model.run("DELETE from code where id=" + id)) {
        this.body = {
            code: 200
        }
    } else {
        this.body = {
            code: 500
        }
    }
});
fs.exists("./snippets.db", (exists) => {
    model.run('CREATE TABLE "code" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"intro" TEXT NOT NULL,"code" TEXT NOT NULL,"lang" TEXT NOT NULL,"timestamp" TEXT NOT NULL)').then(() => {
        app.listen(3000, function() {
            console.log("Server running at http://127.0.0.1:80.");
        });
    });
});
