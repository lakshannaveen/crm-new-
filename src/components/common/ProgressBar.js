import React from 'react';

const ProgressBar = ({
  progress,
  label,
  showLabel = true,
  showPercentage = true,
  color = 'blue',
  size = 'medium',
  className = '',
}) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
  };

  const sizes = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-medium">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`h-full ${colors[color]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;