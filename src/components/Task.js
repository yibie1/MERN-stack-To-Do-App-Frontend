import React, { useEffect, useState } from 'react'
import TaskForm from './taskForm'
import TaskList from './taskList'
import { ToastContainer, toast } from 'react-toastify';
import baseUrl from '../service/api';
import axios from 'axios';
const Task = () => {

 const [formData, setFormData] = useState({
   name: "",
   iscomplet: false})
   const {name}= formData
const [tasks, setTasks] = useState([])
const[completedTask, setComletedTask] = useState()
const[editMode, setEditMode] = useState(false)
const[taskId, setTaskId] = useState("")

   const handelInputChange = (e) =>{
       const {name, value}= e.target
      setFormData({...formData, [name]: value})
   }
  const feachTask = async() =>{
   try {
    const {data} = await axios.get(baseUrl)
    console.log(data)
   setTasks(data)
   } catch (error) {

   }
  }

useEffect(()=>{
 feachTask()
},[])


   const createTask = async(e) =>{
    e.preventDefault()
    console.log(formData)
    if(name === ""){
       return alert("Name shouldn't be empty");
    }
    try {
        await axios.post(baseUrl, formData);
        setFormData({...formData, name : ""})
        feachTask()
    } catch (error) {
            alert(error.message)
    }
   }


   const deleteTask = async (id) =>{
    try {
        await axios.delete(`${baseUrl}/${id}`)
        feachTask()
        console.log("task deleetd ")
    } catch (error) {
        console.log(error.message)
    }
   }
   useEffect(() => {
    const cTask = tasks.filter((task) => {
        return task.iscomplet === true

    })
    setComletedTask(cTask)
   }, [tasks])
   const getSingleTask = (task) =>{
    setFormData({name: task.name, iscomplet: false})
    setTaskId(task._id)
    setEditMode(true)

   }


   const updateTask = async(e) =>{
     e.preventDefault()

     if(name ===""){
        alert("Name not be empty")
     }
     try {
        await axios.patch(`${baseUrl}/${taskId}`, formData)
        setFormData({...formData, name: ""})
        setEditMode(false)
        feachTask()
     } catch (error) {
        console.log(error.message)
     }
   }

   const setComplet = async(task) =>{
    const updateComplet= {
            name: task.name,
            iscomplet: true
    }

    try {
        await axios.patch(`${baseUrl}/${task._id}`, updateComplet)
        console.log("task complted sucssfully")
        feachTask()
    } catch (error) {
        console.log(error.message)
    }
   }


  return (
    <div className='task-container'>
   <ToastContainer />
       <center>
        <h2>Task Maneger </h2>
        <TaskForm
         name={name}
         handleOnChange={handelInputChange}
         onSubmit={createTask}
         editMode={editMode}
         updateTask={updateTask}
          />
        <hr />
        <div className='task-status'>
            {tasks.length > 0 &&(
    <><span className='status1'>Total Tasks: {tasks.length}  </span>
    <span className='status2'>completed Tasks: {completedTask.length}</span></>
            )}

   </div>
        {tasks.length === 0 ? (
                <span> There is no task please add new task</span>
        ):(
             <>
            {tasks.map((task, index)=>{
                return <TaskList
                 key={task._id}
                 task={task}
                 index={index}
                 deleteTask={deleteTask}
                 getSingleTask= {getSingleTask}
                 setComplet = {setComplet}
                 />

            })}
                </>
        )}

        </center>

    </div>
  )
}

export default Task