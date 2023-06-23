import React, { useState } from 'react';
import Column from './Column';
import data from '../data';

const Board = () => {
  const [columns, setColumns] = useState(data);

  const handleAddTask = (columnId, newTask) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, newTask],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleMoveTask = (taskId, fromColumnId, toColumnId) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === fromColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      if (column.id === toColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, findTaskById(taskId)],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleDeleteTask = (taskId, columnId) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const findTaskById = (taskId) => {
    for (const column of columns) {
      const task = column.tasks.find((task) => task.id === taskId);
      if (task) {
        return task;
      }
    }
    return null;
  };

  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onAddTask={handleAddTask}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default Board;

