import React from 'react';

function LeaderBoard(props) {
    
  return (
    <div className='text-center'>
        <table className='table-auto w-11/12 text-center m-auto border-double border-2  border-black '>
            <thead className='bg-gray-100 '>
                <tr>
                    <th className='w-2/12 px-2 py-2 text-xs md:text-sm lg:text-base'>City</th>
                    <th className='w-2/12 px-2 py-2 text-xs md:text-sm lg:text-base'>Username</th>
                    <th className='w-2/12 px-2 py-2 text-xs md:text-sm lg:text-base'>Score</th>
                    <th className='w-2/12 px-2 py-2 text-xs md:text-sm lg:text-base'>TimeSpent</th>
                    <th className='w-2/12 px-2 py-2 text-xs md:text-sm lg:text-base'>TimesDone</th>
                </tr>
            </thead>
            <tbody>
                {props.leaderBoard.map((row,key)=>(
                    
                    <tr key={key} className="border border-gray-200">
                        <td className='text-xs md:text-sm lg:text-sm '>{row.City}</td>
                        <td className='text-xs md:text-sm lg:text-sm'>{row.name}</td>
                        <td className='text-xs md:text-sm lg:text-sm'>{row.score}</td>
                        <td className='text-xs md:text-sm lg:text-sm'>{row.timeSpent}</td>
                        <td className='text-xs md:text-sm lg:text-sm'>{row.timesDone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default LeaderBoard;
