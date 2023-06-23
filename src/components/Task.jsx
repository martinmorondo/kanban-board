import React, { useState } from 'react';

const Task = ({ task, onMoveTask, onDeleteTask, columnId }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toColumnId) => {
    const taskId = e.dataTransfer.getData('taskId');
    onMoveTask(taskId, columnId, toColumnId);
    setIsDragging(false);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id, columnId);
  };

  return (
    <div
      className={`task ${isDragging ? 'dragging' : ''}`}
      draggable={!isDragging}
      onDragStart={(e) => handleDragStart(e, task.id)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnId)}
    >
      <p>{task.title}</p>
        <i className="fa fa-trash" aria-hidden="true" aria-label="Delete Task"
        onClick={handleDeleteTask}></i>
    </div>
  );
};

export default Task;
