"use client";
import { RootState } from '@/redux-store/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import RequirementTodo from '../todo/requirements/page';
import ActivitiesToDo from '../todo/activities/page';
import FoodsToDo from '../todo/food/page';
import GuideTodo from '../todo/guides/page';

const Plan = () => {
  const plan = useSelector((state: RootState) => state.plans);
  const [activeTab, setActiveTab] = useState('requirements');

  const renderContent = () => {
    switch (activeTab) {
      case 'requirements':
        return <RequirementTodo requirements={plan["requirements"]} />;
      case 'food':
        return <FoodsToDo foods={plan["foods"]} />;
      case 'activities':
        return <ActivitiesToDo activities={plan["activities"]} />;
      case 'tourGuides':
        return <GuideTodo guides={plan["guides"]} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white">
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setActiveTab('requirements')}
          className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'requirements' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Requirements
        </button>
        <button
          onClick={() => setActiveTab('food')}
          className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'food' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Food
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'activities' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Activities
        </button>
        <button
          onClick={() => setActiveTab('tourGuides')}
          className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'tourGuides' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Tour Guides
        </button>
      </div>
      <div className="border-t pt-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default Plan