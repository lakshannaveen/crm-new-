import React, { useState, useEffect } from "react";
import { FiStar, FiCalendar, FiSearch } from "react-icons/fi";

const FeedbackHistory = ({
  feedbacks = [],
  onDelete,
  onViewDetails,
  isLoading = false,
}) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortedFeedbacks, setSortedFeedbacks] = useState([]);
  // Show all feedbacks by default (removed recent-3 limitation)

  // Sort and filter feedbacks
  useEffect(() => {
    let result = [...feedbacks];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (fb) =>
          fb.vesselName.toLowerCase().includes(term) ||
          fb.feedbackRef.toLowerCase().includes(term) ||
          fb.submittedBy.toLowerCase().includes(term) ||
          fb.observations?.toLowerCase().includes(term)
      );
    }

    // Apply rating filter
    if (filter === "high") {
      result = result.filter((fb) => fb.overallScore >= 75);
    } else if (filter === "medium") {
      result = result.filter(
        (fb) => fb.overallScore >= 50 && fb.overallScore < 75
      );
    } else if (filter === "low") {
      result = result.filter((fb) => fb.overallScore < 50);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      } else if (sortBy === "score") {
        return b.overallScore - a.overallScore;
      } else if (sortBy === "name") {
        return a.vesselName.localeCompare(b.vesselName);
      }
      return 0;
    });

    setSortedFeedbacks(result);
  }, [feedbacks, filter, searchTerm, sortBy]);

  const getScoreColor = (score) => {
    if (score >= 75)
      return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
    if (score >= 50)
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
    return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300";
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Good";
    if (score >= 25) return "Average";
    return "Poor";
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "";
    }
  };

  const getFieldValue = (feedback, ...names) => {
    for (const name of names) {
      const val = feedback?.[name] ?? feedback?.raw?.[name];
      if (val !== undefined && val !== null && String(val).trim() !== "")
        return String(val);
    }
    return "NA";
  };

  const formatYesNo = (feedback, ...names) => {
    const raw = getFieldValue(feedback, ...names);
    if (raw === "NA") return "NA";
    const lowered = String(raw).toLowerCase();
    if (["true", "yes", "y", "1"].includes(lowered)) return "Yes";
    if (["false", "no", "n", "0"].includes(lowered)) return "No";
    return raw;
  };

  const handleDownload = (feedback) => {
    // Build printable HTML of the FEEDBACK_* fields and trigger print (user can save as PDF)
    const allRows = [
      ["JCAT", getFieldValue(feedback, "FEEDBACK_JCAT")],
      ["JMAIN", getFieldValue(feedback, "FEEDBACK_JMAIN", "P_JMAIN")],
      ["Vessel Name", getFieldValue(feedback, "FEEDBACK_VESSEL_NAME")],
      ["Criteria Code", getFieldValue(feedback, "FEEDBACK_CRITERIA_CODE")],
      [
        "Criteria Description",
        getFieldValue(
          feedback,
          "FEEDBACK_CRITERIA_DESC",
          "FEEDBACK_CRITERIA_DESCRIPTION",
          "FEEDBACK_CRITERIA_DESCRPTION"
        ),
      ],
      ["Code", getFieldValue(feedback, "FEEDBACK_CODE", "P_CODE")],
      ["Code Description", getFieldValue(feedback, "FEEDBACK_CODE_DESC")],
      ["Evaluation", getFieldValue(feedback, "FEEDBACK_EVAL")],
      ["Answer", getFieldValue(feedback, "FEEDBACK_ANSWER", "P_ANSWER_TYPE")],
      ["Remarks", getFieldValue(feedback, "FEEDBACK_REMARKS", "P_REMARKS")],
      ["Action Taken", getFieldValue(feedback, "FEEDBACK_ACTION_TAKEN")],
      ["Completion Date", getFieldValue(feedback, "FEEDBACK_COMPLETION_DATE")],
    ];

    // Filter out empty fields (NA or empty values)
    const rows = allRows.filter(([label, value]) => value !== "NA" && value.trim() !== "");

    const html =
      `<!doctype html><html><head><meta charset="utf-8"><title>Feedback ${
        feedback.feedbackRef || ""
      }</title><style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#111}h1{font-size:18px}table{width:100%;border-collapse:collapse;margin-top:10px}td,th{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f4f4f4}</style></head><body>` +
      `<h1>Feedback ${feedback.feedbackRef || ""}</h1>` +
      `<table><tbody>` +
      rows.map((r) => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("") +
      `</tbody></table>` +
      `</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    // Give the window a moment to render then call print
    setTimeout(() => {
      try {
        w.print();
      } catch (e) {
        // ignore
      }
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="card text-center py-12">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Loading feedbacks...
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Fetching latest feedbacks — please wait.
        </p>
      </div>
    );
  }

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
          <div className="relative w-full ">
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
          {/* <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent md:ml-auto"
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Vessel</option>
          </select>
          
          {/* Filter */}
          {/* <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Ratings</option>
            <option value="high">Excellent (75+)</option>
            <option value="medium">Good (50-74)</option>
            <option value="low">Poor/Average (0-49)</option>
          </select> */}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {sortedFeedbacks.map((feedback, index) => {
          const vesselName =
            getFieldValue(feedback, "FEEDBACK_VESSEL_NAME", "vesselName") !== "NA"
              ? getFieldValue(feedback, "FEEDBACK_VESSEL_NAME", "vesselName")
              : null;
          const jcatVal = getFieldValue(feedback, "FEEDBACK_JCAT");
          const jmainVal = getFieldValue(feedback, "FEEDBACK_JMAIN", "P_JMAIN");
          const criteriaCodeVal = getFieldValue(feedback, "FEEDBACK_CRITERIA_CODE");
          const criteriaDescVal = getFieldValue(
            feedback,
            "FEEDBACK_CRITERIA_DESC",
            "FEEDBACK_CRITERIA_DESCRIPTION",
            "FEEDBACK_CRITERIA_DESCRPTION",
            "FEEDBACK_DESC"
          );
          const codeVal = getFieldValue(feedback, "FEEDBACK_CODE", "P_CODE");
          const codeDescVal = getFieldValue(feedback, "FEEDBACK_CODE_DESC");
          const evalVal = getFieldValue(feedback, "FEEDBACK_EVAL");
          const answerVal = getFieldValue(
            feedback,
            "FEEDBACK_ANSWER",
            "P_ANSWER_TYPE"
          );
          const completionVal = getFieldValue(
            feedback,
            "FEEDBACK_COMPLETION_DATE"
          );
          const observationsVal =
            feedback.observations &&
            String(feedback.observations).trim() !== "" &&
            String(feedback.observations) !== "NA"
              ? feedback.observations
              : getFieldValue(feedback, "FEEDBACK_REMARKS", "P_REMARKS") || null;
          const actionTakenVal = getFieldValue(feedback, "FEEDBACK_ACTION_TAKEN");
          const submittedByVal = getFieldValue(
            feedback,
            "submittedBy",
            "submitted_by"
          );
          const vesselIMOVal = getFieldValue(
            feedback,
            "vesselIMO",
            "vessel_imo"
          );

          return (
            <div
              key={feedback.id || index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-white dark:bg-gray-800"
            >
              <div>
                {/* Main compact layout showing requested fields only */}
                {vesselName && (
                  <>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Vessel
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {vesselName}
                    </h3>
                  </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Date</div>
                    <div className="font-medium">{formatDate(feedback.submittedAt)}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Job Category</div>
                    <div className="font-medium">{jcatVal}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Project No</div>
                    <div className="font-medium">{jmainVal}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Criteria</div>
                    <div className="font-medium">{criteriaCodeVal}</div>
                  </div>

                  <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Criteria Desc</div>
                    <div className="font-medium text-sm">{criteriaDescVal}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Code</div>
                    <div className="font-medium">{codeVal}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Code Desc</div>
                    <div className="font-medium text-sm">{codeDescVal}</div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Answer</div>
                    <div className="font-medium">{answerVal}</div>
                  </div>

                  <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Remarks</div>
                    <div className="font-medium">{observationsVal || "NA"}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* All feedbacks shown — removed "recent 3" / load-more UI */}

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
