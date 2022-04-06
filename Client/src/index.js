import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import './index.css';
export default function WebApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/WW2-QUIZ' element={<Quiz url="/WW2" title="World War 2" type="img"/> } ></Route>
        <Route path='/CW-QUIZ' element={<Quiz url="/CW" title="Cold War"  type="img"/> } ></Route>
        <Route path='/FLAGS-QUIZ' element={<Quiz url="/FLAGS" title="Guess the Flags"  type=""/> } ></Route>
        
        
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<WebApp />, document.getElementById("root"));