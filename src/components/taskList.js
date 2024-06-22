import React from 'react'
import {FaEdit, FaCheckDouble, FaRegTrashAlt} from 'react-icons/fa'
const TaskList = ({task, index, deleteTask, getSingleTask, setComplet}) => {
  return (
 <div className='task-list'>

   <div className='list-show'>
    <span className='list-name'><div className={task.iscomplet ? 'vertical-line':'vertical-line2'}></div>{index + 1}. {task.name} </span>
    <span className='icon-com'><FaCheckDouble color='green' size={20} onClick={() => {
        setComplet(task)
    }}/></span>
    <span className='icon-edit'><FaEdit color='brown' size={20} onClick={() => {
        getSingleTask(task)
    }} /></span>
    <span className='icon-delete'><FaRegTrashAlt color='red' size={20} onClick={() => {
        deleteTask(task._id)
    }} /></span>
   </div>
 </div>
  )
}

export default TaskList