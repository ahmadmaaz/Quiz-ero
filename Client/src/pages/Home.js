import React,{useState} from 'react';
import NavBar from '../components/NavBar';
import NamePopUp from '../components/NamePopUp';
import QuizCard from '../components/QuizCard';

import WW2Pic from "./WW2.webp";
import FlagsPic from "./flags.webp";
import CWPic from "./ColdWar.webp"
function Home() {

  return (
    <div className='select-none'>
        
        <NamePopUp />
        <NavBar />
        
        
        <div className='flex justify-center ' >
            <div className="w-full md:w-10/12  px-8 lg:px-0 flex justify-between py-12 overflow-x-auto">
                <QuizCard img={FlagsPic} title="Guess The flag !" caption="Hmm Senegal? Cameroon? or Gabon ? Lets check it out ! Test your knowledge in flags here!" url="/FLAGS-QUIZ"/>
                <QuizCard img={WW2Pic} title="World War 2 !" caption="Test your knowledge about this war here! With all kind of questions that cover all events of this devastating war." url="/WW2-QUIZ"   />
                <QuizCard img={CWPic} title="Cold War !" caption="United States or Soviet Union? Test your knowledge here  !" url="/CW-QUIZ"/>
            </div>
        </div>

    </div>
    );
}

export default Home;
