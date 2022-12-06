const mysql= require("mysql2")
module.exports= mysql.createConnection({
    host:"eu-cdbr-west-02.cleardb.net",
    user:"b6f9d8b7587991",
    password:"293481c1",
    database:'heroku_5191ad6e3721447',
    port:'3306'
})
/*
module.exports= mysql.createConnection({
    host:"127.0.0.1",
    port:"3300",
    user:'root',
    password:"DC8E6A353Mmaaz",
    database:"questions"
})
**/