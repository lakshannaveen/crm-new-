import React from 'react';
import { FiEdit } from 'react-icons/fi';

const FeedbackReview = ({ formData, onEdit, onSubmit }) => {
  const calculateOverallScore = () => {
    const ratings = Object.values(formData.ratings).filter(r => r > 0);
    return ratings.length > 0 
      ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
      : 0;
  };

  const getScoreCategory = (score) => {
    if (score <= 25) return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
    if (score <= 50) return { label: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score <= 75) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    return { label: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-100' };
  };

  const overallScore = calculateOverallScore();
  const overallCategory = getScoreCategory(overallScore);

  return (
    <div className="card">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review Your Feedback
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please review all information before submitting your feedback
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Feedback Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Reference: <span className="font-medium">{formData.feedbackRef}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Vessel: <span className="font-medium">{formData.vesselName}</span>
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {overallScore}
            </div>
            <span className={`px-4 py-1 rounded-full font-medium ${overallCategory.bg} ${overallCategory.color}`}>
              {overallCategory.label} Overall
            </span>
          </div>
        </div>
      </div>

      {/* Ratings Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Ratings Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(formData.ratings)
            .filter(([_, score]) => score > 0)
            .map(([category, score]) => {
              const categoryObj = getScoreCategory(score);
              return (
                <div key={category} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${categoryObj.bg} ${categoryObj.color}`}>
                      {score}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        score <= 25 ? 'bg-red-500' :
                        score <= 50 ? 'bg-yellow-500' :
                        score <= 75 ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Comments Preview */}
      {formData.observations && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Your Comments
          </h3>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">{formData.observations}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onEdit}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <FiEdit className="mr-2" />
          Edit Feedback
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Print Preview
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 btn-primary"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackReview;