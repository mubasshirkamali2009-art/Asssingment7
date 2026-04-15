"use client";
import React, { useState, useEffect } from 'react';
import { Legend, Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const StartsPage = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimelineData = () => {
      setLoading(true);
      const savedTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
      const counts = savedTimeline.reduce((acc, item) => {
        acc[item.action] = (acc[item.action] || 0) + 1;
        return acc;
      }, {});

      const formattedData = [
        { name: 'Call', value: counts['Call'] || 0, fill: '#0088FE' },
        { name: 'Text', value: counts['Text'] || 0, fill: '#00C49F' },
        { name: 'Video', value: counts['Video'] || 0, fill: '#FFBB28' },
      ];

      setChartData(formattedData);
      setTimeout(() => setLoading(false), 500);
    };

    loadTimelineData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-300 flex flex-col justify-center items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 border-r-blue-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
        </div>
        <p className="text-gray-400 text-sm animate-pulse">Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-6 md:space-y-10 p-5 md:p-10 min-h-screen bg-base-300'>
      <div className='text-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-black font-bold'>Friendship Analytics</h1>
        <p className='text-gray-500 mt-2 text-sm md:text-base'>By Interaction Type</p>
      </div>

      <div className="w-full max-w-[500px] h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
              label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StartsPage;