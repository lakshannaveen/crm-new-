import React from 'react';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';

// Helper to map single-letter or numeric answers to full-text labels
const mapAnswerText = (raw) => {
  if (raw === undefined || raw === null) return "";
  const s = String(raw).trim();
  if (!s) return "";
  const up = s.toUpperCase();
  if (up === "P") return "Poor";
  if (up === "A") return "Average";
  if (up === "G") return "Good";
  if (up === "E") return "Excellent";
  if (up === "O") return "Not Relevant";
  if (up === "Y") return "Yes";
  if (up === "N") return "No";
  if (up === "Z") return "Hidden";
  if (up === "Z") return "HIDE";
  const num = Number(s);
  if (!isNaN(num)) {
    if (num >= 76) return "Excellent";
    if (num >= 51) return "Good";
    if (num >= 26) return "Average";
    return "Poor";
  }
  if (up === "POOR") return "Poor";
  if (up === "AVERAGE") return "Average";
  if (up === "GOOD") return "Good";
  if (up === "EXCELLENT") return "Excellent";
  if (up === "NOT RELEVANT" || up === "NOTRELEVANT" || up === "NOT_RELEVENT") return "Not Relevant";
  if (up === "YES") return "Yes";
  if (up === "NO") return "No";
  if (up === "HIDE" || up === "HIDDEN") return "Hidden";
  return s;
};

const FeedbackConfirmation = ({ formData }) => {
  const submittedOn = formData?.submittedAt
    ? new Date(formData.submittedAt)
    : new Date();

  const referenceNumber =
    formData?.feedbackRef ||
    formData?.referenceNo ||
    formData?.FEEDBACK_CODE ||
    "";

  const vesselName =
    formData?.vesselName ||
    formData?.projectName ||
    formData?.FEEDBACK_VESSEL_NAME ||
    "";

  const feedbackItems = formData?.FeedbackList || formData?.evaluationRows || [];

  const handleDownload = () => {
    const win = window.open('', '_blank');
    if (!win) return;

    const html = `
      <html>
        <head>
          <title>Feedback${referenceNumber ? ' - ' + referenceNumber : ''}</title>
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
            ${
              referenceNumber
                ? `<div><strong>Reference:</strong> ${referenceNumber}</div>`
                : ''
            }
            ${
              vesselName
                ? `<div><strong>Vessel:</strong> ${vesselName}</div>`
                : ''
            }
            <div><strong>Submitted On:</strong> ${submittedOn.toLocaleString()}</div>
          </div>
         
          <h2 style="margin-top:18px">Feedback Items</h2>
          <table>
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Criteria Description</th>
                <th>Code</th>
                <th>Code/Unit Description</th>
                <th>Answer</th>
                <th>Remarks</th>
                <th>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              ${feedbackItems
                .map((it) => {
                  const criteria = it.P_CRITERIA_CODE || it.criteriaCode || it.FEEDBACK_CRITERIA_CODE || '';
                  const criteriaDesc = it.P_CRITERIA_DESC || it.criteriaDescription || it.FEEDBACK_CRITERIA_DESC || '';
                  const code = it.P_CODE || it.unitCode || it.P_CODE || it.P_UNIT_CODE || it.P_CODE || it.P_CODE || it.P_CODE || '';
                  const codeDesc = it.P_CODE_DESC || it.unitDescription || it.P_UNIT_DESC || it.FEEDBACK_UNIT_DESCRIPTION || it.FEEDBACK_CODE_DESC || '';
                  const rawAns = it.P_ANSWER_TYPE || (it.yesNo ? (it.yesNo === true ? 'Y' : it.yesNo) : '');
                  const answer = mapAnswerText(rawAns);
                  const remarks = it.P_REMARKS || it.remarks || '';
                  const action = it.P_ACTION_TAKEN || it.actionTaken || '';
                  return `<tr><td>${criteria}</td><td>${criteriaDesc}</td><td>${code}</td><td>${codeDesc}</td><td>${answer}</td><td>${remarks}</td><td>${action}</td></tr>`;
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
          {referenceNumber && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Reference Number:</span>
              <span className="font-medium text-gray-900 dark:text-white">{referenceNumber}</span>
            </div>
          )}
          {vesselName && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Vessel:</span>
              <span className="font-medium text-gray-900 dark:text-white">{vesselName}</span>
            </div>
          )}
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