import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  FiCheck,
  FiAlertCircle,
  FiStar,
  FiMessageSquare,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiSearch,
  FiX,
  FiUpload,
  FiTrash2,
} from "react-icons/fi";
import useMobile from "../../hooks/useMobile";
import { addFeedback } from "../../services/feedbackService";
import {
  getFeedbackDates,
  getJmain,
  getUnitsDescriptions,
  getCriterias,
  clearFeedbackDates,
  getDuration,
} from "../../actions/feedbackActions";

const FeedbackForm = ({ vessel, onSubmit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    dates = { startingDate: "", endingDate: "" },
    duration = { afloatDays: 0, indockDays: 0 },
    loading: datesLoading = false,
    durationLoading = false,
    jmainList = [],
    jmainLoading = false,
    unitsDescriptions = [],
    unitsDescriptionsLoading = false,
    criterias = [],
    criteriasLoading = false,
    error: datesError = null,
  } = useSelector((state) => state.feedback || {});
  const isMobile = useMobile();

  const questionSectionRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const projectDropdownRef = useRef(null);

  // New state for evaluation
  const [allCriteriaUnits, setAllCriteriaUnits] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});

  // Initialize form data
  const [formData, setFormData] = useState({
    // Project Information
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

    // File Attachments
    attachments: [],

    // Feedback Reference
    feedbackRef: `FB-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`,

    // Top-level remarks and action taken
    remarks: "",
    actionTaken: "",
  });

  // If vessel is provided, we may auto-fill job category and project number (JMAIN)
  const [autoProjectForVessel, setAutoProjectForVessel] = useState(null);

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
    dispatch(getCriterias());
  }, [dispatch]);

  // Cleanup: Clear dates when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearFeedbackDates());
    };
  }, [dispatch]);

  // Fetch JMain (project numbers) when job category is selected
  useEffect(() => {
    if (formData.jobCategory) {
      dispatch(getJmain(formData.jobCategory));
      // Clear dates from Redux when job category changes
      dispatch(clearFeedbackDates());
      // Reset project number and dates when job category changes
      setFormData((prev) => ({
        ...prev,
        projectNumber: "",
        startingDate: "",
        endingDate: "",
      }));
    }
  }, [formData.jobCategory, dispatch]);

  // Fetch dates when job category and project number are selected
  useEffect(() => {
    if (formData.jobCategory && formData.projectNumber) {
      dispatch(getFeedbackDates(formData.jobCategory, formData.projectNumber));
    }
  }, [formData.jobCategory, formData.projectNumber, dispatch]);

  // Fetch duration when job category and project number are selected
  useEffect(() => {
    if (formData.jobCategory && formData.projectNumber) {
      dispatch(getDuration(formData.jobCategory, formData.projectNumber));
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

  // Update form data when duration is loaded from Redux
  useEffect(() => {
    if (
      duration &&
      (duration.afloatDays !== undefined || duration.indockDays !== undefined)
    ) {
      setFormData((prev) => ({
        ...prev,
        afloatDuration:
          duration.afloatDays !== undefined ? duration.afloatDays : 0,
        indockDuration:
          duration.indockDays !== undefined ? duration.indockDays : 0,
      }));
    }
  }, [duration]);

  // When the `vessel` prop changes, prefill job category and remember the JMAIN to auto-select
  useEffect(() => {
    if (vessel && vessel.raw) {
      const shipJcat =
        vessel.raw.SHIP_JCAT || vessel.raw.SHIP_JOB_CATEGORY || "";
      const shipJmain =
        vessel.raw.SHIP_JMAIN || vessel.jmainNo || vessel.id || "";

      if (shipJcat) {
        setFormData((prev) => ({
          ...prev,
          jobCategory: shipJcat,
        }));
        // Remember the project we want to auto-select once jmainList is loaded
        if (shipJmain) setAutoProjectForVessel(String(shipJmain));
      } else if (shipJmain) {
        // If no job category available, still set projectNumber so users see JMAIN
        setFormData((prev) => ({
          ...prev,
          projectNumber: String(shipJmain),
          projectName: vessel.name || prev.projectName || "",
        }));
      }
    }
  }, [vessel]);

  // When jmainList is updated (after dispatching getJmain), select the matching project for the vessel
  useEffect(() => {
    if (autoProjectForVessel) {
      const match = (jmainList || []).find(
        (p) => String(p.FEEDBACK_JMAIN) === String(autoProjectForVessel),
      );
      if (match) {
        // use existing handler to ensure projectName and related state update
        handleProjectNumberChange(match.FEEDBACK_JMAIN);
      } else {
        // If not found in the list, set the raw project number
        setFormData((prev) => ({
          ...prev,
          projectNumber: String(autoProjectForVessel),
          projectName:
            (vessel && (vessel.raw?.FEEDBACK_DESC || vessel.name)) ||
            prev.projectName ||
            "",
        }));
      }
      setAutoProjectForVessel(null);
    }
  }, [jmainList, autoProjectForVessel, vessel]);

  // Prepare all criteria-unit combinations when unitsDescriptions loads
  useEffect(() => {
    if (unitsDescriptions.length > 0) {
      const uniqueCombinations = [];
      const seen = new Set();

      unitsDescriptions.forEach((item) => {
        const criteriaCode = item.FEEDBACK_CRITERIA_CODE;
        const unitCode = item.FEEDBACK_UNIT_CODE;
        const unitDescription = item.FEEDBACK_UNIT_DESCRIPTION || "";
        const criteriaDescription = item.FEEDBACK_CRITERIA_DESC || "";

        if (criteriaCode && unitCode) {
          const key = `${criteriaCode}-${unitCode}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueCombinations.push({
              criteriaCode,
              unitCode,
              unitDescription,
              criteriaDescription,
              fullDescription: `${criteriaDescription} - ${unitDescription}`,
            });
          }
        }
      });

      // Sort by criteria code then unit code
      uniqueCombinations.sort((a, b) => {
        // Handle numeric and dotted codes like "3.1", "3.2"
        const aParts = a.criteriaCode.split(".");
        const bParts = b.criteriaCode.split(".");

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aVal = parseInt(aParts[i] || 0);
          const bVal = parseInt(bParts[i] || 0);
          if (aVal !== bVal) return aVal - bVal;
        }
        return a.unitCode.localeCompare(b.unitCode);
      });

      setAllCriteriaUnits(uniqueCombinations);

      // Initialize selected rows with empty evaluation
      const initialSelectedRows = {};
      uniqueCombinations.forEach((item, index) => {
        initialSelectedRows[index] = {
          criteriaCode: item.criteriaCode,
          unitCode: item.unitCode,
          evaluation: "",
          yesNo: "",
          remarks: "",
          actionTaken: "",
        };
      });
      setSelectedRows(initialSelectedRows);
    }
  }, [unitsDescriptions]);

  // Handle click outside project dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target)
      ) {
        setShowProjectDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Group criteria by parent category (e.g., 3.0, 4.0, 5.0 etc)
  const groupCriteriaByParent = () => {
    const groups = {};

    allCriteriaUnits.forEach((item) => {
      const mainCategory = item.criteriaCode.split(".")[0]; // Get "3" from "3.1"

      if (!groups[mainCategory]) {
        groups[mainCategory] = {
          mainCode: mainCategory,
          mainDescription: item.criteriaDescription,
          items: [],
        };
      }

      groups[mainCategory].items.push(item);
    });

    return groups;
  };

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
      (project) => project.FEEDBACK_JMAIN === value,
    );

    // Update both project number and project name
    setFormData((prev) => ({
      ...prev,
      projectNumber: value,
      projectName: selectedProject?.FEEDBACK_DESC || "",
    }));

    // Clear search and close dropdown
    setProjectSearchTerm("");
    setShowProjectDropdown(false);

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

  // Filter projects based on search term
  const filteredProjects = jmainList.filter((project) => {
    const jmainValue = project.FEEDBACK_JMAIN || "";
    const jmainDesc = project.FEEDBACK_DESC || "";
    const searchLower = projectSearchTerm.toLowerCase();
    return (
      jmainValue.toString().toLowerCase().includes(searchLower) ||
      jmainDesc.toLowerCase().includes(searchLower)
    );
  });

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
  const handleEvaluationChange = (rowIndex, field, value) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [field]: value,
      },
    }));
  };

  // Validation for evaluation step
  const validateEvaluationStep = () => {
    const errors = {};
    let hasAtLeastOneEvaluation = false;

    // Check if at least one row has evaluation
    Object.values(selectedRows).forEach((row, index) => {
      if (row.evaluation && row.evaluation.trim() !== "") {
        hasAtLeastOneEvaluation = true;
      }
    });

    if (!hasAtLeastOneEvaluation) {
      errors.evaluationRows = "At least one evaluation must be provided";
    }

    return errors;
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
        break;

      case 1: // Evaluation Details
        const evalErrors = validateEvaluationStep();
        Object.assign(errors, evalErrors);
        break;

      case 2: // Review - no validation needed
        break;

      default:
        break;
    }

    return errors;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 2 && !feedbackSubmitted) {
        toast.error("Please submit your feedback before completing.", {
          duration: 4000,
          position: "top-center",
        });
        return;
      }
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
              '[class*="bg-red-50"][class*="border-red-500"]',
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

    // Get evaluation scores from selected rows
    const evaluationScores = Object.values(selectedRows)
      .filter((row) => row.evaluation && row.evaluation !== "N")
      .map((row) => evaluationScoreMap[row.evaluation] || 0)
      .filter((score) => score > 0);

    // Combine all scores
    const allScores = [...ratings, ...evaluationScores];

    return allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0;
  };

  const handleFileUpload = (e) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (files.length !== pdfFiles.length) {
      toast.error("Only PDF files are allowed", {
        duration: 3000,
        position: "top-center",
      });
    }

    // Filter valid PDFs (correct type and size)
    const validPdfs = [];
    const oversizedFiles = [];

    pdfFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        oversizedFiles.push(file.name);
      } else {
        validPdfs.push(file);
      }
    });

    if (oversizedFiles.length > 0) {
      toast.error(`File(s) exceed 10 MB limit: ${oversizedFiles.join(", ")}`, {
        duration: 4000,
        position: "top-center",
      });
    }

    if (validPdfs.length > 0) {
      const newAttachments = validPdfs.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        id: Math.random().toString(36).substr(2, 9),
      }));

      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newAttachments],
      }));

      toast.success(`${validPdfs.length} PDF file(s) added`, {
        duration: 2000,
        position: "top-center",
      });
    }

    // Reset input
    e.target.value = "";
  };

  const removeAttachment = (attachmentId) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== attachmentId),
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = async () => {
    setFeedbackSubmitted(false);

    // Convert selectedRows to the required format
    const feedbackList = Object.values(selectedRows)
      .filter(
        (row) =>
          row.criteriaCode &&
          row.unitCode &&
          row.evaluation &&
          row.evaluation.trim() !== "",
      )
      .map((row) => {
        const answer = (row.evaluation || "").toString().toUpperCase();
        const validAnswers = ["P", "A", "G", "E", "N"];

        return {
          P_CRITERIA_CODE: row.criteriaCode,
          P_CODE: row.unitCode,
          P_ANSWER_TYPE: validAnswers.includes(answer) ? answer : "N",
          P_REMARKS: row.remarks || formData.remarks || "",
          P_ACTION_TAKEN: row.actionTaken || formData.actionTaken || "",
        };
      });

    // Only submit if we have evaluations
    if (feedbackList.length === 0) {
      toast.error("Please provide at least one evaluation before submitting.", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    const feedbackPayload = {
      P_JOB_CATEGORY: formData.jobCategory,
      P_JMAIN: formData.projectNumber,
      P_REMARKS: formData.remarks || "",
      P_ACTION_TAKEN: formData.actionTaken || "",
      FeedbackList: feedbackList,
    };

    try {
      const response = await addFeedback(feedbackPayload);

      if (
        response.ResultSet &&
        response.ResultSet.some((item) => item.Result === "EXISTS")
      ) {
        toast("Feedback for this criteria and unit code already exists.", {
          duration: 5000,
          position: "top-center",
        });
        return;
      }

      setFeedbackSubmitted(true);
      setCurrentStep(3); // Success step
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setFeedbackSubmitted(false);
      toast.error("Failed to submit feedback. Please try again later.", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    if (onSubmit) {
      onSubmit(feedbackPayload);
    }
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
            className={`flex-1 btn-secondary ${
              currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FiChevronLeft className="inline mr-2" />
            Previous
          </button>

          <button onClick={nextStep} className="flex-1 btn-primary">
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

  // Get the index of an item in allCriteriaUnits
  const getItemIndex = (criteriaCode, unitCode) => {
    return allCriteriaUnits.findIndex(
      (item) =>
        item.criteriaCode === criteriaCode && item.unitCode === unitCode,
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
                  <div className="relative" ref={projectDropdownRef}>
                    <div className="relative">
                      <input
                        type="text"
                        value={
                          projectSearchTerm ||
                          (formData.projectNumber
                            ? jmainList.find(
                                (p) =>
                                  p.FEEDBACK_JMAIN === formData.projectNumber,
                              )?.FEEDBACK_JMAIN || formData.projectNumber
                            : "")
                        }
                        onChange={(e) => {
                          const nextValue = e.target.value;
                          setProjectSearchTerm(nextValue);
                          setShowProjectDropdown(true);

                          if (nextValue === "") {
                            setFormData((prev) => ({
                              ...prev,
                              projectNumber: "",
                              projectName: "",
                            }));
                            setValidationErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.projectNumber;
                              delete newErrors.projectName;
                              return newErrors;
                            });
                          }
                        }}
                        onFocus={() => setShowProjectDropdown(true)}
                        placeholder={
                          jmainLoading
                            ? "Loading..."
                            : !formData.jobCategory
                              ? "Select job category first"
                              : "Search or select project..."
                        }
                        disabled={!formData.jobCategory || jmainLoading}
                        className={`input-field ${
                          isMobile ? "py-2 text-sm" : ""
                        } ${
                          validationErrors.projectNumber ? "border-red-500" : ""
                        } pr-10`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {jmainLoading ? (
                          <svg
                            className="animate-spin h-4 w-4 text-blue-500"
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
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                        ) : (
                          <FiSearch className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Dropdown list */}
                    {showProjectDropdown &&
                      formData.jobCategory &&
                      !jmainLoading && (
                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {filteredProjects.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                              No projects found
                            </div>
                          ) : (
                            filteredProjects
                              .sort((a, b) => {
                                const aVal = parseInt(a.FEEDBACK_JMAIN) || 0;
                                const bVal = parseInt(b.FEEDBACK_JMAIN) || 0;
                                return aVal - bVal;
                              })
                              .map((project) => {
                                const jmainValue = project.FEEDBACK_JMAIN;
                                const jmainDesc = project.FEEDBACK_DESC;
                                return (
                                  <div
                                    key={jmainValue}
                                    onClick={() =>
                                      handleProjectNumberChange(jmainValue)
                                    }
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                      formData.projectNumber === jmainValue
                                        ? "bg-blue-50 dark:bg-blue-900/30"
                                        : ""
                                    }`}
                                  >
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {jmainValue}
                                    </div>
                                  </div>
                                );
                              })
                          )}
                        </div>
                      )}
                  </div>
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
                  disabled
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
                    type="text"
                    value={formData.startingDate}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.startingDate ? "border-red-500" : ""
                    }`}
                    disabled={datesLoading || !!formData.startingDate}
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
                    type="text"
                    value={formData.endingDate}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    className={`input-field ${isMobile ? "py-2 text-sm" : ""} ${
                      validationErrors.endingDate ? "border-red-500" : ""
                    }`}
                    disabled={datesLoading || !!formData.endingDate}
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
                        e.target.value,
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
                  disabled
                  value={formData.projectHandleLocation}
                  onChange={(e) =>
                    handleInputChange("projectHandleLocation", e.target.value)
                  }
                  className={`input-field ${isMobile ? "py-2 text-sm" : ""} cursor-default`}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        const groupedCriteria = groupCriteriaByParent();
        const sortedGroupKeys = Object.keys(groupedCriteria).sort(
          (a, b) => parseInt(a) - parseInt(b),
        );

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
                  Rate each criteria following the PDF format hierarchy. At
                  least one evaluation is required.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({allCriteriaUnits.length} total items)
                </span>
              </div>
            </div>

            {/* Validation Error */}
            {validationErrors.evaluationRows && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {validationErrors.evaluationRows}
                </p>
              </div>
            )}

            {/* Loading State */}
            {unitsDescriptionsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Loading evaluation criteria...
                </p>
              </div>
            ) : allCriteriaUnits.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No evaluation criteria available.
                </p>
              </div>
            ) : (
              <>
                {/* Scrollable Evaluation Section */}
                <div className="mb-6 max-h-[70vh] overflow-y-auto pr-2">
                  {sortedGroupKeys.map((groupKey) => {
                    const group = groupedCriteria[groupKey];

                    return (
                      <div key={groupKey} className="mb-6 last:mb-0">
                        {/* Main Category Header - PDF Style */}
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3 border border-gray-300 dark:border-gray-700">
                          <div className="flex items-center">
                            <div className="bg-blue-100 dark:bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">
                                {groupKey}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 dark:text-white">
                                {group.mainDescription}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* Evaluation Table */}
                        {isMobile ? (
                          // Mobile View
                          <div className="space-y-3">
                            {group.items.map((item) => {
                              const itemIndexInAll = getItemIndex(
                                item.criteriaCode,
                                item.unitCode,
                              );
                              const rowData =
                                selectedRows[itemIndexInAll] || {};

                              return (
                                <div
                                  key={`${item.criteriaCode}-${item.unitCode}`}
                                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-900"
                                >
                                  {/* Criteria and Unit Info */}
                                  <div className="mb-3">
                                    <div className="mb-1">
                                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Criteria:
                                      </span>
                                      <span className="text-xs text-gray-900 dark:text-white ml-2">
                                        {item.criteriaCode} -{" "}
                                        {item.criteriaDescription}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Unit:
                                      </span>
                                      <span className="text-xs text-gray-900 dark:text-white ml-2">
                                        {item.unitCode} - {item.unitDescription}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Evaluation */}
                                  <div className="mb-3">
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                      Evaluation
                                    </label>
                                    <div className="flex gap-2 flex-nowrap overflow-x-auto">
                                      {[
                                        {
                                          value: "P",
                                          label: "P",
                                          title: "Poor",
                                          color:
                                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                                        },
                                        {
                                          value: "A",
                                          label: "A",
                                          title: "Average",
                                          color:
                                            "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                                        },
                                        {
                                          value: "G",
                                          label: "G",
                                          title: "Good",
                                          color:
                                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                                        },
                                        {
                                          value: "E",
                                          label: "E",
                                          title: "Excellent",
                                          color:
                                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                                        },
                                        {
                                          value: "N",
                                          label: "N",
                                          title: "Not Relevant",
                                          color:
                                            "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                                        },
                                      ].map((option) => (
                                        <button
                                          key={option.value}
                                          type="button"
                                          title={option.title}
                                          onClick={() =>
                                            handleEvaluationChange(
                                              itemIndexInAll,
                                              "evaluation",
                                              option.value,
                                            )
                                          }
                                          className={`px-2 py-1 text-xs rounded border transition-colors ${
                                            rowData.evaluation === option.value
                                              ? `${option.color} border-${option.value === "P" ? "red" : option.value === "A" ? "orange" : option.value === "G" ? "yellow" : option.value === "E" ? "green" : "gray"}-500`
                                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100"
                                          }`}
                                        >
                                          {option.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Yes/No */}
                                  <div className="mb-3">
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                      Yes/No
                                    </label>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleEvaluationChange(
                                            itemIndexInAll,
                                            "yesNo",
                                            "YES",
                                          )
                                        }
                                        className={`px-3 py-1 text-xs rounded border transition-colors ${
                                          rowData.yesNo === "YES"
                                            ? "bg-green-100 text-green-800 border-green-500 dark:bg-green-900 dark:text-green-300"
                                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100"
                                        }`}
                                      >
                                        YES
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleEvaluationChange(
                                            itemIndexInAll,
                                            "yesNo",
                                            "NO",
                                          )
                                        }
                                        className={`px-3 py-1 text-xs rounded border transition-colors ${
                                          rowData.yesNo === "NO"
                                            ? "bg-red-100 text-red-800 border-red-500 dark:bg-red-900 dark:text-red-300"
                                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100"
                                        }`}
                                      >
                                        NO
                                      </button>
                                    </div>
                                  </div>

                                  {/* Remarks */}
                                  <div className="mb-3">
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                      Remarks
                                    </label>
                                    <textarea
                                      value={rowData.remarks || ""}
                                      onChange={(e) =>
                                        handleEvaluationChange(
                                          itemIndexInAll,
                                          "remarks",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Add remarks..."
                                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs bg-white dark:bg-gray-800 resize-none"
                                      rows="2"
                                    />
                                  </div>

                                  {/* Action Taken */}
                                  <div className="mb-3">
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                      Action Taken
                                    </label>
                                    <textarea
                                      value={rowData.actionTaken || ""}
                                      onChange={(e) =>
                                        handleEvaluationChange(
                                          itemIndexInAll,
                                          "actionTaken",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Action taken..."
                                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-xs bg-white dark:bg-gray-800 resize-none"
                                      rows="2"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          // Desktop View
                          <div className="overflow-x-auto border border-gray-300 dark:border-gray-600 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600 text-sm">
                              <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                                    Criteria
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                                    Unit
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                                    Evaluation
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                                    Yes/No
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600">
                                    Remarks
                                  </th>
                                  <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                                    Action Taken
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                                {group.items.map((item) => {
                                  const itemIndexInAll = getItemIndex(
                                    item.criteriaCode,
                                    item.unitCode,
                                  );
                                  const rowData =
                                    selectedRows[itemIndexInAll] || {};

                                  return (
                                    <tr
                                      key={`${item.criteriaCode}-${item.unitCode}`}
                                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                      {/* Criteria */}
                                      <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                        <div className="text-gray-900 dark:text-white">
                                          <div className="font-medium">
                                            {item.criteriaCode}
                                          </div>
                                          <div className="text-xs text-gray-600 dark:text-gray-400">
                                            {item.criteriaDescription}
                                          </div>
                                        </div>
                                      </td>

                                      {/* Unit */}
                                      <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                        <div className="text-gray-900 dark:text-white">
                                          <div className="font-medium">
                                            {item.unitCode}
                                          </div>
                                          <div className="text-xs text-gray-600 dark:text-gray-400">
                                            {item.unitDescription}
                                          </div>
                                        </div>
                                      </td>

                                      {/* Evaluation */}
                                      <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                        <div className="flex gap-1 flex-nowrap overflow-x-auto">
                                          {[
                                            {
                                              value: "P",
                                              label: "P",
                                              color:
                                                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                                            },
                                            {
                                              value: "A",
                                              label: "A",
                                              color:
                                                "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
                                            },
                                            {
                                              value: "G",
                                              label: "G",
                                              color:
                                                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                                            },
                                            {
                                              value: "E",
                                              label: "E",
                                              color:
                                                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                                            },
                                            {
                                              value: "N",
                                              label: "N",
                                              color:
                                                "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                                            },
                                          ].map((option) => (
                                            <button
                                              key={option.value}
                                              type="button"
                                              onClick={() =>
                                                handleEvaluationChange(
                                                  itemIndexInAll,
                                                  "evaluation",
                                                  option.value,
                                                )
                                              }
                                              className={`px-2 py-1 text-xs rounded border transition-colors ${
                                                rowData.evaluation ===
                                                option.value
                                                  ? `${option.color} border-${option.value === "P" ? "red" : option.value === "A" ? "orange" : option.value === "G" ? "yellow" : option.value === "E" ? "green" : "gray"}-500`
                                                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100"
                                              }`}
                                            >
                                              {option.label}
                                            </button>
                                          ))}
                                        </div>
                                      </td>

                                      {/* Yes/No */}
                                      <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                        <div className="flex gap-2">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleEvaluationChange(
                                                itemIndexInAll,
                                                "yesNo",
                                                "YES",
                                              )
                                            }
                                            className={`px-3 py-1 text-xs rounded border transition-colors ${
                                              rowData.yesNo === "YES"
                                                ? "bg-green-100 text-green-800 border-green-500 dark:bg-green-900 dark:text-green-300"
                                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100"
                                            }`}
                                          >
                                            YES
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleEvaluationChange(
                                                itemIndexInAll,
                                                "yesNo",
                                                "NO",
                                              )
                                            }
                                            className={`px-3 py-1 text-xs rounded border transition-colors ${
                                              rowData.yesNo === "NO"
                                                ? "bg-red-100 text-red-800 border-red-500 dark:bg-red-900 dark:text-red-300"
                                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100"
                                            }`}
                                          >
                                            NO
                                          </button>
                                        </div>
                                      </td>

                                      {/* Remarks */}
                                      <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                        <textarea
                                          value={rowData.remarks || ""}
                                          onChange={(e) =>
                                            handleEvaluationChange(
                                              itemIndexInAll,
                                              "remarks",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Add remarks..."
                                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 resize-none"
                                          rows="2"
                                        />
                                      </td>

                                      {/* Action Taken */}
                                      <td className="px-4 py-3">
                                        <textarea
                                          value={rowData.actionTaken || ""}
                                          onChange={(e) =>
                                            handleEvaluationChange(
                                              itemIndexInAll,
                                              "actionTaken",
                                              e.target.value,
                                            )
                                          }
                                          placeholder="Action taken..."
                                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 resize-none"
                                          rows="2"
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                    Evaluation Legend
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
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

                {/* File Attachment Section */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <FiUpload className="w-4 h-4" />
                      File Attachments (PDF Only)
                    </div>
                  </label>

                  {/* Upload Input */}
                  <div className="mb-4">
                    <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="text-center">
                        <FiUpload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          PDF files only (max 10 MB per file)
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Uploaded Files List */}
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {formData.attachments.length} file(s) selected
                      </p>
                      {formData.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FiUpload className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-800 dark:text-gray-200 truncate">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {formatFileSize(attachment.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(attachment.id)}
                            className="ml-2 p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors flex-shrink-0"
                            title="Remove file"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Duration Section */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
                    Duration (Days)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Afloat
                      </label>
                      <input
                        disabled
                        type="number"
                        min="0"
                        value={
                          formData.afloatDuration === 0
                            ? "0"
                            : formData.afloatDuration
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Indock
                      </label>
                      <input
                        disabled
                        type="number"
                        min="0"
                        value={
                          formData.indockDuration === 0
                            ? "0"
                            : formData.indockDuration
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
              </>
            )}
          </div>
        );

      case 2:
        const reviewGroups = groupCriteriaByParent();
        const reviewGroupKeys = Object.keys(reviewGroups).sort(
          (a, b) => parseInt(a) - parseInt(b),
        );

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
                            (opt) => opt.value === formData.jobCategory,
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
              {reviewGroupKeys.map((groupKey) => {
                const group = reviewGroups[groupKey];
                const groupEvaluations = group.items.filter((item) => {
                  const index = getItemIndex(item.criteriaCode, item.unitCode);
                  return (
                    selectedRows[index]?.evaluation &&
                    selectedRows[index]?.evaluation !== "N"
                  );
                });

                if (groupEvaluations.length === 0) return null;

                return (
                  <div key={groupKey} className="mb-4">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-t-lg">
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                        {groupKey}. {group.mainDescription}
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                      {groupEvaluations.map((item) => {
                        const index = getItemIndex(
                          item.criteriaCode,
                          item.unitCode,
                        );
                        const rowData = selectedRows[index] || {};
                        const evaluationScoreMap = {
                          P: 25, // Poor
                          A: 50, // Average
                          G: 75, // Good
                          E: 100, // Excellent
                        };
                        const score =
                          evaluationScoreMap[rowData.evaluation] || 0;
                        const getScoreColor = (s) => {
                          if (s >= 75)
                            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
                          if (s >= 50)
                            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
                          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
                        };

                        return (
                          <div
                            key={`${item.criteriaCode}-${item.unitCode}`}
                            className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-words">
                                {item.criteriaCode} - {item.unitCode}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getScoreColor(
                                  score,
                                )}`}
                              >
                                {rowData.evaluation} ({score}%)
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
                            {rowData.yesNo && (
                              <div className="mt-2 text-xs">
                                <span
                                  className={`px-2 py-0.5 rounded-full ${
                                    rowData.yesNo === "YES"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  }`}
                                >
                                  {rowData.yesNo}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {
                  Object.values(selectedRows).filter(
                    (row) => row.evaluation && row.evaluation !== "N",
                  ).length
                }{" "}
                total evaluations
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
                onClick={() => {
                  setFeedbackSubmitted(false);
                  setCurrentStep(1);
                }}
                className={`${
                  isMobile ? "w-full py-3" : "px-6 py-2"
                } btn-secondary`}
              >
                Edit Feedback
              </button>

              <button
                onClick={handleSubmit}
                className={`${
                  isMobile ? "w-full py-3" : "px-6 py-2"
                } btn-primary`}
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
                      {calculateOverallScore()}
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
                        {},
                      ),
                      valueForMoney: null,
                      recommend: null,
                      observations: "",
                      poorAverageDetails: "",
                      shipManagerComments: "",
                    });
                    setSelectedRows({});
                    setAllCriteriaUnits([]);
                    setFeedbackSubmitted(false);
                    setCurrentStep(0);
                  }}
                  className={`${
                    isMobile ? "w-full py-3" : "px-6 py-2"
                  } btn-primary`}
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
                  } btn-secondary`}
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
                onClick={() => {
                  setFeedbackSubmitted(false);
                  setCurrentStep(0);
                }}
                className={`${
                  isMobile ? "w-full py-3" : "px-6 py-2"
                } btn-primary`}
              >
                Go to First Step
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
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
              className={`btn-secondary px-6 ${
                currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className={`btn-primary px-6 ${
                currentStep === steps.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {currentStep === steps.length - 2 ? "Review" : "Next"}
            </button>
          </div>
        )}
    </div>
  );
};

export default FeedbackForm;
