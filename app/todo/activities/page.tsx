import React, { useState } from 'react'

const ActivitiesToDo = ({ activities }) => {
  console.log("setting requirements todo");
  const [tasks, setTasks] = useState(
    activities.map((activity: { order: number, description: string; }) => ({ text: activity.description, order: activity.order, completed: false }))
  );

  // Toggle task completion
  const toggleTask = (index: any) => {
    const updatedTasks = tasks.map((task: { completed: any; }, i: any) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index: any) => {
    const updatedTasks = tasks.filter((_: any, i: any) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white text-slate-900">
      <ul>
        {tasks.map((task, index: number) => (
          <li key={index} className="flex items-center justify-between mb-5 shadow-md rounded-lg p-5">
            <span
              onClick={() => toggleTask(index)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.order + 1} - {task.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivitiesToDo