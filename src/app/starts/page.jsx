"use client";
import React, { useState, useEffect } from 'react';
import { Legend, Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { FcBarChart } from "react-icons/fc";
const StartsPage = () => {
  const [chartData, setChartData] = useState([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const loadTimelineData = () => {
      const savedTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
      
      if (savedTimeline.length === 0) {
        setHasData(false);
        return;
      }

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
      setHasData(formattedData.some(d => d.value > 0));
    };

    loadTimelineData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center space-y-6 md:space-y-10 p-5 md:p-10 min-h-screen bg-base-300'>
      <div className='text-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-black font-bold'>Friendship Analytics</h1>
        <p className='text-gray-500 mt-2 text-sm md:text-base'>By Interaction Type</p>
      </div>

      {!hasData ? (
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="text-5xl mb-4 mx-auto flex justify-center">
            <FcBarChart />
          </div>
          <h2 className="text-xl font-bold text-gray-800">History is empty</h2>
          <p className="text-gray-500 mt-2 mb-6">No analytics to show yet. Start interacting with your friends to see the data here!</p>
          <Link href="/" className="btn btn-primary w-full">
            Go to Home
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default StartsPage;