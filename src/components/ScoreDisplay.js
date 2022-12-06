import React,{useEffect} from 'react';

function ScoreDisplay(props) {
  useEffect(()=>{
    props.updateLeaderBoard();
  },[])
  return (
    <div className='text-black rounded p-8'>
        <span className='block font-mono italic text-black font-bold bg-sky-0  py-4 mb-2 rounded  text-center border-2  border-sky-700  hover:text-white hover:bg-sky-700 text-3xl '>You Scored {props.score} out of 12 !</span>
        <span className='block font-mono text-xs text-bold mx-12  my-8 text-left whitespace-normal lg:text-sm'>You Took {props.time} seconds to finish the exam ! Dont forget to check the leaderboard down below !</span>
        <button onClick={()=>window.location.href = props.url +'-QUIZ'} className='bg-yellow-600 px-4 py-2 rounded text-white hover:bg-yellow-800 font-bold float-right'>Try Again!</button>
        <button onClick={()=>window.location.href ="/"}className='bg-yellow-600 px-4 py-2 rounded text-white hover:bg-yellow-800 font-bold'>Go To Home Page</button>
    </div>
    );
}

export default ScoreDisplay;
