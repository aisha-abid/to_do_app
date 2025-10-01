import React, { useEffect, useState } from 'react'
import todo from "./assets/pick.png"
import circle from "./assets/circle.png"
import tick from "./assets/tick.png"

const App = () => {
  const [text, setText]=useState("");
  const [tasks,setTasks]=useState(()=> {
    // Initialize tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });
 
  const textInput=(e)=>{
  setText(e.target.value);
  }

  const handleTasks=()=>{
    if(text===""){
      alert("please enter your task")
    }else{
    setTasks([...tasks,{text,completed:false}]) //text ko object is liyay bnaaya ta k hum is me status add kar saky completed ka ..jis se kar saky ga user
    setText("");
    }
  }
  const handleToggle=(index)=>{
   const newTasks=tasks.map((task,i)=> i===index?{...task,completed:!task.completed}:task)//agr i ka index milta hay to ye sary tasks ly ga ...or toggle karny par completed ka jo b status ho ga ye uska ult kar dy ga nahi to return kar dy ka task ko wesy hi 
   setTasks(newTasks)
  }


  const handleRemove=(index)=>{
    const newTasks=tasks.filter((task,i)=> i !==index)
    setTasks(newTasks);
  }

  // useEffect(()=>{
  //   const savedTasks=JSON.parse(localStorage.getItem("tasks")) || [];
  //   setTasks(savedTasks)
  //      console.log("Loaded from LS:", tasks);
  // },[])

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
    console.log("Tasks saved to LS:", JSON.stringify(tasks));
  },[tasks])

  return (
    <div className='bg-gradient-to-br from-[#1e2e73] via-[#3a1968] to-[#480c61] h-screen flex '>
      <div className='bg-[#ffffff] max-w-[500px] w-full m-auto mt-30 p-10 rounded-md '>

        <h1 className='flex items-center justify-start text-[#002765] text-2xl gap-2 font-semibold'>To-Do List <img src={todo} alt="" className='w-8 h-8' /></h1>

        
        <div className='flex bg-[#edeef0] w-full  rounded-4xl items-center justify-between my-3'>
          <input type="text" value={text} placeholder='Add your task'  onChange={textInput}
          className='w-full border-0 outline-0 px-10 py-1 '/>
        <button className='bg-orange-700 py-1 px-4 rounded-4xl text-amber-50 text-xl cursor-pointer'
        onClick={handleTasks}
        >Add</button>
        </div>

         <ul className='px-7 space-y-3'>
        {tasks.map((task,index)=>(

      
          <li className='flex items-center justify-between px-3 py-0.5 'key={index}>
             <div className="flex items-center space-x-3">
            <img className='w-5 h-5 mr-2' 
            onClick={()=>{handleToggle(index)}}
             src={task.completed?tick:circle} alt="" />
            <span className={` ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
            >{task.text}</span>
            
            </div>
          <span 
          className='flex items-center justify-center font-bold  rounded-full h-7 w-7 hover:bg-red-500 hover:text-amber-50 transition ml-50'
          onClick={() =>{handleRemove(index)}}
          >×</span></li>
        )
      )
    }
         </ul>   
      </div>
    </div>
  )
}

export default App