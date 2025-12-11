import React, { useState, useEffect } from 'react';
import { FiStar, FiCalendar, FiEye, FiDownload, FiTrash2, FiFilter, FiSearch } from 'react-icons/fi';

const FeedbackHistory = ({ feedbacks = [], onDelete, onViewDetails }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortedFeedbacks, setSortedFeedbacks] = useState([]);

  // Sort and filter feedbacks
  useEffect(() => {
    let result = [...feedbacks];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(fb => 
        fb.vesselName.toLowerCase().includes(term) ||
        fb.feedbackRef.toLowerCase().includes(term) ||
        fb.submittedBy.toLowerCase().includes(term) ||
        fb.observations?.toLowerCase().includes(term)
      );
    }
    
    // Apply rating filter
    if (filter === 'high') {
      result = result.filter(fb => fb.overallScore >= 75);
    } else if (filter === 'medium') {
      result = result.filter(fb => fb.overallScore >= 50 && fb.overallScore < 75);
    } else if (filter === 'low') {
      result = result.filter(fb => fb.overallScore < 50);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      } else if (sortBy === 'score') {
        return b.overallScore - a.overallScore;
      } else if (sortBy === 'name') {
        return a.vesselName.localeCompare(b.vesselName);
      }
      return 0;
    });
    
    setSortedFeedbacks(result);
  }, [feedbacks, filter, searchTerm, sortBy]);

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 25) return 'Average';
    return 'Poor';
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '';
    }
  };

  const handleDownload = (feedback) => {
    const dataStr = JSON.stringify(feedback, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileName = `feedback_${feedback.feedbackRef}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  if (feedbacks.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <FiCalendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Feedback History
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Submit your first feedback to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Feedback History
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {sortedFeedbacks.length} feedbacks found
            </p>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search feedbacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Vessel</option>
          </select>
          
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Ratings</option>
            <option value="high">Excellent (75+)</option>
            <option value="medium">Good (50-74)</option>
            <option value="low">Poor/Average (0-49)</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {sortedFeedbacks.map((feedback, index) => (
          <div
            key={feedback.id || index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-white dark:bg-gray-800"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* Left Section */}
              <div className="mb-4 md:mb-0 md:flex-1">
                <div className="flex items-start">
                  {/* Score Circle */}
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center mr-4 ${
                    feedback.overallScore >= 75 ? 'bg-green-100 dark:bg-green-900' :
                    feedback.overallScore >= 50 ? 'bg-yellow-100 dark:bg-yellow-900' :
                    'bg-red-100 dark:bg-red-900'
                  }`}>
                    <span className={`text-lg font-bold ${
                      feedback.overallScore >= 75 ? 'text-green-600 dark:text-green-300' :
                      feedback.overallScore >= 50 ? 'text-yellow-600 dark:text-yellow-300' :
                      'text-red-600 dark:text-red-300'
                    }`}>
                      {feedback.overallScore}
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {feedback.vesselName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <FiStar className="mr-1" />
                            {getScoreLabel(feedback.overallScore)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <FiCalendar className="mr-1" />
                            {formatDate(feedback.submittedAt)}
                          </span>
                          <span>•</span>
                          <span>Ref: {feedback.feedbackRef}</span>
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="mt-2 md:mt-0">
                        <div className="flex space-x-3">
                          <div className="text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Value</div>
                            <div className={`text-sm font-medium ${feedback.valueForMoney ? 'text-green-600' : 'text-red-600'}`}>
                              {feedback.valueForMoney ? 'Yes' : 'No'}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Recommend</div>
                            <div className={`text-sm font-medium ${feedback.recommend ? 'text-green-600' : 'text-red-600'}`}>
                              {feedback.recommend ? 'Yes' : 'No'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Observations Preview */}
                    {feedback.observations && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {feedback.observations}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onViewDetails && onViewDetails(feedback)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  title="View Details"
                >
                  <FiEye className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => handleDownload(feedback)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Download JSON"
                >
                  <FiDownload className="w-5 h-5" />
                </button>
                
                {onDelete && (
                  <button
                    onClick={() => onDelete(feedback)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete Feedback"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories Summary */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Submitted By</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {feedback.submittedBy || 'Anonymous'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Submitted Time</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatTime(feedback.submittedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Categories Rated</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {Object.values(feedback.ratings || {}).filter(r => r > 0).length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vessel IMO</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {feedback.vesselIMO || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedFeedbacks.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FiSearch className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No feedbacks found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try changing your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackHistory;