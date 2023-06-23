import React, { useState } from 'react';
import Task from './Task';

const Column = ({ column, onAddTask, onMoveTask, onDeleteTask }) => { 
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
    };

    onAddTask(column.id, newTask);
    setNewTaskTitle('');
  };

  const handleMoveTask = (taskId, fromColumnId, toColumnId) => {
    onMoveTask(taskId, fromColumnId, toColumnId);
  };

  const handleDeleteTask = (taskId, columnId) => {
    onDeleteTask(taskId, columnId);
  };

  return (
    <div className="column">
      <h2>{column.title}</h2>
      <div className="task-list">
        {column.tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              onMoveTask={handleMoveTask}
              onDeleteTask={handleDeleteTask} 
              columnId={column.id}
            />
          );
        })}
      </div>
      <div className="add-task">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>
    </div>
  );
};

export default Column;
