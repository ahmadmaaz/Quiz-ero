const express= require("express");
let router= express.Router()
const db= require("../database");

router.post("/Check",(req,res)=>{
    
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let key=req.body.key;
    
    const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));
    db.query((`Select name from visitors where ipAddress="${ip}" && keyUser=${key}`),(err,result)=>{
        
        if( isEqual(result[0], { name: 'user' })) {res.send({name:true})}
        else { res.send({name: false})}


    })
})


router.post("/Update",(req,res)=>{
    
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let name = req.body.name;
    let key= req.body.key;
    db.query((`Select name from visitors where ipAddress="${ip}" && keyUser=${key}  `),(err,result)=>{
        if(err) throw err;
        /** 
        if (result===undefined || result===null || result.length===0 ){
            db.query((`Select ipAddress from visitors where name="${name}"`),(err,result)=>{
                if(err)  res.send({available:"error"});
                
                if (result===undefined ||result===null || result.length===0 ){ 
                    db.query(`Insert into visitors (ipAddress,keyUser,name)VALUES("${ip}",${key},"${name}")`,(err,result)=>{
                        if (err) res.send({available:"error"});
                        else res.send({available:true})
                    })
                }else{
                    res.send({available:false})
                    
                }
            })
        }
        */
       
        db.query((`Select ipAddress from visitors where name="${name}"`),(err,result)=>{
            if(err) res.send({available:"error"});
            
            if (result===undefined ||result===null || result.length===0 ){ 
                db.query((`Update visitors set name="${name.toLowerCase()}" where ipAddress="${ip}" && keyUser=${key}`),(err,result)=>{
                    if(err) res.send({available:"error"})
                    else {
                        res.send({available:true});
                        db.query(`Update ww2_score set name="${name.toLowerCase()}" where ipAddress="${ip}" && keyUser=${key}`);
                        db.query(`Update cw_score set name="${name.toLowerCase()}" where ipAddress="${ip}" && keyUser=${key}`);
                        db.query(`Update flags_score set name="${name.toLowerCase()}" where ipAddress="${ip}" && keyUser=${key}`);
                    }
                })
            }else{
                res.send({available:false})
                
            }
        })
           
        
    })
})




module.exports= router;