import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const setPriority = (id) => {
    const updatedTodos = [...todos];
    const todoToMove = updatedTodos.find((todo) => todo.id === id);
    const index = updatedTodos.indexOf(todoToMove);

    updatedTodos.splice(index, 1);
    updatedTodos.unshift(todoToMove);

    setTodos(updatedTodos);
  };

  const incompleteTasks = todos.filter((todo) => !todo.completed);
  const completedTasks = todos.filter((todo) => todo.completed);

  return (
    <div className="TodoWrapper">
      <h1 className="WlcTitle">
        <FontAwesomeIcon icon={faSmile} /> TO-Do List
      </h1>
      <TodoForm addTodo={addTodo} />

      {incompleteTasks.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
            setPriority={setPriority}
          />
        )
      )}

      {completedTasks.length > 0 && (
        <div className="completed-card">
          <div
            className="completed-card-header"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <p className="CompletedName">
              {showCompleted ? "▼" : "▶"} Completed ( {completedTasks.length} )
            </p>
          </div>
          {showCompleted && (
            <div className="completed-card-content">
              {completedTasks.map((todo) =>
                todo.isEditing ? (
                  <EditTodoForm editTodo={editTask} task={todo} />
                ) : (
                  <Todo
                    key={todo.id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    toggleComplete={toggleComplete}
                    setPriority={setPriority}
                  />
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
