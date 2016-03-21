"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('snippets.db');
const PAGING = 2;
module.exports.findCode = (pageNum, lang) => {
    let page = pageNum ? pageNum : 0;
    let langSQL = lang ? ("where lang='" + lang + "'") : " ";
    return new Promise(function(resolve, reject) {
        db.all('SELECT * FROM code ' + langSQL + ' order by id limit ' + PAGING + ' offset ' + page * PAGING, (err, rows) => {
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }).catch((err) => {
        console.log("Database Error: " + err);
    });
}
module.exports.findCodeByID = (ID) => {
    return new Promise(function(resolve, reject) {
        db.get('select * from code where id=' + ID, (err, row) => {
            if(err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }).catch((err) => {
        console.log("Database Error: " + err);
    });
}
module.exports.run = (sql) => {
    return new Promise(function(resolve, reject) {
        db.run(sql, (err) => {
            if(err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    }).catch((err) => {
        console.log("Database Error: " + err);
    });
}
module.exports.count = () => {
    return new Promise(function(resolve, reject) {
        db.get("select count(*) as count from code", (err, row) => {
            if(err) {
                reject(err);
            } else {
                resolve(Math.ceil(row.count / PAGING));
            }
        })
    }).catch((err) => {
        console.log("Database Error: " + err);
    });
}
