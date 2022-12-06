const express= require("express");
let router= express.Router()
const db= require("../database");
const { lookup } = require('geoip-lite');
//Here we store the answers for every user and the answers will be deleted when the user send post request
let answers=[]


router.get("/",(req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
    db.query("Select * from quizflags", (err,result)=>{
        if (err) {throw err ; res.sendStatus(500);};
        let newResult= []
        for (let i=0; i<12;i++){
            x= Math.floor(Math.random()*35)
            if(result[x]===null || result[x]===undefined || newResult.includes(result[x])){i--;continue}
            newResult.push(result[x])
        }
        //answersToBe will be pushed to the global var 'answers' 
        let answersToBe= [];
        let id= Math.random();
        //Shuffling the choices 
        newResult.forEach((x)=>{
            // I got this line of code from stack overflow BALIZ DONT JUDGE
            let shuffled = [x.choice1,x.choice2,x.choice3].map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
            x.choice1= shuffled[0];
            x.choice2= shuffled[1];
            x.choice3= shuffled[2];
            
        })
        newResult.forEach((x)=>{answersToBe.push(x.answer); delete x.answer})
        answers.push({answers:answersToBe, id:id})
        setTimeout(()=>{
            answers.forEach((list)=>{
                if (list.answers==answersToBe && list.id==id){
                    answers= answers.filter((x)=>{return  x.id!=id});
                    return ;
                }
            })
            
        },180000)

        res.send({ques:newResult, id:id})
        
    })    
})

router.post("/",(req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var result=0
    let clientAnswers= req.body.answers;
    let key= req.body.key;
    //Getting the location of the user
    let Place= lookup(ip);
    if(Place!=undefined || Place!=null ){Place= Place.timezone.split("/")[1]} else {Place = 'Beirut'}

    //Checking the name 
    var name='' 
    db.query((`Select name from visitors where ipAddress="${ip}" && keyUser=${key}`),(err,result)=>{

        if (result.length===0) name='user';
        else name=result[0].name;
    })

    //Process of checking the answers
    let answersToBeChecked= answers.filter((x)=>{return x.id===req.body.id})
    for(let x in answersToBeChecked[0].answers){
        if(answersToBeChecked[0].answers[x]===clientAnswers[x]) result++
    }
    //Deleting the answers of the user from answers Array
    answers= answers.filter((x)=>{return  x.id!=req.body.id})
    
    db.query((`Select * from flags_score where ipAddress='${ip}' && keyUser=${key}`),(err,result_)=>{
        if (err) {throw err;res.sendStatus(500)};
        if(result_.length===0){
            db.query(`insert into flags_score (ipAddress,keyUser,name,score,timeSpent,timesDone,City) VALUES("${ip}",${key},"${name}",${result},"${req.body.time}",1,"${Place}" )`);
        }
        else if(req.body.time <result_[0].timeSpent && result_[0].score==result){
            db.query(`Update flags_score set timeSpent="${req.body.time}", timesDone=${result_[0].timesDone +1} where ipAddress="${ip}" && keyUser=${key}`);
        }else if (result > result_[0].score){
            db.query(`Update flags_score set score=${result},timeSpent="${req.body.time}", timesDone=${result_[0].timesDone +1} where ipAddress="${ip}" && keyUser=${key}`);
        } else{
            db.query(`Update flags_score set timesDone=${result_[0].timesDone +1} where ipAddress="${ip}" && keyUser=${key}`)
        } 
    })
    
    res.send({score:result})
})



router.get("/score",(req,res)=>{
    
    db.query(("Select name,score,timeSpent,timesDone,City from flags_score order by score DESC ,timeSpent ASC,timesDone ASC limit 10"),(err,result)=>{
        if(err) throw err
        res.send(result)
    })
})

module.exports= router;