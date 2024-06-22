import React from 'react'

const TaskForm = ({handleOnChange, name, onSubmit, editMode, updateTask}) => {
  return (
    <form onSubmit={ editMode? updateTask: onSubmit} className='task-form'>
      <input type='text' placeholder='Add task' name='name' value={name} onChange={handleOnChange} className='form-input'/>

      <button type='submit' className='form-button'> {editMode? "Edit Task": "Add Task"}  </button>
    </form>
  )
}

export default TaskForm