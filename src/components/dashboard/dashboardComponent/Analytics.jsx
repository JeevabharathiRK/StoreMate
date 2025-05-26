import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Card } from '../../ui/card';

// Static data
const engagementData = [
  { name: 'New Customers', value: 400 },
  { name: 'Existing', value: 880 },
  { name: 'Leads', value: 600 },
];

const sellingProducts = [
  { name: 'Shirts', value: 88 },
  { name: 'Mobiles', value: 60 },
  { name: 'Laptops', value: 40 },
];

const profitLossData = [
  { subject: 'Profit', A: 100 },
  { subject: 'Loss', A: 40 },
  { subject: 'Stocked', A: 60 },
  { subject: 'Clearance', A: 90 },
];

// Sales data by filter
const salesDataByFilter = {
  Year: [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 6 },
    { name: 'Mar', value: 8 },
    { name: 'Apr', value: 10 },
    { name: 'May', value: 12 },
    { name: 'Jun', value: 9 },
    { name: 'Jul', value: 11 },
    { name: 'Aug', value: 14 },
    { name: 'Sep', value: 13 },
    { name: 'Oct', value: 15 },
    { name: 'Nov', value: 10 },
    { name: 'Dec', value: 16 },
  ],
  Month: [
    { name: 'Week 1', value: 5 },
    { name: 'Week 2', value: 9 },
    { name: 'Week 3', value: 12 },
    { name: 'Week 4', value: 15 },
  ],
  Week: [
    { name: 'Mon', value: 5 },
    { name: 'Tue', value: 7 },
    { name: 'Wed', value: 6 },
    { name: 'Thu', value: 9 },
    { name: 'Fri', value: 10 },
    { name: 'Sat', value: 4 },
    { name: 'Sun', value: 3 },
  ],
  Day: [
    { name: '10AM', value: 2 },
    { name: '12PM', value: 5 },
    { name: '2PM', value: 7 },
    { name: '4PM', value: 6 },
    { name: '6PM', value: 4 },
    { name: '8PM', value: 3 },
  ],
};

const timeFilters = ['Year', 'Month', 'Week', 'Day'];

const AnalyticsDashboard = () => {
  const [filter, setFilter] = useState('Month');
  const salesData = salesDataByFilter[filter];
  const maxY = Math.max(...salesData.map(d => d.value)) + 5;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Analytics</h1>

      {/* Time Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {timeFilters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`border px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-200 ${
              filter === item ? 'bg-black text-white' : 'bg-white text-black border-gray-300'
            }`}
          >
            <span className={`inline-block w-3 h-3 border rounded-full ${
              filter === item ? 'bg-white' : 'bg-gray-200'
            }`}></span>
            {item}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <h2 className="text-lg mb-2">Customer Engagement Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#555" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg mb-2">Sales Performance Graph ({filter})</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, maxY]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#000"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg mb-2">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={sellingProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#4B4B5B" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg mb-2">Profit Loss Ratio</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart outerRadius={90} data={profitLossData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
