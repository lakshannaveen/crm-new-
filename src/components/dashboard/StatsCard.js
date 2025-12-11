import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  trend = null,
  trendValue = 0,
  loading = false,
  onClick,
  className = '',
}) => {
  const colors = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      icon: 'text-blue-600 dark:text-blue-300',
      text: 'text-blue-600 dark:text-blue-400',
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      icon: 'text-green-600 dark:text-green-300',
      text: 'text-green-600 dark:text-green-400',
    },
    red: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      icon: 'text-red-600 dark:text-red-300',
      text: 'text-red-600 dark:text-red-400',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      icon: 'text-purple-600 dark:text-purple-300',
      text: 'text-purple-600 dark:text-purple-400',
    },
    yellow: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      icon: 'text-yellow-600 dark:text-yellow-300',
      text: 'text-yellow-600 dark:text-yellow-400',
    },
    indigo: {
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      icon: 'text-indigo-600 dark:text-indigo-300',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    pink: {
      bg: 'bg-pink-100 dark:bg-pink-900/30',
      icon: 'text-pink-600 dark:text-pink-300',
      text: 'text-pink-600 dark:text-pink-400',
    },
    gray: {
      bg: 'bg-gray-100 dark:bg-gray-900/30',
      icon: 'text-gray-600 dark:text-gray-300',
      text: 'text-gray-600 dark:text-gray-400',
    },
  };

  const selectedColor = colors[color] || colors.blue;

  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <FiTrendingUp className="text-green-500" />;
    } else if (trend === 'down') {
      return <FiTrendingDown className="text-red-500" />;
    } else if (trend === 'neutral') {
      return <FiMinus className="text-gray-500" />;
    }
    return null;
  };

  const renderTrendText = () => {
    if (!trend) return null;
    
    const trendClass = trend === 'up' 
      ? 'text-green-600 dark:text-green-400'
      : trend === 'down'
      ? 'text-red-600 dark:text-red-400'
      : 'text-gray-600 dark:text-gray-400';

    return (
      <span className={`text-sm font-medium ${trendClass} flex items-center`}>
        {renderTrendIcon()}
        <span className="ml-1">
          {trendValue > 0 ? '+' : ''}{trendValue}%
        </span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}>
        <div className="flex items-center">
          <div className={`h-12 w-12 rounded-lg ${selectedColor.bg} animate-pulse`} />
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse mb-2" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 ${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-12 w-12 rounded-lg ${selectedColor.bg} flex items-center justify-center`}>
            {Icon && <Icon className={`h-6 w-6 ${selectedColor.icon}`} />}
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </p>
          </div>
        </div>
        {renderTrendText()}
      </div>
      
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          {subtitle}
        </p>
      )}

      {/* Progress Bar (optional) */}
      {trendValue !== undefined && trend && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mb-1">
            <span>Last period</span>
            <span>{trend === 'up' ? 'Increase' : trend === 'down' ? 'Decrease' : 'No change'}</span>
          </div>
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                trend === 'up' ? 'bg-green-500' : 
                trend === 'down' ? 'bg-red-500' : 
                'bg-gray-400'
              }`}
              style={{ width: `${Math.min(Math.abs(trendValue), 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Pre-defined stat cards for common use cases
StatsCard.ShipCount = ({ count, trend, trendValue, loading }) => (
  <StatsCard
    title="Total Ships"
    value={count}
    subtitle="Registered vessels"
    icon={FiTrendingUp}
    color="blue"
    trend={trend}
    trendValue={trendValue}
    loading={loading}
  />
);

StatsCard.ActiveProjects = ({ count, trend, trendValue, loading }) => (
  <StatsCard
    title="Active Projects"
    value={count}
    subtitle="Current repair works"
    icon={FiTrendingUp}
    color="green"
    trend={trend}
    trendValue={trendValue}
    loading={loading}
  />
);

StatsCard.CompletedProjects = ({ count, trend, trendValue, loading }) => (
  <StatsCard
    title="Completed"
    value={count}
    subtitle="Finished this month"
    icon={FiTrendingUp}
    color="purple"
    trend={trend}
    trendValue={trendValue}
    loading={loading}
  />
);

StatsCard.DelayedProjects = ({ count, trend, trendValue, loading }) => (
  <StatsCard
    title="Delayed"
    value={count}
    subtitle="Behind schedule"
    icon={FiTrendingDown}
    color="red"
    trend={trend}
    trendValue={trendValue}
    loading={loading}
  />
);

StatsCard.TotalBudget = ({ amount, trend, trendValue, loading }) => (
  <StatsCard
    title="Total Budget"
    value={amount}
    subtitle="Current projects"
    icon={FiTrendingUp}
    color="indigo"
    trend={trend}
    trendValue={trendValue}
    loading={loading}
  />
);

StatsCard.ActiveTenders = ({ count, trend, trendValue, loading }) => (
  <StatsCard
    title="Active Tenders"
    value={count}
    subtitle="Open for bidding"
    icon={FiTrendingUp}
    color="yellow"
    trend={trend}
    trendValue={trendValue}
    loading={loading}
  />
);

export default StatsCard;