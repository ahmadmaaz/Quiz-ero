import React from 'react';
import { MdQuiz } from "react-icons/md";
function NavBar() {
  return (
    
    <nav className='sticky border-b-2 border-slate p-4 flex justify-between shadow-2xl shadow-white-500'>
        
        <p className='text-4xl  lg:text-5xl mr-2 italic font-sans antialiased font-medium cursor-pointer hover:rotate-6 transition-all duration-500' onClick={()=> window.location.href= "/"}> Quizero </p>
        <MdQuiz className='text-4xl  lg:text-5xl hover:animate-spin-one cursor-pointer'/>
    
    </nav>

    );
}

export default NavBar;
