const mysql= require("mysql2")


module.exports= mysql.createConnection({
    host:"127.0.0.1",
    port:"3300",
    user:'root',
    password:"",
    database:"questions"
})
