import React from 'react';

function QuizCard(props) {
  return (
    <div className="shrink-0 w-72 xl:w-80 2xl:w-[22rem] rounded shadow-lg shadow-black  mr-4">
        <img className="w-full h-48 2xl:h-64 rounded" src={props.img} alt="WW2 Pic" />
        <div className="px-6 py-4 h-44 xl:h-48 2xl:h-56">
            <div className="font-bold text-base md:text-xl mb-2">{props.title}</div>
            <p className="text-gray-700 text-xs md:text-base">{props.caption}</p>
        </div>
        <div className='flex justify-center mb-4'>
            <button className='bg-yellow-600 px-4 py-2 rounded text-white hover:bg-yellow-800 font-bold transition-all duration-300' onClick={()=>window.location.href= props.url}> Go To The Quiz</button>
        </div>
    </div>
    );
}

export default QuizCard;
