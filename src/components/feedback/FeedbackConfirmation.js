import React from 'react';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';

const FeedbackConfirmation = ({ formData }) => {
  const submittedOn = formData?.submittedAt
    ? new Date(formData.submittedAt)
    : new Date();

  const feedbackItems = formData?.FeedbackList || formData?.evaluationRows || [];

  const handleDownload = () => {
    const win = window.open('', '_blank');
    if (!win) return;

    const html = `
      <html>
        <head>
          <title>Feedback - ${formData?.feedbackRef || ''}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #111827 }
            h1 { font-size: 20px; }
            .meta { margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left }
            th { background: #f3f4f6 }
          </style>
        </head>
        <body>
          <h1>Feedback Submission</h1>
          <div class="meta">
            <div><strong>Reference:</strong> ${formData?.feedbackRef || ''}</div>
            <div><strong>Vessel:</strong> ${formData?.vesselName || ''}</div>
            <div><strong>Submitted On:</strong> ${submittedOn.toLocaleString()}</div>
          </div>
          <div>
            <strong>Remarks:</strong> ${formData?.remarks || ''}<br/>
            <strong>Action Taken:</strong> ${formData?.actionTaken || ''}
          </div>
          <h2 style="margin-top:18px">Feedback Items</h2>
          <table>
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Code</th>
                <th>Answer</th>
                <th>Remarks</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              ${feedbackItems
                .map((it) => {
                  const criteria = it.P_CRITERIA_CODE || it.criteriaCode || '';
                  const code = it.P_CODE || it.unitCode || '';
                  const answer = it.P_ANSWER_TYPE || (it.yesNo ? (it.yesNo === true ? 'Y' : it.yesNo) : '');
                  const remarks = it.P_REMARKS || it.remarks || '';
                  const action = it.P_ACTION_TAKEN || it.actionTaken || '';
                  return `<tr><td>${criteria}</td><td>${code}</td><td>${answer}</td><td>${remarks}</td><td>${action}</td></tr>`;
                })
                .join('')}
            </tbody>
          </table>
          <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 250); };</script>
        </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();
    win.focus();
    // window.print will be triggered by the new window onload script
  };

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
            <span className="font-medium text-gray-900 dark:text-white">{submittedOn.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button onClick={handleDownload} className="px-6 py-3 btn-primary flex items-center justify-center">
          <FiDownload className="mr-2" />
          Download PDF Copy
        </button>

        <button
          onClick={() => (window.location.href = '/dashboard')}
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