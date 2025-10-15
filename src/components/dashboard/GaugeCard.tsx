"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { ReactNode } from 'react';

ChartJS.register(ArcElement, Tooltip);

interface GaugeCardProps {
  title: string;
  icon: ReactNode;
  value: number;
  unit: string;
  min: number;
  max: number;
  colorStops: { value: number; color: string }[]; 
}

export default function GaugeCard({ title, icon, value, unit, min, max, colorStops }: GaugeCardProps) {
  
  const getCurrentColor = () => {
    const sortedStops = [...colorStops].sort((a, b) => b.value - a.value);
    const activeStop = sortedStops.find(stop => value >= stop.value);
    return activeStop ? activeStop.color : sortedStops[sortedStops.length - 1]?.color || '#374151';
  };

  const currentColor = getCurrentColor();
  const alertCondition = currentColor.includes('f87171') || currentColor.includes('fb923c'); // Red or Orange

  const alertClasses = alertCondition 
    ? 'border-red-500/50 bg-red-500/10 text-red-400' 
    : 'border-gray-700/50 bg-gray-800/50';

  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: [currentColor, '#374151'], 
        borderColor: ['transparent', 'transparent'],
        borderWidth: 0,
        borderRadius: 0,
        circumference: 180,
        rotation: -90,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '85%', 
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    layout: {
      padding: {
        top: -10,
      }
    }
  };

  return (
    <div className={`p-5 rounded-lg border transition-all duration-300 ${alertClasses}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <div className={`transition-colors ${alertCondition ? 'text-red-400' : 'text-gray-500'}`}>
          {icon}
        </div>
      </div>
      
      <div className="relative flex justify-center items-center h-24 mt-2"> 
        <Doughnut data={data} options={options} />
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-baseline">
          <span className="text-3xl font-bold text-white">{value.toFixed(1)}</span>
          <span className="ml-1 text-base text-gray-400">{unit}</span>
        </div>
      </div>
    </div>
  );
}