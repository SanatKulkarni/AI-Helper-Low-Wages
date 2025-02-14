import React, { useState } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  monthlyContribution: number;
}

export function SavingsGoals() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<SavingsGoal, 'id'>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    monthlyContribution: 0
  });

  const addGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) return;

    const goal: SavingsGoal = {
      ...newGoal,
      id: Date.now().toString()
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      deadline: '',
      monthlyContribution: 0
    });
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const calculateProgress = (goal: SavingsGoal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const getChartData = () => {
    return goals.map(goal => ({
      name: goal.name,
      Progress: calculateProgress(goal),
      Remaining: 100 - calculateProgress(goal)
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-8">
        <Target className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Goal
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Name
              </label>
              <input
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Emergency Fund"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount (₹)
              </label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Amount (₹)
              </label>
              <input
                type="number"
                value={newGoal.currentAmount}
                onChange={(e) => setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Contribution (₹)
              </label>
              <input
                type="number"
                value={newGoal.monthlyContribution}
                onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: Number(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={addGoal}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Progress Overview
            </h2>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Progress" stackId="a" fill="#2563eb" />
                  <Bar dataKey="Remaining" stackId="a" fill="#e2e8f0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Goals
            </h2>
            
            <div className="space-y-4">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  className="p-4 border rounded-lg hover:border-blue-200 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    <button
                      onClick={() => removeGoal(goal.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress:</span>
                      <span className="text-gray-900">
                        ₹{goal.currentAmount.toLocaleString()} of ₹{goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${calculateProgress(goal)}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Target Date:</span>
                      <span className="text-gray-900">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monthly Contribution:</span>
                      <span className="text-gray-900">
                        ₹{goal.monthlyContribution.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {goals.length === 0 && (
                <p className="text-center text-gray-500">
                  No savings goals yet. Add one to get started!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}