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
