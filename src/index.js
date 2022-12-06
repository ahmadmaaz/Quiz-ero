import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import './index.css';
const Quiz=React.lazy(()=> import("./pages/Quiz"))
export default function WebApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/WW2-QUIZ' element={<React.Suspense fallback={<div className='h-screen w-screen flex justify-center items-center'>.</div>}><Quiz url="/api/quiz" title="World War 2" type="img"  quizTable="quizww2" scoreTable="ww2_score" /></React.Suspense> } ></Route>
        <Route path='/CW-QUIZ' element={<React.Suspense fallback={<div className='h-screen w-screen flex justify-center items-center'>.</div>}><Quiz url="/api/quiz" title="Cold War"  type="img" quizTable="quizcw" scoreTable="cw_score"/></React.Suspense>} ></Route>
        <Route path='/FLAGS-QUIZ' element={        <React.Suspense fallback={<div className='h-screen w-screen flex justify-center items-center'>.</div>}><Quiz url="/api/quiz" title="Guess the Flags"  type=""  quizTable="quizflags" scoreTable="flags_score"/> </React.Suspense> } ></Route>
        
        
      </Routes>
    </BrowserRouter>
    
  );
}

ReactDOM.render(<WebApp />, document.getElementById("root"));