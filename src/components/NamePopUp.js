import React,{useState,useEffect} from 'react';
import {GrUserAdd,GrLinkNext,GrClose} from "react-icons/gr";
import axios from 'axios';
function NamePopUp() {
    const [giveName,setGiveName]=useState(false)
    const [termAcc, setTermAcc]=useState(false)
    const [userName,setUserName]=useState("")
    const [error,setError]=useState("")
    useEffect(()=>{
        if (localStorage.getItem('Key_QA')===undefined || localStorage.getItem("Key_QA")===null){
            localStorage.setItem('Key_QA',Math.floor(Math.random()*10000000));
        }
        axios.get("api/term?key="+ localStorage.getItem("Key_QA"),).then((response)=>{
            setTermAcc( !response.data.termCondition)
            axios.get("api/name?key="+localStorage.getItem("Key_QA")).then((response)=>{
                setGiveName(response.data.name)
            })
        })
    },[])
    function clickTerm(){
        axios.post("api/term",{key:localStorage.getItem("Key_QA")}).then((response)=>{
            setTermAcc(false)
        })
        axios.get("api/name?key="+localStorage.getItem("Key_QA")).then((response)=>{
            setGiveName(response.data.name)
        })
    }
    function updateName(){
        if (userName.trim().length >2){
            setError("Please Wait....")
            axios.put("api/name",{name:userName,key:localStorage.getItem("Key_QA")}).then((response)=>{
                if (response.data.available===true){
                    //props.updateLeaderBoard();
                    setGiveName(false);
                    setError("");
                

                }
                else if (response.data.available===false){setError("This username is taken please choose another one")}
                else{setError("An error occured please try again later")}

            })
        }else{
            if (userName.trim().length>0){setError("The name should be more than 2 characters !")}
            else setError("The field is empty !")
        }
    }
  return (
    <div >
        <div>
        {termAcc
            ?      
            <div className='backdrop-blur backdrop-brightness-90 fixed z-10 w-full h-screen  flex justify-center items-center  '>
                <div className='block rounded drop-shadow-2xl shadow-sky-300 w-11/12  md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 bg-white text-center py-8 px-2 '> 
                    <h1 className='text-3xl lg:text-3xl xl:text-4xl italic font-bold mb-10'>Accept Our Term! </h1> 
                    <p className='text-xs px-16  lg:px-44 mb-12'>This website uses cookies/Local Storage.By clicking on the 'Close' Button you are giving the website the permission to use your browser's local storage. Also please dont change the browser ,like dont move from one browser to another one ! </p>
                    
                    <button onClick={clickTerm} className='rounded-full bg-yellow-500 p-4 flex justify-center items-center m-auto hover:bg-yellow-600 transition-all duration-300' > <GrClose className='text-2xl text-white'/></button>
                </div>
            </div> 
            :
            "" }
        </div>
        <div>
        { giveName 
            ?<div className='backdrop-blur backdrop-brightness-90  fixed w-full h-screen z-10 flex justify-center items-center '>
                <div className='block rounded drop-shadow-2xl shadow-sky-300 w-11/12  md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 bg-white text-center py-8 px-2 shadow-md shadow-black '> 
                    <h1 className='text-2xl lg:text-3xl xl:text-4xl italic font-bold mb-10'>Help Us Identify You!</h1> 
                    <input type="text" placeholder='Please Insert Your Name Here!' onChange={(e)=> setUserName(e.target.value)}  className='w-8/12 md:w-3/6 py-2 text-center rounded  border-2 border-black  italic mb-6'/>
                    {error ? <p className='bg-red-100 border border-red-400 text-red-700 text-center text-sm w-10/12  md:w-7/12 m-auto rounded py-2 mb-6'> {error}</p> : "" }
                    <p className='text-xs px-8 mb-12'>This will help to identify you in the leaderboard. You can leave it empty and your name will be "user". <b>You can change it later !</b></p>
                    <button onClick={updateName}className='rounded-full bg-yellow-500 p-4 flex justify-center items-center float-right mr-8 hover:bg-yellow-600 transition-all duration-300'><GrLinkNext className='text-2xl '/> </button>
                    <button onClick={()=>{setGiveName(false);setError("")}} className='rounded-full bg-yellow-500 p-4 flex justify-center items-center ml-8 hover:bg-yellow-600 transition-all duration-300'> <GrClose className='text-2xl '/></button>
                </div> 
                
                
            </div>   
            :
            <div className='fixed bottom-2 right-2 rounded-full bg-yellow-500 p-4 flex justify-center items-center cursor-pointer animate-bounce hover:animate-none hover:bg-yellow-600' onClick={()=> setGiveName(true)}> <GrUserAdd className='text-xl lg:text-3xl'/> </div> 
        }
        </div>
    </div>
  );
}

export default NamePopUp;
