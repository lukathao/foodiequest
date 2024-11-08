import Link from 'next/link';
import React, { useState } from 'react'

const GuidesToDo = ({ guides }) => {
  const [tasks, setTasks] = useState(
    guides.map((guide: { name: string, contact: string, website: string }) => ({ name: guide.name, contact: guide.contact, website: guide.website, completed: false }))
  );
  //TODO images aren't displaying find a way to search for images and pop them up for the user

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
            <div>
              <div onClick={() => toggleTask(index)}
                className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.name}
              </div>
              <div>
                {task.contact}
              </div>
              <div>
                <a target="_blank" href={`https://www.${task.website}`}>
                  {task.website}
                </a>
              </div>
            </div>

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

export default GuidesToDo
