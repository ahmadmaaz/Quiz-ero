const express= require("express");
let router= express.Router()
const db= require("../database");

router.post(("/Accept"),(req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let key = req.body.key;
    let agent=req.headers['user-agent'];

    db.query(`Insert into visitors(ipAddress,keyUser,name,userAgent,cookies)VALUES("${ip}",${key},"user","${agent}",true)`);

    res.send({setTerm:true})
    
   
    
})
 

router.post(("/Check"),(req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let key = req.body.key
    db.query((`Select * from visitors  where keyUser=${key} `),(err,result)=>{
        if (result===undefined|| result===null || result.length===0) res.send({termCondition:false});
        else  {
            if(result[0].ipAddress !=ip){
                db.query(`Update visitors set ipAddress="${ip}" where keyUser=${key}`)
            }
            res.send({termCondition:true});
        }
    })
    
})

module.exports= router;