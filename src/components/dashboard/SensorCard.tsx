import { ReactNode } from 'react';

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
  alertCondition?: boolean;
}

export default function SensorCard({ title, value, unit, icon, alertCondition = false }: SensorCardProps) {
  const alertClasses = alertCondition 
    ? 'border-red-500/50 bg-red-500/10 text-red-400' 
    : 'border-gray-700/50 bg-gray-800/50';

  return (
    <div className={`p-5 rounded-lg border transition-all duration-300 ${alertClasses}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <div className={`transition-colors ${alertCondition ? 'text-red-400' : 'text-gray-500'}`}>
          {icon}
        </div>
      </div>
      <div>
        <span className="text-4xl font-bold text-white">{value}</span>
        <span className="ml-2 text-lg text-gray-400">{unit}</span>
      </div>
    </div>
  );
}