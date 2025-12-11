import React from 'react';
import { FiX, FiStar, FiCalendar, FiDownload, FiCheck, FiXCircle, FiUser } from 'react-icons/fi';

const FeedbackDetailModal = ({ feedback, isOpen, onClose }) => {
  if (!isOpen || !feedback) return null;

  const getScoreColor = (score) => {
    if (score >= 75) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(feedback, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileName = `feedback_details_${feedback.feedbackRef}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose}></div>

        {/* Modal container */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                <FiStar className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Feedback Details
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reference: {feedback.feedbackRef}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="Download JSON"
              >
                <FiDownload className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Overall Summary */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {feedback.vesselName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feedback.vesselIMO} • {formatDate(feedback.submittedAt)}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {feedback.overallScore}
                    </div>
                    <span className={`px-4 py-1 rounded-full font-medium ${getScoreColor(feedback.overallScore)}`}>
                      {getScoreLabel(feedback.overallScore)} Overall
                    </span>
                  </div>
                </div>
              </div>

              {/* Submitted By */}
              <div className="flex items-center mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FiUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Submitted by</p>
                  <p className="font-medium text-gray-900 dark:text-white">{feedback.submittedBy || 'Anonymous'}</p>
                </div>
              </div>
            </div>

            {/* Ratings Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Detailed Ratings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Group ratings by category */}
                {Object.entries(feedback.ratings || {})
                  .filter(([_, score]) => score > 0)
                  .map(([category, score]) => (
                    <div key={category} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getScoreColor(score)}`}>
                          {score}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            score >= 75 ? 'bg-green-500' :
                            score >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Yes/No Questions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Overall Assessment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${
                  feedback.valueForMoney 
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-center mb-2">
                    {feedback.valueForMoney ? (
                      <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    ) : (
                      <FiXCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">
                      Value for Money
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feedback.valueForMoney 
                      ? "Customer agreed that services provided good value for money"
                      : "Customer felt services were not good value for money"}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  feedback.recommend 
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-center mb-2">
                    {feedback.recommend ? (
                      <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    ) : (
                      <FiXCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                    )}
                    <span className="font-medium text-gray-900 dark:text-white">
                      Would Recommend
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feedback.recommend 
                      ? "Customer would recommend Colombo Dockyard to others"
                      : "Customer would not recommend Colombo Dockyard"}
                  </p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-6">
              {feedback.observations && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Observations & Recommendations
                  </h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {feedback.observations}
                    </p>
                  </div>
                </div>
              )}
              
              {feedback.poorAverageDetails && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Areas Needing Improvement
                  </h4>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {feedback.poorAverageDetails}
                    </p>
                  </div>
                </div>
              )}
              
              {feedback.shipManagerComments && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Ship Manager Comments
                  </h4>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {feedback.shipManagerComments}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Timestamps */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block font-medium text-gray-900 dark:text-white mb-1">
                    Submitted By
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {feedback.submittedBy || 'Anonymous'}
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-gray-900 dark:text-white mb-1">
                    Submitted On
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatDate(feedback.submittedAt)}
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-gray-900 dark:text-white mb-1">
                    Feedback Reference
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {feedback.feedbackRef}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailModal;