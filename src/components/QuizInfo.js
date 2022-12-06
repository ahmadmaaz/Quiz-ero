import React from 'react';

function QuizInfo(props) {
  return(
    <div className='text-black rounded p-8 '>
        <span className='block font-mono italic text-black font-bold bg-sky-0  py-4 mb-2 rounded  text-center border-2  border-sky-700  hover:text-white hover:bg-sky-700 text-2xl cursor-pointer transition-all duration-300'>{props.title} Quiz !</span>
        <span className='block font-mono text-xs text-bold mx-12  my-8 text-left whitespace-normal lg:text-sm'>The quiz contains 12 questions and you have 72 seconds to finish. The score will be shown at the end. </span>
        <div className='text-center'><button onClick={()=>props.get()} className='bg-yellow-600 px-4 py-2 rounded text-white hover:bg-yellow-800 font-bold  transition-all duration-300'>Start The Quiz!</button> </div>
    </div>
  )
}

export default QuizInfo;
