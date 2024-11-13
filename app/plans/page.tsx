"use client";
import { RootState } from '@/redux-store/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import RequirementTodo from '../todo/requirements/page';
import ActivitiesToDo from '../todo/activities/page';
import FoodsToDo from '../todo/food/page';
import GuideTodo from '../todo/guides/page';
import { Button } from '@/components/ui/button';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import axios from "axios";

const Plan = () => {
  const plan = useSelector((state: RootState) => state.plans.plan);
  const [activeTab, setActiveTab] = useState('requirements');

  const savePlan = async () => {
    try {
      // TODO create slice stores to save the state of the tasks as well
      const response = await axios.post('/api/plans', plan);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

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
      <div className="text-center">
        <h1 className='text-4xl text-black font-bold pt-2 uppercase'>Travelcat</h1>
      </div>
      <div className='text-xl text-black font-bold pt-2 uppercase text-center'>
        {plan.destination}
      </div>
      <div className='text-xl text-black font-bold pt-2 uppercase text-center'>
        {plan.startDate} - {plan.endDate}
      </div>
      <div className='flex justify-center text-xl text-black font-bold p-2' >
        <SignedOut>
          Sign-in to save this plan
        </SignedOut>
        <SignedIn>
          <Button onClick={() => savePlan()}>
            Save Plan
          </Button>
        </SignedIn>
      </div>
      <div className="flex justify-around mb-4">
        {
          (plan["requirements"] && plan["requirements"].length > 0) &&
          <button
            onClick={() => setActiveTab('requirements')}
            className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'requirements' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Requirements
          </button>
        }
        {
          (plan["foods"] && plan["foods"].length > 0) &&
          <button
            onClick={() => setActiveTab('food')}
            className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'food' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Food
          </button>
        }
        {
          (plan["activities"] && plan["activities"].length > 0) &&
          <button
            onClick={() => setActiveTab('activities')}
            className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'activities' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Activities
          </button>
        }
        {
          (plan["guides"] && plan["guides"].length > 0) &&
          <button
            onClick={() => setActiveTab('tourGuides')}
            className={`py-2 px-4 text-sm font-semibold rounded-lg ${activeTab === 'tourGuides' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Tour Guides
          </button>
        }
      </div>
      <div className="border-t pt-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default Plan