import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faFlag } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, setPriority }) => {
  const [isPriority, setIsPriority] = useState(false);

  const handlePriorityClick = () => {
    setIsPriority(!isPriority);
    setPriority(task.id);
  };
  return (
    <div className="Todo"> 
      <input
        type="radio"
        className="option-input radio  todo-checkbox" 
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
    
      />
        <p className={`${task.completed ? 'completed' : 'incompleted'}`} onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>
      <div className='FontParent'>
        <FontAwesomeIcon className="edit-icon  iconedit " icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon icondelete " icon={faTrash} onClick={() => deleteTodo(task.id)} />
        <FontAwesomeIcon
          className={` iconflag priority-icon ${isPriority ? 'priority-active' : ''}`}
          icon={faFlag}
          onClick={handlePriorityClick}
        />
      </div>
    </div>
  );
};
