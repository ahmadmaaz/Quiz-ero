import React from 'react';

function QuizCard(props) {
  return (
    <div class="shrink-0 w-72  rounded shadow-xl mr-4">
        <img class="w-full h-48" src={props.img} alt="WW2 Pic" />
        <div class="px-6 py-4 h-44">
            <div class="font-bold text-base md:text-xl mb-2">{props.title}</div>
            <p class="text-gray-700 text-xs md:text-base">{props.caption}</p>
        </div>
        <div className='flex justify-center mb-4'>
            <button className='bg-yellow-600 px-4 py-2 rounded text-white hover:bg-yellow-800 font-bold ' onClick={()=>window.location.href= props.url}> Go To The Quiz</button>
        </div>
    </div>
    );
}

export default QuizCard;
