const express= require("express")
const app= express();
const db= require("./database");
const path = require('path');
const ww2= require("./routes/ww2");
const cw= require("./routes/cw.JS");
const flags= require("./routes/flags");
const name= require("./routes/name");
const term= require("./routes/term");
var compression = require("compression"); 


app.use(compression());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './build')));
const port= process.env.PORT || 5000;


/*
var geoip = require('geoip-lite');
db.query(("Select * from cw_score"),(err,result)=>{
    result.forEach((x)=>{
        
        let ip= x.ipAddress
    
        let geo= geoip.lookup(ip)
        
        db.query(`update cw_score set City="${geo.timezone.split("/")[1]}" where keyUser=${x.keyUser}`)
        
        
    })
})
*/
app.use("/WW2",ww2);
app.use("/Name",name);
app.use("/Term",term);
app.use("/CW",cw)
app.use("/FLAGS",flags)

/** To keep the connection alive with db  */
setInterval(function () {
    db.query('SELECT 1');
}, 5000);



app.get("/*",(req,res)=>{
    
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
})

app.listen(port);