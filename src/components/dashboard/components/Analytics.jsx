import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
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

const Card = ({ className, children }) => (
  <div className={classNames('bg-white p-4 rounded-2xl shadow-sm border border-gray-200', className)}>
    {children}
  </div>
);

const timeFilters = ['Year', 'Month', 'Week', 'Day'];

const Analytics = () => {
  const [filter, setFilter] = useState('Month');

  const [engagementData, setEngagementData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [topSellingData, setTopSellingData] = useState([]);
  const [profitLossData, setProfitLossData] = useState([]);

  const [engagementLoading, setEngagementLoading] = useState(false);
  const [salesLoading, setSalesLoading] = useState(false);
  const [topSellingLoading, setTopSellingLoading] = useState(false);
  const [profitLossLoading, setProfitLossLoading] = useState(false);

  const maxY = salesData.length > 0 ? Math.max(...salesData.map(d => d.value)) + 5 : 20;

  // Fetch customer engagement
  useEffect(() => {
    const fetchEngagement = async () => {
      setEngagementLoading(true);
      try {
        const res = await fetch(`http://localhost/api/analytics/engagement/${filter.toLowerCase()}`);
        const { newCustomers, existingCustomers, leads } = await res.json();
        setEngagementData([
          { name: 'New Customers', value: newCustomers },
          { name: 'Existing', value: existingCustomers },
          { name: 'Leads', value: leads },
        ]);
      } catch (err) {
        console.error('Error fetching engagement data:', err);
        setEngagementData([]);
      } finally {
        setEngagementLoading(false);
      }
    };
    fetchEngagement();
  }, [filter]);

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      setSalesLoading(true);
      try {
        const res = await fetch(`http://localhost/api/analytics/sales/${filter.toLowerCase()}`);
        const { data } = await res.json();
        setSalesData(data || []);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setSalesData([]);
      } finally {
        setSalesLoading(false);
      }
    };
    fetchSales();
  }, [filter]);

  // Fetch top selling products
  useEffect(() => {
    const fetchTopSelling = async () => {
      setTopSellingLoading(true);
      try {
        const res = await fetch(`http://localhost/api/analytics/topSelling/${filter.toLowerCase()}`);
        const { data } = await res.json();
        setTopSellingData(data || []);
      } catch (err) {
        console.error('Error fetching top selling data:', err);
        setTopSellingData([]);
      } finally {
        setTopSellingLoading(false);
      }
    };
    fetchTopSelling();
  }, [filter]);

  // Fetch profit/loss data
  useEffect(() => {
    const fetchProfitLoss = async () => {
      setProfitLossLoading(true);
      try {
        const res = await fetch(`http://localhost/api/analytics/profitLoss/${filter.toLowerCase()}`);
        const { data } = await res.json();
        setProfitLossData(data || []);
      } catch (err) {
        console.error('Error fetching profit/loss data:', err);
        setProfitLossData([]);
      } finally {
        setProfitLossLoading(false);
      }
    };
    fetchProfitLoss();
  }, [filter]);

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
            <span className={`inline-block w-3 h-3 border rounded-full ${filter === item ? 'bg-white' : 'bg-gray-200'}`}></span>
            {item}
          </button>
        ))}
      </div>

      {/* Customer Engagement & Sales Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h2 className="text-lg mb-2">Customer Engagement Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            {engagementLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading...</div>
            ) : (
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#555" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg mb-2">Sales Performance Graph (sample data for Understaning)</h2>
          <ResponsiveContainer width="100%" height={250}>
            {salesLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading...</div>
            ) : (
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, maxY]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Selling & Profit/Loss Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-lg mb-2">Top Selling Products (sample data for Understaning)</h2>
          <ResponsiveContainer width="100%" height={200}>
            {topSellingLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading...</div>
            ) : (
              <BarChart layout="vertical" data={topSellingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#4B4B5B" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Card>

        <Card>
          <h2 className="text-lg mb-2">Profit Loss Ratio (sample data for Understaning)</h2>
          <ResponsiveContainer width="100%" height={250}>
            {profitLossLoading ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">Loading...</div>
            ) : (
              <RadarChart outerRadius={90} data={profitLossData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} />
                <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            )}
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
