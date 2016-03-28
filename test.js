"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('snippets.db');
const co = require('co');
let code = new Promise(function(resolve, reject) {
    db.all('SELECT * FROM "code"', function(err, rows) {
        resolve(rows);
    });
})
co(function*() {
    console.log(yield code);
})
const moment = require("moment");
console.log(moment().format('YYYY/MM/DD HH:mm:ss'));


<a href="/" <%= (currpage === 1) ? "class=ban" : "" %>>首页</a>
<a href="/<%= (currpage > 1) ? ("?page=" + (currpage - 1)) : "" %>" <%= (currpage > 1) ? "" : "class=ban" %>>上一页</a>
<span><%= currpage %> / <%= count %></span>
<a href="/<%= (currpage < count) ? ("?page=" + (currpage + 1)) : ("?page=" + count) %>" <%= (currpage < count) ? "" : "class=ban" %>>下一页</a>
<a href="/<%= "?page=" + count %>" <%= (currpage < count) ? "" : "class=ban" %>>尾页</a>
