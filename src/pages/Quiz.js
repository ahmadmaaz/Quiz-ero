import React,{useState,useEffect} from 'react';
import axios from 'axios';
import QueBox from '../components/QueBox';
import QuizInfo from '../components/QuizInfo';
import ScoreDisplay from '../components/ScoreDisplay';
import LeaderBoard from '../components/LeaderBoard';
import NamePopUp from '../components/NamePopUp';
import NavBar from '../components/NavBar';
function Quiz(props) {
    const [leaderBoard,setLeaderBoard]=useState([])
    //Quetions variable 
    const [ques,setQues]=useState([]);
    //The id that is collected by the server ..
    const [id,setId]=useState()
    const [score,setScore]=useState('0')
    const [done,setDone]=useState(false)
    const [time,setTime]=useState(0)
    useEffect(()=>{
      if(props.url){
        updateLeaderBoard()
      }
    },[done,props.url])

    function updateLeaderBoard(){
      axios.get(props.url+`/score?scoreTable=${props.scoreTable}`).then((response)=>{
        console.log(response.data)
        setLeaderBoard(response.data)
      })
    }

    const getQuiz = ()=>{
      
      axios.get(props.url+`?quizTable=${props.quizTable}`).then((response)=>{
        setId( response.data.id);
        setQues(response.data.ques)
        
        
      })
     
    }
    const postQuiz = (answers_,time)=>{
      setTime(time)
      setDone(true)
      axios.post(props.url,{scoreTable: props.scoreTable,answers:answers_,time:time,id:id,key:localStorage.getItem("Key_QA")}).then((response)=>{
        setScore(response.data.score)
      })
    }
  
    return (
      <div className='select-none'>
        <NamePopUp updateLeaderBoard={updateLeaderBoard}/>
        <NavBar />
        <div className="flex flex-wrap">  
            <div className="w-full  lg:w-1/4  xl:w-1/4 md:w-1/4 "></div>
            <div className="w-full  lg:w-2/4  xl:w-2/4 md:w-2/4 ">
                {id ? 
                  <div>
                    { done ? 
                      <div>
                        <ScoreDisplay time={time} score={score} url={props.url} updateLeaderBoard={updateLeaderBoard} /> 
                        <hr></hr> <br></br> <br></br>
                        <LeaderBoard leaderBoard={leaderBoard} />
                        <br></br> <br></br>
                      </div>
                      : <QueBox ques={ques} post={postQuiz}  type={props.type} />} 
                  </div>
                :
                <div>
                  <QuizInfo title={props.title} get={getQuiz} />
                  <hr></hr> <br></br> <br></br>
                  <LeaderBoard leaderBoard={leaderBoard} />
                  <br></br> <br></br>
                </div>
                }
              
            </div>
            
            <div className="w-full  lg:w-1/4  md:w-1/4 xl:w-1/4"></div>
        </div>
            
      </div>
    );
}

export default Quiz;
