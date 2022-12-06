import React,{useState,useEffect,useRef} from 'react';
import Flag from 'react-world-flags'
const answers=[];
var answer= {solution: ''};
function QueBox(props) {
    /** I is responsible to iterate in ques */
    const I =useRef(0);
    let ques=props.ques;
    //Click state for evry button
    const[clickbtn1,setClickbtn1]=useState(false)
    const[clickbtn2,setClickbtn2]=useState(false)
    const[clickbtn3,setClickbtn3]=useState(false)
    
    //Que-Choices Stuff ..
    const [question,setQuestion]= useState('');
    const [choice1,setChoice1]= useState('');
    const [choice2,setChoice2]= useState('');  
    const [choice3,setChoice3]= useState('');
    
    const[done,setDone]=useState(false)
    /** Setup for timer  */
    const [minutes,setMinutes]=useState(1);
    const [seconds,setSeconds]=useState(12);

    useEffect(()=>{
        if(ques.length >0){
            setQuestion(ques[I.current].question);
            setChoice1(ques[I.current].choice1);
            setChoice2(ques[I.current].choice2);
            setChoice3(ques[I.current].choice3);
            I.current++;
        } 
    },[ques])

    useEffect(()=>{
        const timer= setInterval(()=>{
            if(seconds===0 && minutes===0){
                clearInterval(timer)
                if (done===false){
                    props.post(answers,72);
                    setDone(true)
                }
                
            }else if (seconds===0){
                setSeconds(seconds-1)
                setMinutes(0)
                setSeconds(59)
                
            }else{
                setSeconds(seconds-1)
            }

        },1000)
        return ()=>clearInterval(timer)
    })
    
    function nextQue(e){
        e.preventDefault();
        
        if(answer.solution==="") return 
        else if(answers.length >=11){
            answers.push(answer.solution);
            props.post(answers,72-seconds);
            setDone(true)
        }
        else{
            answers.push(answer.solution);
            for (let i=1; i<4; i++){
                eval(`setClickbtn${i}(false)`)
                eval(`setChoice${i}(ques[I.current].choice${i});`)
            }
            setQuestion(ques[I.current].question);
            answer.solution= "";
            I.current++;
        }
    }
    
    function newAnswer(e){
        answer.solution= e.target.innerHTML
        //Making the button bigger
        setClickbtn1(false)
        setClickbtn2(false)
        setClickbtn3(false)
        if(e.target.id==="choice1")setClickbtn1(true)
        else if(e.target.id==="choice2")setClickbtn2(true)
        else setClickbtn3(true)
    }
  return (
    <div className='pb-28'> 
        <form onSubmit={nextQue} className="text-center mt-8">
            {props.type==="img" ? 
                <h1 className='font-mono font-bold text-base lg:text-xl text-white bg-sky-600 mb-2 rounded mx-4 text-left  pl-4  pr-2 py-4 sm:mx-4 md:mx-4 ' id='question-holder'>{question}</h1> 
                : 
                <div className='flex justify-center '><Flag code={question}  className='h-56 w-56 ' />   </div>
            }
            
            <button className={clickbtn1 ?  "font-mono text-black bg-sky-0  p-2 mb-2 rounded w-8/12 text-center text-xs md:text-base border-2   border-sky-700  lg:hover:text-white hover:bg-sky-0 lg:hover:bg-sky-700  transition-all duration-[400ms] " :"font-mono text-black bg-sky-0  p-2 mb-2 rounded text-xs md:text-base w-8/12 lg:w-2/4 text-center border-2  border-sky-700  hover:text-white hover:bg-sky-700  transition-all duration-[400ms] "} type="button" onClick={newAnswer} id="choice1" >{choice1}</button> <br></br>
            <button className={clickbtn2 ?  "font-mono text-black bg-sky-0  p-2 mb-2 rounded w-8/12 text-center text-xs md:text-base border-2   border-sky-700  lg:hover:text-white hover:bg-sky-0 lg:hover:bg-sky-700  transition-all duration-[400ms] " :"font-mono text-black bg-sky-0  p-2 mb-2 rounded text-xs md:text-base w-8/12 lg:w-2/4 text-center border-2  border-sky-700  hover:text-white hover:bg-sky-700  transition-all duration-[400ms] "} type="button" onClick={newAnswer} id="choice2" >{choice2}</button> <br></br>
            <button className={clickbtn3 ?  "font-mono text-black bg-sky-0  p-2 mb-2 rounded w-8/12 text-center text-xs md:text-base border-2   border-sky-700  lg:hover:text-white hover:bg-sky-0 lg:hover:bg-sky-700  transition-all duration-[400ms] " :"font-mono text-black bg-sky-0  p-2 mb-2 rounded text-xs md:text-base w-8/12 lg:w-2/4 text-center border-2  border-sky-700  hover:text-white hover:bg-sky-700  transition-all duration-[400ms] "} type="button" onClick={newAnswer} id="choice3" >{choice3}</button><br></br>
            <input className="font-mono float-right font-bold bg-yellow-600 rounded px-4 py-2 m-4 text-white hover:bg-yellow-800 cursor-pointer" type="submit" value="next" />
        </form>
        <div className='flex '>  <div className='font-mono font-bold bg-yellow-600 hover:bg-yellow-800 rounded px-4 py-2 m-4 w-max z-0 text-white cursor-pointer '> {minutes}:{seconds<10 ? "0" + seconds: seconds }</div>      <div className='font-mono w-max m-auto text-base font-bold lg:text-3xl italic antialiased  md:text-xl '> Question {I.current}</div> </div>

    </div>
   
    );
}

export default QueBox;
