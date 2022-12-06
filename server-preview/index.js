const express= require("express")
const app= express();
const db= require("./database");
const path = require('path');
const quiz= require("./routes/quiz");
const name= require("./routes/name");
const term= require("./routes/term");
var compression = require("compression"); 
var cors = require('cors')

app.use(cors())
app.use(compression());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './build')));
const port= process.env.PORT || 5000;


app.use("/api/name",name);
app.use("/api/term",term);
app.use("/api/quiz",quiz)

/** To keep the connection alive with db  */
setInterval(function () {
    db.query('SELECT 1');
}, 5000);



app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

app.listen(port);