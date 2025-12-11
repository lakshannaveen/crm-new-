import React from 'react';
import { FiCheckCircle, FiDownload, FiShare2 } from 'react-icons/fi';

const FeedbackConfirmation = ({ formData }) => {
  return (
    <div className="card text-center">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
        <FiCheckCircle className="w-10 h-10 text-green-600 dark:text-green-300" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Feedback Submitted Successfully!
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
        Thank you for taking the time to provide valuable feedback. Your responses have been recorded and will help us improve our services.
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 mb-8 max-w-lg mx-auto">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Reference Number:</span>
            <span className="font-medium text-gray-900 dark:text-white">{formData.feedbackRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Vessel:</span>
            <span className="font-medium text-gray-900 dark:text-white">{formData.vesselName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Submitted On:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button className="px-6 py-3 btn-primary flex items-center justify-center">
          <FiDownload className="mr-2" />
          Download PDF Copy
        </button>
        
        <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center">
          <FiShare2 className="mr-2" />
          Share Feedback
        </button>
        
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-6 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          Return to Dashboard
        </button>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          For any queries regarding your feedback, please contact our Customer Service department.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Email: feedback@colombodockyard.lk | Phone: +94 11 123 4567
        </p>
      </div>
    </div>
  );
};

export default FeedbackConfirmation;