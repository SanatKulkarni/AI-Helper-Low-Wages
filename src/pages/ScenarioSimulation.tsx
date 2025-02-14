import React, { useState } from 'react';
import { TrendingUp, Calculator } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Scenario {
  type: string;
  amount: number;
  frequency: 'weekly' | 'monthly';
  duration: number;
}

export function ScenarioSimulation() {
  const [scenario, setScenario] = useState<Scenario>({
    type: 'savings',
    amount: 20,
    frequency: 'weekly',
    duration: 12
  });

  const [currentSavings] = useState(1000);
  const [monthlyIncome] = useState(3000);
  const [monthlyExpenses] = useState(2500);

  const calculateProjection = () => {
    const months = Array.from({ length: scenario.duration + 1 }, (_, i) => i);
    const monthlyAmount = scenario.frequency === 'weekly' 
      ? scenario.amount * 4.33 
      : scenario.amount;

    return months.map(month => {
      const baseAmount = currentSavings + (monthlyIncome - monthlyExpenses) * month;
      const scenarioAmount = monthlyAmount * month;
      
      return {
        month: `Month ${month}`,
        'Without Changes': Math.round(baseAmount),
        'With Changes': Math.round(baseAmount + scenarioAmount)
      };
    });
  };

  const data = calculateProjection();
  const impact = data[data.length - 1]['With Changes'] - data[data.length - 1]['Without Changes'];

  return (
    <div>
      <div className="flex items-center justify-center mb-8">
        <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Financial Scenarios</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Scenario Parameters
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scenario Type
              </label>
              <select
                value={scenario.type}
                onChange={(e) => setScenario({ ...scenario, type: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="savings">Additional Savings</option>
                <option value="expenses">Reduce Expenses</option>
                <option value="income">Additional Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={scenario.amount}
                onChange={(e) => setScenario({ ...scenario, amount: Number(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                value={scenario.frequency}
                onChange={(e) => setScenario({ ...scenario, frequency: e.target.value as 'weekly' | 'monthly' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (months)
              </label>
              <input
                type="number"
                value={scenario.duration}
                onChange={(e) => setScenario({ ...scenario, duration: Number(e.target.value) })}
                min="1"
                max="60"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Impact Analysis
            </h3>
            <p className="mt-2 text-blue-800">
              By {scenario.type === 'savings' ? 'saving' : scenario.type === 'expenses' ? 'reducing expenses by' : 'earning'} ₹
              {scenario.amount} {scenario.frequency}, you could have an additional ₹{impact.toLocaleString()} after {scenario.duration} months.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Projection Chart
          </h2>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Without Changes"
                  stroke="#94a3b8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="With Changes"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}