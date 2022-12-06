const express= require("express");
let router= express.Router()
const db= require("../database");

router.post("/",(req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let key = req.body.key;
    let agent=req.headers['user-agent'];

    db.query(`Insert into visitors(ipAddress,keyUser,name,userAgent,cookies)VALUES("${ip}",${key},"user","${agent}",true)`);
    res.send({setTerm:true})
    
})
 

router.get("/",(req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    db.query((`Select * from visitors  where keyUser=${req.query.key} `),(err,result)=>{
        if(err){console.log( err)}
        if (result===undefined|| result===null || result.length===0) res.send({termCondition:false});
        else  {
            if(result[0].ipAddress !=ip){
                db.query(`Update visitors set ipAddress="${ip}" where keyUser=${req.query.key}`)
            }
            res.send({termCondition:true});
        }
    })
    
})

module.exports= router;