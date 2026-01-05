import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FiCheck,
  FiAlertCircle,
  FiStar,
  FiMessageSquare,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
} from "react-icons/fi";
import useMobile from "../../hooks/useMobile";
import { addFeedback } from "../../services/feedbackService";
import {
  getFeedbackDates,
  getJmain,
  getUnitsDescriptions,
} from "../../actions/feedbackActions";

const FeedbackForm = ({ vessel, onSubmit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    dates = { startingDate: "", endingDate: "" },
    loading: datesLoading = false,
    jmainList = [],
    jmainLoading = false,
    unitsDescriptions = [],
    unitsDescriptionsLoading = false,
    error: datesError = null,
  } = useSelector((state) => state.feedback || {});
  const isMobile = useMobile();

  const questionSectionRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleRowsCount, setVisibleRowsCount] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [evaluationRows, setEvaluationRows] = useState(
    Array(11)
      .fill(null)
      .map(() => ({
        criteriaCode: "",
        unitCode: "",
        description: "",
        evaluation: "",
        yesNo: "",
      }))
  );
  const [formData, setFormData] = useState({
    // Project Information (replacing vessel information)
    jobCategory: "",
    projectHandleLocation: "",
    startingDate: "",
    endingDate: "",
    jobStatus: "",
    projectNumber: "",
    projectName: "",
    customerFeedbackStatus: "",

    // Ratings (0-100 scale)
    ratings: {
      responsiveness: 0,
      publicRelations: 0,
      deckPlanning: 0,
      deckPipesQuality: 0,
      deckPipesTimely: 0,
      deckTankQuality: 0,
      deckTankTimely: 0,
      deckMachineryQuality: 0,
      deckMachineryTimely: 0,
      deckSteelQuality: 0,
      deckSteelTimely: 0,
      enginePlanning: 0,
      enginePipesQuality: 0,
      enginePipesTimely: 0,
      rudderQuality: 0,
      rudderTimely: 0,
      mainEngineQuality: 0,
      mainEngineTimely: 0,
      otherEngineQuality: 0,
      otherEngineTimely: 0,
      steelPlanning: 0,
      steelWorkQuality: 0,
      steelWorkTimely: 0,
      electricalPlanning: 0,
      electricalQuality: 0,
      electricalTimely: 0,
      electronicQuality: 0,
      electronicTimely: 0,
      automationQuality: 0,
      automationTimely: 0,
      surfacePlanning: 0,
      blastingQuality: 0,
      blastingTimely: 0,
      paintingQuality: 0,
      paintingTimely: 0,
      tankCleaningQuality: 0,
      tankCleaningTimely: 0,
      stagingQuality: 0,
      docking: 0,
      undocking: 0,
      mooring: 0,
      unmooring: 0,
      outfittingPlanning: 0,
      carpentryQuality: 0,
      carpentryTimely: 0,
      claddingQuality: 0,
      claddingTimely: 0,
      aluminumQuality: 0,
      aluminumTimely: 0,
      generalServices: 0,
      materialsQuality: 0,
      materialsDelivery: 0,
      overallQuality: 0,
      safetyEnvironment: 0,
      competitorPerformance: 0,
    },

    // Yes/No Questions
    valueForMoney: null,
    recommend: null,

    // Additional Comments
    poorAverageDetails: "",
    observations: "",
    shipManagerComments: "",

    // Durations (days)
    afloatDuration: 0,
    indockDuration: 0,

    // Feedback Reference
    feedbackRef: `FB-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`,

    // Top-level remarks and action taken
    remarks: "",
    actionTaken: "",
    // Removed vessel fields (vesselName, vesselIMO)
  });

  // Dropdown options
  const jobCategoryOptions = [
    { value: "", label: "Select Category" },
    { value: "SR", label: "SR" },
    { value: "NC", label: "NC" },
    { value: "PMC", label: "PMC" },
  ];

  const jobStatusOptions = [
    { value: "", label: "Select Status" },
    { value: "A", label: "OPENED" },
    { value: "I", label: "CLOSED" },
    { value: "P", label: "PENDING" },
    { value: "C", label: "CONFIRMED" },
    { value: "D", label: "CANCELLED" },
  ];

  const customerFeedbackStatusOptions = [
    { value: "", label: "Select Feedback Status" },
    { value: "1", label: "Not Received" },
    { value: "2", label: "Received" },
    { value: "3", label: "SED" },
    { value: "4", label: "Reluctant to Issue" },
  ];

  const steps = [
    { id: 0, title: "Project Details", icon: <FiCalendar /> },
    { id: 1, title: "Evaluation Details", icon: <FiStar /> },
    { id: 2, title: "Review", icon: <FiCheck /> },
    { id: 3, title: "Complete", icon: <FiCheck /> },
  ];

  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.min(Math.max(currentStep, 0), steps.length - 1);
  const currentStepData = steps[safeCurrentStep] || steps[0];

  // Fetch units descriptions on component mount
  useEffect(() => {
    dispatch(getUnitsDescriptions());
  }, [dispatch]);

  // Fetch JMain (project numbers) when job category is selected
  useEffect(() => {
    if (formData.jobCategory) {
      dispatch(getJmain(formData.jobCategory));
      // Reset project number when job category changes
      setFormData((prev) => ({
        ...prev,
        projectNumber: "",
      }));
    }
  }, [formData.jobCategory, dispatch]);

  // Fetch dates when job category and project number are selected
  useEffect(() => {
    if (formData.jobCategory && formData.projectNumber) {
      dispatch(getFeedbackDates(formData.jobCategory, formData.projectNumber));
    }
  }, [formData.jobCategory, formData.projectNumber, dispatch]);

  // Update form data when dates are loaded from Redux
  useEffect(() => {
    if (dates.startingDate || dates.endingDate) {
      setFormData((prev) => ({
        ...prev,
        startingDate: dates.startingDate,
        endingDate: dates.endingDate,
      }));
    }
  }, [dates]);

  const handleRatingChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: parseInt(value),
      },
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleProjectNumberChange = (value) => {
    // Find the selected project from jmainList
    const selectedProject = jmainList.find(
      (project) => project.FEEDBACK_JMAIN === value
    );

    // Update both project number and project name
    setFormData((prev) => ({
      ...prev,
      projectNumber: value,
      projectName: selectedProject?.FEEDBACK_DESC || "",
    }));

    // Clear validation errors for project and dates (dates may auto-fill)
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.projectNumber;
      delete newErrors.projectName;
      delete newErrors.startingDate;
      delete newErrors.endingDate;
      return newErrors;
    });
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleYesNoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === "yes",
    }));
  };

  // Scroll to question section
  const scrollToQuestionSection = () => {
    if (questionSectionRef.current) {
      questionSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle evaluation row changes
  const handleEvaluationRowChange = (index, field, value) => {
    setEvaluationRows((prev) => {
      const newRows = [...prev];

      // For evaluation field, toggle if clicking the same value
      if (field === "evaluation" && newRows[index].evaluation === value) {
        newRows[index] = {
          ...newRows[index],
          [field]: "",
        };
      } else if (field === "yesNo" && newRows[index].yesNo === value) {
        // For yesNo field, toggle if clicking the same value
        newRows[index] = {
          ...newRows[index],
          [field]: "",
        };
      } else {
        newRows[index] = {
          ...newRows[index],
          [field]: value,
        };
      }

      // If criteria or unit code changes, update description
      if (field === "criteriaCode" || field === "unitCode") {
        const criteriaCode =
          field === "criteriaCode" ? value : newRows[index].criteriaCode;
        const unitCode = field === "unitCode" ? value : newRows[index].unitCode;

        // Clear unit code if criteria code changes
        if (field === "criteriaCode") {
          newRows[index].unitCode = "";
          newRows[index].description = "";
        }

        if (criteriaCode && unitCode) {
          const matchingItem = unitsDescriptions.find(
            (item) =>
              item.FEEDBACK_CRITERIA_CODE === criteriaCode &&
              item.FEEDBACK_UNIT_CODE === unitCode
          );

          if (matchingItem) {
            newRows[index].description =
              matchingItem.FEEDBACK_UNIT_DESCRIPTION ||
              matchingItem.FEEDBACK_DESC ||
              matchingItem.DESCRIPTION ||
              "";
          } else {
            newRows[index].description = "";
          }

          // Show next row if both criteria and unit code are selected and we're on the last visible row
          if (index === visibleRowsCount - 1 && visibleRowsCount < 11) {
            setVisibleRowsCount((prev) => prev + 1);
          }

          // Clear evaluation validation error when user fills a row
          if (validationErrors.evaluationRows) {
            setValidationErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.evaluationRows;
              return newErrors;
            });
          }
        } else {
          // Clear description if either dropdown is empty
          if (field === "unitCode" && !unitCode) {
            newRows[index].description = "";
          }
        }
      }

      // Clear specific field validation errors
      if (field === "criteriaCode" && value) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`criteriaCode_${index}`];
          delete newErrors.evaluationRows;
          return newErrors;
        });
      }

      if (field === "unitCode" && value) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`unitCode_${index}`];
          delete newErrors.evaluationRows;
          return newErrors;
        });
      }

      if (field === "evaluation" && value) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`evaluation_${index}`];
          delete newErrors.evaluationRows;
          return newErrors;
        });
      }

      if (field === "yesNo" && value) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`yesNo_${index}`];
          delete newErrors.evaluationRows;
          return newErrors;
        });
      }

      return newRows;
    });
  };

  // Get unique criteria codes
  const getCriteriaCodes = () => {
    const codes = [
      ...new Set(unitsDescriptions.map((item) => item.FEEDBACK_CRITERIA_CODE)),
    ];
    return codes.filter(Boolean).sort((a, b) => {
      // Convert to numbers for proper numeric sorting
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      // Fallback to string comparison
      return a.localeCompare(b);
    });
  };

  // Get selected combinations excluding current row
  const getSelectedCombinations = (excludeIndex) => {
    return evaluationRows
      .map((row, index) => {
        if (index === excludeIndex) return null;
        if (row.criteriaCode && row.unitCode) {
          return `${row.criteriaCode}-${row.unitCode}`;
        }
        return null;
      })
      .filter(Boolean);
  };

  // Check if a combination is already selected
  const isCombinationSelected = (criteriaCode, unitCode, currentIndex) => {
    const combination = `${criteriaCode}-${unitCode}`;
    const selectedCombinations = getSelectedCombinations(currentIndex);
    return selectedCombinations.includes(combination);
  };

  // Get unit codes for a specific criteria
  const getUnitCodesForCriteria = (criteriaCode, currentIndex) => {
    if (!criteriaCode) return [];
    const codes = unitsDescriptions
      .filter((item) => item.FEEDBACK_CRITERIA_CODE === criteriaCode)
      .map((item) => item.FEEDBACK_UNIT_CODE);
    const uniqueCodes = [...new Set(codes)].filter(Boolean).sort((a, b) => {
      // Convert to numbers for proper numeric sorting
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      // Fallback to string comparison
      return a.localeCompare(b);
    });

    // Return objects with code and disabled status
    return uniqueCodes.map((code) => ({
      code,
      disabled: isCombinationSelected(criteriaCode, code, currentIndex),
    }));
  };

  // Validation for each step
  const validateStep = (step) => {
    const errors = {};

    switch (step) {
      case 0: // Project Details
        if (!formData.jobCategory)
          errors.jobCategory = "Job Category is required";
        if (!formData.projectNumber)
          errors.projectNumber = "Project Number is required";
        if (!formData.projectName)
          errors.projectName = "Project Name is required";
        if (!formData.startingDate)
          errors.startingDate = "Starting Date is required";
        if (!formData.endingDate) errors.endingDate = "Ending Date is required";
        if (!formData.jobStatus) errors.jobStatus = "Job Status is required";
        if (!formData.customerFeedbackStatus)
          errors.customerFeedbackStatus =
            "Customer Feedback Status is required";
        if (!formData.projectHandleLocation)
          errors.projectHandleLocation = "Project Handle Location is required";
        break;
      case 1: // Evaluation Details
        // Check each row that has been started
        let hasAtLeastOneCompleteRow = false;
        evaluationRows.forEach((row, index) => {
          const hasCriteria = !!row.criteriaCode;
          const hasUnit = !!row.unitCode;
          const hasAnyField = hasCriteria || hasUnit || row.evaluation;

          // If any field is filled, all required fields must be filled
          if (hasAnyField) {
            if (!row.criteriaCode) {
              errors[`criteriaCode_${index}`] = "Criteria code is required";
            }
            if (!row.unitCode) {
              errors[`unitCode_${index}`] = "Unit code is required";
            }
            if (!row.evaluation) {
              errors[`evaluation_${index}`] = "Evaluation rating is required";
            }

            // Check if this row is complete
            if (row.criteriaCode && row.unitCode && row.evaluation) {
              hasAtLeastOneCompleteRow = true;
            }
          }
        });

        // At least one row must be completely filled
        if (!hasAtLeastOneCompleteRow) {
          errors.evaluationRows =
            "At least one evaluation row must be completed";
        }
        break;
      case 2: // Review
        // No validation needed for review
        break;
      default:
        break;
    }

    return errors;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Validate current step before proceeding
      const errors = validateStep(currentStep);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);

        // Scroll to first error field after a short delay to allow error to render
        setTimeout(() => {
          const firstErrorKey = Object.keys(errors)[0];
          let errorElement = null;

          // Find the first error element in the DOM
          if (firstErrorKey === "evaluationRows") {
            // Scroll to evaluation section
            errorElement = document.querySelector(
              '[class*="bg-red-50"][class*="border-red-500"]'
            );
          } else if (
            firstErrorKey.startsWith("criteriaCode_") ||
            firstErrorKey.startsWith("unitCode_") ||
            firstErrorKey.startsWith("evaluation_") ||
            firstErrorKey.startsWith("yesNo_")
          ) {
            // Scroll to specific evaluation row error
            errorElement = document.querySelector('[class*="text-red-600"]');
          } else {
            // Scroll to first field with error class or by finding input with error
            const fieldSelectors = [
              `[name="${firstErrorKey}"]`,
              `input[class*="border-red-500"]`,
              `select[class*="border-red-500"]`,
              `.text-red-600`,
            ];

            for (const selector of fieldSelectors) {
              errorElement = document.querySelector(selector);
              if (errorElement) break;
            }
          }

          if (errorElement) {
            errorElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          } else {
            // Fallback to scrolling to question section
            scrollToQuestionSection();
          }
        }, 100);

        return;
      }

      // Clear validation errors if all is good
      setValidationErrors({});

      setCurrentStep((prev) => {
        const next = Math.min(prev + 1, steps.length - 1);
        setTimeout(scrollToQuestionSection, 100);
        return next;
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => {
        const prevStep = Math.max(prev - 1, 0);
        setTimeout(scrollToQuestionSection, 100);
        return prevStep;
      });
    }
  };

  const calculateOverallScore = () => {
    if (!formData.ratings) return 0;
    const ratings = Object.values(formData.ratings).filter((r) => r > 0);

    // Convert evaluation letter grades to numeric scores
    const evaluationScoreMap = {
      P: 25, // Poor
      A: 50, // Average
      G: 75, // Good
      E: 100, // Excellent
      N: 0, // Not Relevant (excluded)
    };

    // Get evaluation scores from evaluation rows
    const evaluationScores = evaluationRows
      .filter((row) => row.evaluation && row.evaluation !== "N")
      .map((row) => evaluationScoreMap[row.evaluation] || 0)
      .filter((score) => score > 0);

    // Combine all scores
    const allScores = [...ratings, ...evaluationScores];

    return allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0;
  };

  const handleSubmit = async () => {
    // Only send the required JSON structure for feedback
    const feedbackPayload = {
      P_JOB_CATEGORY: formData.jobCategory,
      P_JMAIN: formData.projectNumber,
      P_REMARKS: formData.remarks || "",
      P_ACTION_TAKEN: formData.actionTaken || "",
      FeedbackList: evaluationRows
        .filter((row) => row.criteriaCode && row.unitCode)
        .map((row) => {
          const answer = (() => {
            if (typeof row.yesNo === 'string') {
              return row.yesNo.toUpperCase().startsWith('Y') ? 'Y' : 'N';
            }
            if (typeof row.yesNo === 'boolean') {
              return row.yesNo ? 'Y' : 'N';
            }
            return 'N';
          })();

          return {
            P_CRITERIA_CODE: row.criteriaCode,
            P_CODE: row.unitCode,
            P_ANSWER_TYPE: answer,
            P_REMARKS: row.remarks || formData.remarks || "",
            P_ACTION_TAKEN: row.actionTaken || formData.actionTaken || "",
          };
        }),
    };

    try {
      await addFeedback(feedbackPayload);
      setCurrentStep(9);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
    if (onSubmit) {
      onSubmit(feedbackPayload);
    }
    setCurrentStep(3);
  };

  // Mobile Progress Indicator
  const MobileProgressIndicator = () => (
    <div className="md:hidden mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`p-2 rounded-lg ${
            currentStep === 0 ? "text-gray-400" : "text-blue-600"
          }`}
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {currentStepData?.title || "Step"}
          </div>
        </div>

        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className={`p-2 rounded-lg ${
            currentStep === steps.length - 1 ? "text-gray-400" : "text-blue-600"
          }`}
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );

  // Mobile Step Navigation Buttons
  const MobileStepButtons = () => {
    if (currentStep >= steps.length - 1) return null;

    return (
      <div className="md:hidden mt-6 pb-4">
        <div className="flex justify-between gap-3">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-3 rounded-lg flex-1 ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 dark:bg-gray-700 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <FiChevronLeft className="inline mr-2" />
            Previous
          </button>

          <button
            onClick={nextStep}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg flex-1 hover:bg-blue-700"
          >
            {currentStep === steps.length - 2 ? "Review" : "Next"}
            <FiChevronRight className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Mobile Optimized Rating Card
  const MobileRatingCard = ({
    title,
    description,
    value,
    onChange,
    compact = false,
  }) => {
    const getRatingLabel = (score) => {
      if (score <= 25)
        return {
          text: "Poor",
          color: "text-red-600",
          bg: "bg-red-100 dark:bg-red-900",
        };
      if (score <= 50)
        return {
          text: "Average",
          color: "text-yellow-600",
          bg: "bg-yellow-100 dark:bg-yellow-900",
        };
      if (score <= 75)
        return {
          text: "Good",
          color: "text-green-600",
          bg: "bg-green-100 dark:bg-green-900",
        };
      return {
        text: "Excellent",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900",
      };
    };

    const label = getRatingLabel(value);

    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
          compact ? "p-3" : "p-4"
        }`}
      >
        <div className="mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${label.bg} ${label.color}`}
              >
                {label.text}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-2">
            {[0, 25, 50, 75, 100].map((score) => (
              <button
                key={score}
                onClick={() => onChange(score)}
                className={`py-1.5 text-xs rounded transition-colors ${
                  value === score
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {score === 0
                  ? "P"
                  : score === 25
                  ? "P/A"
                  : score === 50
                  ? "A"
                  : score === 75
                  ? "G"
                  : "E"}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Desktop Rating Card
  const DesktopRatingCard = ({
    title,
    description,
    value,
    onChange,
    compact = false,
  }) => {
    const getRatingLabel = (score) => {
      if (score <= 25)
        return {
          text: "Poor",
          color: "text-red-600",
          bg: "bg-red-100 dark:bg-red-900",
        };
      if (score <= 50)
        return {
          text: "Average",
          color: "text-yellow-600",
          bg: "bg-yellow-100 dark:bg-yellow-900",
        };
      if (score <= 75)
        return {
          text: "Good",
          color: "text-green-600",
          bg: "bg-green-100 dark:bg-green-900",
        };
      return {
        text: "Excellent",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900",
      };
    };

    const label = getRatingLabel(value);

    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
          compact ? "p-4" : "p-6"
        }`}
      >
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${label.bg} ${label.color}`}
            >
              {label.text}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />

            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>0 (Poor)</span>
              <span>25</span>
              <span>50 (Average)</span>
              <span>75</span>
              <span>100 (Excellent)</span>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            {[0, 25, 50, 75, 100].map((score) => (
              <button
                key={score}
                onClick={() => onChange(score)}
                className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
                  value === score
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {score === 0
                  ? "Poor"
                  : score === 25
                  ? "Poor/Avg"
                  : score === 50
                  ? "Average"
                  : score === 75
                  ? "Good"
                  : "Excellent"}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const RatingCard = isMobile ? MobileRatingCard : DesktopRatingCard;

  const YesNoSelection = ({ value, onChange, title, description }) => {
    return (
      <div className="space-y-3">
        <div>
          <h4
            className={`font-medium text-gray-900 dark:text-white ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            {title}
          </h4>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>

        <div className={`flex space-x-4 ${isMobile ? "space-x-2" : ""}`}>
          <button
            onClick={() => onChange("yes")}
            className={`${
              isMobile ? "flex-1 py-2" : "flex-1 py-3"
            } rounded-lg border-2 transition-all ${
              value === true
                ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                : "border-gray-300 dark:border-gray-600 hover:border-green-500"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  isMobile ? "h-5 w-5" : "h-6 w-6"
                } rounded-full border-2 flex items-center justify-center mb-2 ${
                  value === true
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-400"
                }`}
              >
                {value === true && (
                  <FiCheck className={isMobile ? "text-xs" : ""} />
                )}
              </div>
              <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
                YES
              </span>
            </div>
          </button>

          <button
            onClick={() => onChange("no")}
            className={`${
              isMobile ? "flex-1 py-2" : "flex-1 py-3"
            } rounded-lg border-2 transition-all ${
              value === false
                ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                : "border-gray-300 dark:border-gray-600 hover:border-red-500"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  isMobile ? "h-5 w-5" : "h-6 w-6"
                } rounded-full border-2 flex items-center justify-center mb-2 ${
                  value === false
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-gray-400"
                }`}
              >
                {value === false && (
                  <span className={isMobile ? "text-xs" : ""}>✕</span>
                )}
              </div>
              <span className={`font-medium ${isMobile ? "text-sm" : ""}`}>
                NO
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const getStepContent = () => {
    const cardClass = isMobile ? "p-4" : "p-6";
    const titleClass = isMobile ? "text-lg mb-2" : "text-2xl mb-2";
    const descClass = isMobile ? "text-sm" : "text-base";

    switch (safeCurrentStep) {
      case 0:
        return (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}
          >
            <div className="mb-4">
              <h2
                className={`font-bold text-gray-900 dark:text-white ${titleClass}`}
              >
                Project Information
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Please provide project details and management information
              </p>
            </div>

            <div className="space-y-3">
              {/* Job Category and Project Number on the same horizontal line */}
              <div
                className={
                  isMobile
                    ? "flex flex-col gap-2"
                    : "flex flex-row gap-6 items-end"
                }
              >
                <div className={isMobile ? "w-full" : "w-1/2"}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Category
                  </label>
                  <select
                    value={formData.jobCategory}
                    onChange={(e) =>
                      handleSelectChange("jobCategory", e.target.value)
                    }
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.jobCategory ? "border-red-500" : ""
                    }`}
                  >
                    {jobCategoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="min-h-[20px]">
                    {validationErrors.jobCategory && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validationErrors.jobCategory}
                      </p>
                    )}
                  </div>
                </div>
                <div className={isMobile ? "w-full" : "w-1/2"}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Project Number
                  </label>
                  <select
                    value={formData.projectNumber}
                    onChange={(e) => handleProjectNumberChange(e.target.value)}
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.projectNumber ? "border-red-500" : ""
                    }`}
                    disabled={!formData.jobCategory || jmainLoading}
                  >
                    <option value="">
                      {jmainLoading
                        ? "Loading project numbers..."
                        : !formData.jobCategory
                        ? "Select job category first"
                        : jmainList.length === 0
                        ? "No projects found"
                        : "Select project number"}
                    </option>
                    {jmainList &&
                      jmainList.length > 0 &&
                      [...jmainList]
                        .sort((a, b) => {
                          const aVal = parseInt(a.FEEDBACK_JMAIN) || 0;
                          const bVal = parseInt(b.FEEDBACK_JMAIN) || 0;
                          return aVal - bVal;
                        })
                        .map((project, index) => {
                          const jmainValue = project.FEEDBACK_JMAIN;
                          return (
                            <option
                              key={jmainValue || index}
                              value={jmainValue}
                            >
                              {jmainValue}
                            </option>
                          );
                        })}
                  </select>
                  <div className="min-h-[20px]">
                    {validationErrors.projectNumber && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validationErrors.projectNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) =>
                    handleInputChange("projectName", e.target.value)
                  }
                  className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                    validationErrors.projectName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter project name"
                />
                <div className="min-h-[20px]">
                  {validationErrors.projectName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.projectName}
                    </p>
                  )}
                </div>
              </div>

              {/* Dates Section */}
              <div
                className={`grid ${
                  isMobile
                    ? "grid-cols-1 gap-3"
                    : "grid-cols-1 md:grid-cols-2 gap-4"
                }`}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Starting Date{" "}
                    {datesLoading && (
                      <span className="text-xs text-blue-600">
                        (Loading...)
                      </span>
                    )}
                  </label>
                  <input
                    type="date"
                    value={formData.startingDate}
                    onChange={(e) =>
                      handleInputChange("startingDate", e.target.value)
                    }
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.startingDate ? "border-red-500" : ""
                    }`}
                    disabled={datesLoading}
                  />
                  <div className="min-h-[20px]">
                    {validationErrors.startingDate && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validationErrors.startingDate}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ending Date{" "}
                    {datesLoading && (
                      <span className="text-xs text-blue-600">
                        (Loading...)
                      </span>
                    )}
                  </label>
                  <input
                    type="date"
                    value={formData.endingDate}
                    onChange={(e) =>
                      handleInputChange("endingDate", e.target.value)
                    }
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.endingDate ? "border-red-500" : ""
                    }`}
                    disabled={datesLoading}
                  />
                  <div className="min-h-[20px]">
                    {validationErrors.endingDate && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validationErrors.endingDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Show error if dates fetch fails */}
              {datesError && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Note: Could not auto-load dates. Please enter them manually.
                  </p>
                </div>
              )}

              {/* Status Fields */}
              <div
                className={`grid ${
                  isMobile
                    ? "grid-cols-1 gap-3"
                    : "grid-cols-1 md:grid-cols-2 gap-4"
                }`}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Status
                  </label>
                  <select
                    value={formData.jobStatus}
                    onChange={(e) =>
                      handleSelectChange("jobStatus", e.target.value)
                    }
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.jobStatus ? "border-red-500" : ""
                    }`}
                  >
                    {jobStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="min-h-[20px]">
                    {validationErrors.jobStatus && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validationErrors.jobStatus}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Customer Feedback Status
                  </label>
                  <select
                    value={formData.customerFeedbackStatus}
                    onChange={(e) =>
                      handleSelectChange(
                        "customerFeedbackStatus",
                        e.target.value
                      )
                    }
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.customerFeedbackStatus
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    {customerFeedbackStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="min-h-[20px]">
                    {validationErrors.customerFeedbackStatus && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {validationErrors.customerFeedbackStatus}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Handle Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Handle Location
                </label>
                <input
                  type="text"
                  value={formData.projectHandleLocation}
                  onChange={(e) =>
                    handleInputChange("projectHandleLocation", e.target.value)
                  }
                  className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                    validationErrors.projectHandleLocation
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Enter project location"
                />
                <div className="min-h-[20px]">
                  {validationErrors.projectHandleLocation && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.projectHandleLocation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2
                  className={`font-bold text-gray-900 dark:text-white ${titleClass}`}
                >
                  Evaluation Details
                </h2>
                <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                  Provide detailed evaluation for each criteria
                </p>
              </div>
              {unitsDescriptionsLoading && (
                <div className="text-sm text-blue-600 dark:text-blue-400 mt-2 md:mt-0">
                  Loading criteria...
                </div>
              )}
            </div>

            {/* Debug Info */}
            {!unitsDescriptionsLoading && unitsDescriptions.length === 0 && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  No criteria data loaded. Total items:{" "}
                  {unitsDescriptions.length}
                </p>
              </div>
            )}

            {/* Validation Error for Evaluation Rows */}
            {validationErrors.evaluationRows && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {validationErrors.evaluationRows}
                </p>
              </div>
            )}

            {/* Evaluation Table - Responsive for Mobile */}
            <div className="mb-6">
              {isMobile ? (
                <div className="space-y-4">
                  {evaluationRows
                    .slice(0, Math.min(visibleRowsCount, 5))
                    .map((row, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-900"
                      >
                        <div className="mb-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Criteria
                          </label>
                          <select
                            value={row.criteriaCode}
                            onChange={(e) =>
                              handleEvaluationRowChange(
                                index,
                                "criteriaCode",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs"
                            disabled={unitsDescriptionsLoading}
                          >
                            <option value="">PPE_CRITERIA_CODE</option>
                            {getCriteriaCodes().map((code) => (
                              <option key={code} value={code}>
                                {code}
                              </option>
                            ))}
                          </select>
                          {validationErrors[`criteriaCode_${index}`] && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                              {validationErrors[`criteriaCode_${index}`]}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Unit
                          </label>
                          <select
                            value={row.unitCode}
                            onChange={(e) =>
                              handleEvaluationRowChange(
                                index,
                                "unitCode",
                                e.target.value
                              )
                            }
                            className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs"
                            disabled={
                              !row.criteriaCode || unitsDescriptionsLoading
                            }
                          >
                            <option value="">UNIT_CODE</option>
                            {getUnitCodesForCriteria(
                              row.criteriaCode,
                              index
                            ).map((item) => (
                              <option
                                key={item.code}
                                value={item.code}
                                disabled={item.disabled}
                                className={
                                  item.disabled
                                    ? "text-gray-400 dark:text-gray-600"
                                    : ""
                                }
                              >
                                {item.code}{" "}
                                {item.disabled ? "(Already selected)" : ""}
                              </option>
                            ))}
                          </select>
                          {validationErrors[`unitCode_${index}`] && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                              {validationErrors[`unitCode_${index}`]}
                            </p>
                          )}
                        </div>
                        <div className="mb-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={row.description}
                            readOnly
                            placeholder="DESCRIPTION"
                            title={
                              row.description || "No description available"
                            }
                            className="w-full px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs"
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Evaluation
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {["P", "A", "G", "E", "N"].map((val) => (
                              <label
                                key={val}
                                className="flex items-center gap-1"
                              >
                                <input
                                  type="radio"
                                  name={`deck-eval-${index}`}
                                  value={val}
                                  checked={row.evaluation === val}
                                  onClick={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "evaluation",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 cursor-pointer"
                                />
                                <span className="text-xs">{val}</span>
                              </label>
                            ))}
                          </div>
                          {validationErrors[`evaluation_${index}`] && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                              {validationErrors[`evaluation_${index}`]}
                            </p>
                          )}
                        </div>
                        {/*
                        <div className="mb-2">
                          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Yes/No
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name={`deck-yesno-${index}`}
                                value="YES"
                                checked={row.yesNo === "YES"}
                                onChange={(e) =>
                                  handleEvaluationRowChange(
                                    index,
                                    "yesNo",
                                    e.target.value
                                  )
                                }
                                className="w-4 h-4"
                              />
                              <span className="text-xs">YES</span>
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name={`deck-yesno-${index}`}
                                value="NO"
                                checked={row.yesNo === "NO"}
                                onChange={(e) =>
                                  handleEvaluationRowChange(
                                    index,
                                    "yesNo",
                                    e.target.value
                                  )
                                }
                                className="w-4 h-4"
                              />
                              <span className="text-xs">NO</span>
                            </label>
                          </div>
                          {validationErrors[`yesNo_${index}`] && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                              {validationErrors[`yesNo_${index}`]}
                            </p>
                          )}
                        </div>
                        */}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-300 dark:border-gray-600 rounded-lg">
                  <table className="min-w-[700px] md:min-w-full divide-y divide-gray-300 dark:divide-gray-600 text-xs md:text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th
                          colSpan="2"
                          className="px-3 py-2 text-center font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap "
                        >
                          Criteria
                        </th>
                        <th
                          rowSpan="2"
                          className="px-3 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap"
                        >
                          Evaluation Type
                        </th>
                        <th
                          rowSpan="2"
                          className="px-2 py-3 text-center font-semibold text-gray-800 dark:text-gray-300 bg-red-600 dark:bg-red-900 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap"
                        >
                          P
                        </th>
                        <th
                          rowSpan="2"
                          className="px-2 py-3 text-center font-semibold text-gray-800 dark:text-gray-300 bg-orange-600 dark:bg-orange-900 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap"
                        >
                          A
                        </th>
                        <th
                          rowSpan="2"
                          className="px-2 py-3 text-center font-semibold text-gray-800 dark:text-gray-300 bg-yellow-600 dark:bg-yellow-900 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap"
                        >
                          G
                        </th>
                        <th
                          rowSpan="2"
                          className="px-2 py-3 text-center font-semibold text-gray-800 dark:text-gray-300 bg-green-600 dark:bg-green-900 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap"
                        >
                          E
                        </th>
                        <th
                          rowSpan="2"
                          className="px-2 py-3 text-center font-semibold text-gray-800 dark:text-gray-300 bg-gray-600 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap"
                        >
                          N
                        </th>
                      </tr>
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap text-xs bg-gray-200 dark:bg-gray-700">
                          Criteria Code
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 whitespace-nowrap text-xs bg-gray-200 dark:bg-gray-700">
                          Unit Code
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                      {evaluationRows
                        .slice(0, visibleRowsCount)
                        .map((row, index) => (
                          <React.Fragment key={index}>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="px-3 py-2 border-r border-gray-300 dark:border-gray-600 min-w-[120px]">
                                <select
                                  value={row.criteriaCode}
                                  onChange={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "criteriaCode",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs"
                                  disabled={unitsDescriptionsLoading}
                                >
                                  <option value="">Select...</option>
                                  {getCriteriaCodes().map((code) => (
                                    <option key={code} value={code}>
                                      {code}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300 dark:border-gray-600 min-w-[120px]">
                                <select
                                  value={row.unitCode}
                                  onChange={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "unitCode",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs"
                                  disabled={
                                    !row.criteriaCode ||
                                    unitsDescriptionsLoading
                                  }
                                >
                                  <option value="">Select...</option>
                                  {getUnitCodesForCriteria(
                                    row.criteriaCode,
                                    index
                                  ).map((item) => (
                                    <option
                                      key={item.code}
                                      value={item.code}
                                      disabled={item.disabled}
                                      className={
                                        item.disabled
                                          ? "text-gray-400 dark:text-gray-600"
                                          : ""
                                      }
                                    >
                                      {item.code}{" "}
                                      {item.disabled
                                        ? "(Already selected)"
                                        : ""}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300 dark:border-gray-600 min-w-[120px]">
                                <input
                                  type="text"
                                  value={row.description}
                                  readOnly
                                  placeholder="DESCRIPTION"
                                  title={
                                    row.description ||
                                    "No description available"
                                  }
                                  className="w-full px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs"
                                />
                              </td>
                              {/* ...existing code for radio buttons... */}
                              <td className="px-2 py-2 text-center bg-red-200 dark:bg-red-600/20 border-r border-gray-300 dark:border-gray-600">
                                <input
                                  type="radio"
                                  name={`deck-eval-${index}`}
                                  value="P"
                                  checked={row.evaluation === "P"}
                                  onClick={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "evaluation",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 cursor-pointer"
                                />
                              </td>
                              <td className="px-2 py-2 text-center bg-orange-200 dark:bg-orange-900/20 border-r border-gray-300 dark:border-gray-600">
                                <input
                                  type="radio"
                                  name={`deck-eval-${index}`}
                                  value="A"
                                  checked={row.evaluation === "A"}
                                  onClick={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "evaluation",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 cursor-pointer"
                                />
                              </td>
                              <td className="px-2 py-2 text-center bg-yellow-50 dark:bg-yellow-900/20 border-r border-gray-300 dark:border-gray-600">
                                <input
                                  type="radio"
                                  name={`deck-eval-${index}`}
                                  value="G"
                                  checked={row.evaluation === "G"}
                                  onClick={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "evaluation",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 cursor-pointer"
                                />
                              </td>
                              <td className="px-2 py-2 text-center bg-green-200 dark:bg-green-900/20 border-r border-gray-300 dark:border-gray-600">
                                <input
                                  type="radio"
                                  name={`deck-eval-${index}`}
                                  value="E"
                                  checked={row.evaluation === "E"}
                                  onClick={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "evaluation",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 cursor-pointer"
                                />
                              </td>
                              <td className="px-2 py-2 text-center bg-gray-200 dark:bg-gray-900/20 border-r border-gray-300 dark:border-gray-600">
                                <input
                                  type="radio"
                                  name={`deck-eval-${index}`}
                                  value="N"
                                  checked={row.evaluation === "N"}
                                  onClick={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "evaluation",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4 cursor-pointer"
                                />
                              </td>
                              {/*
                              <td className="px-2 py-2 text-center bg-green-50 dark:bg-green-900/20 border-r border-gray-300 dark:border-gray-600">
                                <input
                                  type="radio"
                                  name={`deck-yesno-${index}`}
                                  value="YES"
                                  checked={row.yesNo === "YES"}
                                  onChange={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "yesNo",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4"
                                />
                              </td>
                              <td className="px-2 py-2 text-center bg-red-50 dark:bg-red-900/20">
                                <input
                                  type="radio"
                                  name={`deck-yesno-${index}`}
                                  value="NO"
                                  checked={row.yesNo === "NO"}
                                  onChange={(e) =>
                                    handleEvaluationRowChange(
                                      index,
                                      "yesNo",
                                      e.target.value
                                    )
                                  }
                                  className="w-4 h-4"
                                />
                              </td>
                              */}
                            </tr>
                            {/* Inline error messages for desktop table */}
                            {(validationErrors[`criteriaCode_${index}`] ||
                              validationErrors[`unitCode_${index}`] ||
                              validationErrors[`evaluation_${index}`]) && (
                              <tr>
                                <td
                                  colSpan="10"
                                  className="px-3 py-2 bg-red-50 dark:bg-red-900/20"
                                >
                                  <div className="flex gap-4 text-xs text-red-600 dark:text-red-400">
                                    {validationErrors[
                                      `criteriaCode_${index}`
                                    ] && (
                                      <span>
                                        •{" "}
                                        {
                                          validationErrors[
                                            `criteriaCode_${index}`
                                          ]
                                        }
                                      </span>
                                    )}
                                    {validationErrors[`unitCode_${index}`] && (
                                      <span>
                                        •{" "}
                                        {validationErrors[`unitCode_${index}`]}
                                      </span>
                                    )}
                                    {validationErrors[
                                      `evaluation_${index}`
                                    ] && (
                                      <span>
                                        •{" "}
                                        {
                                          validationErrors[
                                            `evaluation_${index}`
                                          ]
                                        }
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Criteria Details Legend */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                Criteria Details
              </h4>
              <div
                className={`grid ${
                  isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-5"
                } gap-3`}
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    P - POOR
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    A - AVERAGE
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    G - GOOD
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    E - EXCELLENT
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    N - NOT RELEVANT
                  </span>
                </div>
              </div>
            </div>

            {/* Action Taken and Remarks */}
            <div
              className={`grid ${
                isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
              } gap-4 mb-6`}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Action Taken
                </label>
                <textarea
                  value={formData.actionTaken}
                  onChange={(e) =>
                    handleInputChange("actionTaken", e.target.value)
                  }
                  placeholder="Describe the action taken (e.g., corrective steps)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none overflow-y-auto"
                  rows={isMobile ? "3" : "4"}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
                  placeholder="Add any remarks or observations"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none overflow-y-auto"
                  rows={isMobile ? "3" : "4"}
                />
              </div>
            </div>

            {/* Notes & Recommendation */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Notes & Recommendation
              </label>
              <textarea
                value={formData.observations}
                onChange={(e) =>
                  handleInputChange("observations", e.target.value)
                }
                placeholder="Notes & recommendations for follow-up or improvements"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none overflow-y-auto"
                rows={isMobile ? "2" : "3"}
              />
            </div>

            {/* Duration Section */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
                Duration (Days)
              </h4>
              <div
                className={`grid ${
                  isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
                } gap-4`}
              >
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Afloat
                  </label>
                  <input
                    type="number"
                    placeholder="Days afloat (e.g. 5)"
                    value={
                      formData.afloatDuration === 0
                        ? ""
                        : formData.afloatDuration
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "afloatDuration",
                        e.target.value ? parseInt(e.target.value, 10) : 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Indock
                  </label>
                  <input
                    type="number"
                    placeholder="Days in dock (e.g. 2)"
                    value={
                      formData.indockDuration === 0
                        ? ""
                        : formData.indockDuration
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "indockDuration",
                        e.target.value ? parseInt(e.target.value, 10) : 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total
                  </label>
                  <input
                    type="number"
                    placeholder="Total days (calculated)"
                    value={
                      Number(formData.afloatDuration) +
                      Number(formData.indockDuration)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}
          >
            <div className="mb-4">
              <h2
                className={`font-bold text-gray-900 dark:text-white ${titleClass}`}
              >
                Review Your Feedback
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Please review all information before submitting
              </p>
            </div>

            {/* User Info */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <FiUser className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.name || "Anonymous User"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This feedback will be saved locally to your browser
                  </p>
                </div>
              </div>
            </div>

            {/* Project Information Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg p-4 mb-6">
              <div className={`${isMobile ? "" : "grid grid-cols-2 gap-4"}`}>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Project Information
                  </h3>
                  <div className="space-y-2">
                    {formData.projectNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Project Number:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formData.projectNumber}
                        </span>
                      </div>
                    )}
                    {formData.projectName && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Project Name:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                          {formData.projectName}
                        </span>
                      </div>
                    )}
                    {formData.jobCategory && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Job Category:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {jobCategoryOptions.find(
                            (opt) => opt.value === formData.jobCategory
                          )?.label || formData.jobCategory}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`${isMobile ? "mt-4" : ""}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Feedback Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Reference:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formData.feedbackRef}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Overall Score:
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {calculateOverallScore()}
                        </div>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-medium">
                          /100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings Summary */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Ratings Summary
              </h4>

              {/* Evaluation Details Ratings */}
              {evaluationRows.filter(
                (row) => row.evaluation && row.evaluation !== "N"
              ).length > 0 && (
                <>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-3">
                    Evaluation Details
                  </h5>
                  <div
                    className={`grid ${
                      isMobile
                        ? "grid-cols-1 gap-3"
                        : "grid-cols-2 md:grid-cols-3 gap-4"
                    } mb-6`}
                  >
                    {evaluationRows
                      .filter((row) => row.evaluation && row.evaluation !== "N")
                      .map((row, index) => {
                        const evaluationScoreMap = {
                          P: 25, // Poor
                          A: 50, // Average
                          G: 75, // Good
                          E: 100, // Excellent
                        };

                        const score = evaluationScoreMap[row.evaluation] || 0;
                        const getScoreColor = (s) => {
                          if (s >= 75)
                            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
                          if (s >= 50)
                            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
                          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
                        };

                        return (
                          <div
                            key={index}
                            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                {row.description ||
                                  `${row.criteriaCode}-${row.unitCode}`}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getScoreColor(
                                  score
                                )}`}
                              >
                                {row.evaluation} ({score})
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  score >= 75
                                    ? "bg-green-500"
                                    : score >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                            {row.yesNo && (
                              <div className="mt-2 text-xs">
                                <span
                                  className={`px-2 py-0.5 rounded-full ${
                                    row.yesNo === "YES"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  }`}
                                >
                                  {row.yesNo}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </>
              )}

              {/* Standard Ratings */}
              {Object.values(formData.ratings).filter((r) => r > 0).length >
                0 && (
                <>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-3">
                    Standard Ratings
                  </h5>
                  <div
                    className={`grid ${
                      isMobile
                        ? "grid-cols-1 gap-3"
                        : "grid-cols-2 md:grid-cols-3 gap-4"
                    } mb-6`}
                  >
                    {Object.entries(formData.ratings)
                      .filter(([_, score]) => score > 0)
                      .slice(0, isMobile ? 6 : 12)
                      .map(([category, score]) => {
                        const getScoreColor = (s) => {
                          if (s >= 75)
                            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
                          if (s >= 50)
                            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
                          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
                        };

                        return (
                          <div
                            key={category}
                            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                {category
                                  .split(/(?=[A-Z])/)
                                  .slice(0, 2)
                                  .join(" ")}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getScoreColor(
                                  score
                                )}`}
                              >
                                {score}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  score >= 75
                                    ? "bg-green-500"
                                    : score >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {evaluationRows.filter(
                  (row) => row.evaluation && row.evaluation !== "N"
                ).length +
                  Object.values(formData.ratings).filter((r) => r > 0)
                    .length}{" "}
                total ratings
              </div>
            </div>

            {/* Comments Preview */}
            {(formData.observations || formData.poorAverageDetails) && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Comments Preview
                </h4>

                {formData.observations && (
                  <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Observations:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {formData.observations}
                    </p>
                  </div>
                )}

                {formData.poorAverageDetails && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-1">
                      Areas for Improvement:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {formData.poorAverageDetails}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div
              className={`flex ${
                isMobile ? "flex-col space-y-3" : "justify-between space-x-4"
              }`}
            >
              <button
                onClick={() => setCurrentStep(0)}
                className={`${
                  isMobile ? "w-full py-3" : "px-6 py-2"
                } border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700`}
              >
                Edit Feedback
              </button>

              <button
                onClick={handleSubmit}
                className={`${
                  isMobile ? "w-full py-3" : "px-6 py-2"
                } bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors`}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <FiCheck className="w-8 h-8 text-green-600 dark:text-green-300" />
              </div>

              <h2
                className={`font-bold text-gray-900 dark:text-white ${titleClass}`}
              >
                Feedback Submitted Successfully!
              </h2>

              <p
                className={`text-gray-600 dark:text-gray-400 mb-6 ${descClass}`}
              >
                Your feedback has been saved locally and can be viewed in the
                Feedback History section.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Reference:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formData.feedbackRef}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Project:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                      {formData.projectName || formData.projectNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Score:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {calculateOverallScore()}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Submitted:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Just now
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`flex ${
                  isMobile ? "flex-col space-y-3" : "justify-center space-x-4"
                }`}
              >
                <button
                  onClick={() => {
                    // Reset form for new feedback
                    setFormData({
                      ...formData,
                      jobCategory: "",
                      projectHandleLocation: "LOC_C",
                      startingDate: "",
                      endingDate: "",
                      jobStatus: "",
                      projectNumber: "",
                      projectName: "",
                      customerFeedbackStatus: "",
                      feedbackRef: `FB-${new Date().getFullYear()}-${Math.random()
                        .toString(36)
                        .substr(2, 6)
                        .toUpperCase()}`,
                      ratings: Object.keys(formData.ratings).reduce(
                        (acc, key) => ({ ...acc, [key]: 0 }),
                        {}
                      ),
                      valueForMoney: null,
                      recommend: null,
                      observations: "",
                      poorAverageDetails: "",
                      shipManagerComments: "",
                    });
                    setCurrentStep(0);
                  }}
                  className={`${
                    isMobile ? "w-full py-3" : "px-6 py-2"
                  } bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors`}
                >
                  Submit Another Feedback
                </button>

                <button
                  onClick={() => {
                    // This will be handled by parent component
                    if (window.location.pathname.includes("/feedback")) {
                      window.location.reload();
                    }
                  }}
                  className={`${
                    isMobile ? "w-full py-3" : "px-6 py-2"
                  } border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700`}
                >
                  View History
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your feedback is now saved in your browser's local storage.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}
          >
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <FiAlertCircle className="w-8 h-8 text-gray-400" />
              </div>

              <h2
                className={`font-bold text-gray-900 dark:text-white ${titleClass}`}
              >
                Step Not Available
              </h2>

              <p
                className={`text-gray-600 dark:text-gray-400 mb-6 ${descClass}`}
              >
                Please start from the beginning.
              </p>

              <button
                onClick={() => setCurrentStep(0)}
                className={`${
                  isMobile ? "w-full py-3" : "px-6 py-2"
                } bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors`}
              >
                Go to First Step
              </button>
            </div>
          </div>
        );
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      {/* Desktop Progress Bar */}
      <div className="hidden md:block mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between mt-6">
          {steps.map((step, index) => {
            // Check if all previous steps are validated
            const canNavigate = () => {
              if (index <= currentStep) return true; // Can always go back
              // Check all steps from current to target are valid
              for (let i = currentStep; i < index; i++) {
                const errors = validateStep(i);
                if (Object.keys(errors).length > 0) return false;
              }
              return true;
            };

            const isClickable = canNavigate();

            return (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  onClick={() => {
                    if (isClickable) {
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={!isClickable}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                    index === currentStep
                      ? "bg-blue-600 text-white scale-110"
                      : index < currentStep
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 cursor-pointer"
                      : isClickable
                      ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      : "bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  {index < currentStep ? <FiCheck /> : step.icon}
                </button>
                <span
                  className={`mt-2 text-xs text-center ${
                    index === currentStep
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Indicator */}
      {isMobile && currentStep <= steps.length - 1 && (
        <MobileProgressIndicator />
      )}

      {/* Main Content */}
      <div ref={questionSectionRef} className="mb-8">
        {getStepContent()}
      </div>

      {/* Mobile Step Buttons */}
      {isMobile &&
        currentStep < steps.length - 1 &&
        currentStep !== 2 &&
        currentStep !== 3 && <MobileStepButtons />}

      {/* Desktop Navigation */}
      {!isMobile &&
        currentStep < steps.length - 1 &&
        currentStep !== 2 &&
        currentStep !== 3 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 dark:bg-gray-700 cursor-not-allowed"
                  : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {currentStep === steps.length - 2 ? "Review" : "Next"}
            </button>
          </div>
        )}
    </div>
  );
};

export default FeedbackForm;
