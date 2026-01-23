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
  FiTrendingUp,
  FiSearch,
  FiX,
} from "react-icons/fi";
import useMobile from "../../hooks/useMobile";
import { addFeedback } from "../../services/feedbackService";
import {
  getFeedbackDates,
  getJmain,
  getUnitsDescriptions,
  getCriterias,
  getMilestoneTypes,
  submitMilestone,
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
    milestoneTypes = [],
    milestoneTypesLoading = false,
    milestoneSubmitting = false,
    milestoneSubmitSuccess = false,
    error: datesError = null,
  } = useSelector((state) => state.feedback || {});
  const isMobile = useMobile();

  const questionSectionRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [milestonesSubmitted, setMilestonesSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const projectDropdownRef = useRef(null);
  const [openMilestoneIndex, setOpenMilestoneIndex] = useState(null);
  const milestoneDropdownRefs = useRef({});
  const [openLocationIndex, setOpenLocationIndex] = useState(null);
  
  // New state for evaluation
  const [allCriteriaUnits, setAllCriteriaUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState({});
  const rowsPerPage = 5; // Show 5 rows per page

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

    // Feedback Reference
    feedbackRef: `FB-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`,

    // Top-level remarks and action taken
    remarks: "",
    actionTaken: "",

    // Milestones
    milestones: [
      { code: "", milestone: "", date: "", location: "", remarks: "" },
    ],
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

  const milestoneLocationOptions = [
    { value: "", label: "Select Location" },
    { value: "DOCK-01", label: "DOCK-01" },
    { value: "DOCK-02", label: "DOCK-02" },
    { value: "DOCK-03", label: "DOCK-03" },
    { value: "DOCK-04", label: "DOCK-04" },
    { value: "PIER-01", label: "PIER-01" },
    { value: "PIER-02", label: "PIER-02" },
    { value: "PIER-03", label: "PIER-03" },
    { value: "GP1", label: "GUIDE PIER I" },
    { value: "GP2", label: "GUIDE PIER II" },
    { value: "NPD4", label: "NORTH PIER DOCK-4" },
    { value: "DN3E", label: "DOCK NO.3 ENTRANCE" },
    { value: "DN4E", label: "DOCK NO.4 ENTRANCE" },
    { value: "DOLPHINS", label: "DOLPHINS" },
    { value: "SLPA BERTH", label: "SLPA BERTH" },
    { value: "OUTANCH", label: "OUTER ANCHORAGE" },
    { value: "JCT", label: "JCT" },
    { value: "UCT", label: "UCT" },
    { value: "PVQ", label: "PVQ" },
    { value: "BQ", label: "BQ" },
    { value: "TANKBERTH", label: "TANKER BERTH" },
    { value: "GATEWAY", label: "GATEWAY" },
    { value: "PASSTERM", label: "PASSENGER TERMINAL" },
    { value: "GALLE", label: "GALLE" },
    { value: "TRINCOMALE", label: "TRINCOMALE" },
    { value: "OTHER", label: "OTHER" },
  ];

  const steps = [
    { id: 0, title: "Project Details", icon: <FiCalendar /> },
    { id: 1, title: "Evaluation Details", icon: <FiStar /> },
    { id: 2, title: "Milestones", icon: <FiTrendingUp /> },
    { id: 3, title: "Review", icon: <FiCheck /> },
    { id: 4, title: "Complete", icon: <FiCheck /> },
  ];

  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.min(Math.max(currentStep, 0), steps.length - 1);
  const currentStepData = steps[safeCurrentStep] || steps[0];

  // Fetch units descriptions and milestone types on component mount
  useEffect(() => {
    dispatch(getUnitsDescriptions());
    dispatch(getCriterias());
    dispatch(getMilestoneTypes());
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
      
      unitsDescriptions.forEach(item => {
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
        if (a.criteriaCode !== b.criteriaCode) {
          return a.criteriaCode.localeCompare(b.criteriaCode);
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

    const handleClickOutsideMilestones = (event) => {
      // If click is outside any open milestone dropdown, close them
      const refs = milestoneDropdownRefs.current || {};
      let clickedInsideAny = false;
      Object.values(refs).forEach((r) => {
        if (r && r.contains && r.contains(event.target))
          clickedInsideAny = true;
      });
      if (!clickedInsideAny) {
        setOpenMilestoneIndex(null);
        setOpenLocationIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMilestones);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideMilestones);
    };
  }, []);

  // Calculate current page data
  const totalRows = allCriteriaUnits.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const currentPageData = allCriteriaUnits.slice(startIndex, endIndex);

  // Handle page change
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
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
    const actualIndex = startIndex + rowIndex;
    setSelectedRows(prev => ({
      ...prev,
      [actualIndex]: {
        ...prev[actualIndex],
        [field]: value,
      }
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
        if (!formData.jobCategory) errors.jobCategory = "Job Category is required";
        if (!formData.projectNumber) errors.projectNumber = "Project Number is required";
        if (!formData.projectName) errors.projectName = "Project Name is required";
        if (!formData.startingDate) errors.startingDate = "Starting Date is required";
        if (!formData.endingDate) errors.endingDate = "Ending Date is required";
        if (!formData.jobStatus) errors.jobStatus = "Job Status is required";
        if (!formData.customerFeedbackStatus)
          errors.customerFeedbackStatus = "Customer Feedback Status is required";
        break;
        
      case 1: // Evaluation Details
        const evalErrors = validateEvaluationStep();
        Object.assign(errors, evalErrors);
        break;
        
      case 2: // Milestones
        const hasValidMilestone = formData.milestones.some(
          (milestone) => milestone.milestone && milestone.milestone.trim() !== "",
        );
        if (!hasValidMilestone) {
          errors.milestones = "At least one milestone is required";
        }
        formData.milestones.forEach((milestone, index) => {
          if (milestone.milestone && milestone.milestone.trim() !== "") {
            if (!milestone.code) {
              errors[`milestone_code_${index}`] = "Code is required";
            }
            if (!milestone.date) {
              errors[`milestone_date_${index}`] = "Date is required";
            }
            if (!milestone.location) {
              errors[`milestone_location_${index}`] = "Location is required";
            }
          }
        });
        break;
        
      case 3: // Review - no validation needed
        break;
        
      default:
        break;
    }

    return errors;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 3 && !feedbackSubmitted) {
        toast.error("Please submit your feedback before completing.", {
          duration: 4000,
          position: "top-center",
        });
        return;
      }
      // Check if on milestone step and milestones not submitted
      if (currentStep === 2 && !milestonesSubmitted) {
        toast(
          (t) => (
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Submit Milestones?
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    You haven't submitted any milestones yet. Do you want to
                    submit milestones?
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    // User chose to skip, clear any errors and proceed
                    setValidationErrors({});
                    setCurrentStep((prev) => {
                      const next = Math.min(prev + 1, steps.length - 1);
                      setTimeout(scrollToQuestionSection, 100);
                      return next;
                    });
                  }}
                  className="btn-secondary text-sm"
                >
                  Skip
                </button>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    // User wants to submit milestones, stay on current step
                    setValidationErrors({
                      milestones:
                        "Please fill out the milestone form and click 'Submit Milestones' button",
                    });
                    setTimeout(scrollToQuestionSection, 100);
                  }}
                  className="btn-primary text-sm"
                >
                  Fill Milestones
                </button>
              </div>
            </div>
          ),
          {
            duration: Infinity,
            position: "top-center",
            style: {
              maxWidth: "500px",
            },
          },
        );
        return;
      }

      // Validate current step before proceeding (skip milestone validation)
      const errors = currentStep === 2 ? {} : validateStep(currentStep);
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
      // Reset milestones submitted flag when going back to milestone step
      if (currentStep === 3) {
        setMilestonesSubmitted(false);
      }
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

  const handleSubmit = async () => {
    setFeedbackSubmitted(false);
    
    // Convert selectedRows to the required format
    const feedbackList = Object.values(selectedRows)
      .filter(row => row.criteriaCode && row.unitCode && row.evaluation && row.evaluation.trim() !== "")
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
      setCurrentStep(4); // Success step
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

  // Milestone handling functions
  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...formData.milestones];

    // If changing code field, auto-populate milestone description
    if (field === "code") {
      const selectedMilestone = milestoneTypes.find(
        (mt) =>
          (mt.MILESTONE_TYPE_CODE || mt.MILESTONE_CODE || mt.CODE) ===
          value,
      );
      if (selectedMilestone) {
        updatedMilestones[index] = {
          ...updatedMilestones[index],
          code: value,
          milestone:
            selectedMilestone.MILESTONE_DESCRIPTION ||
            selectedMilestone.MILESTONE_TYPE_DESC ||
            selectedMilestone.DESCRIPTION ||
            selectedMilestone.DESC ||
            "",
        };
      } else {
        updatedMilestones[index] = {
          ...updatedMilestones[index],
          [field]: value,
        };
      }
    } else {
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [field]: value,
      };
    }

    setFormData((prev) => ({
      ...prev,
      milestones: updatedMilestones,
    }));

    // Reset submitted state when changes are made
    if (milestonesSubmitted) {
      setMilestonesSubmitted(false);
    }

    // Clear validation errors
    if (validationErrors[`milestone_${field}_${index}`]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`milestone_${field}_${index}`];
        return newErrors;
      });
    }
    if (validationErrors.milestones) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.milestones;
        return newErrors;
      });
    }
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { code: "", milestone: "", date: "", location: "", remarks: "" },
      ],
    }));
    // Reset submitted state when adding new milestone
    if (milestonesSubmitted) {
      setMilestonesSubmitted(false);
    }
  };

  const removeMilestone = (index) => {
    if (formData.milestones.length > 1) {
      const updatedMilestones = formData.milestones.filter(
        (_, i) => i !== index,
      );
      setFormData((prev) => ({
        ...prev,
        milestones: updatedMilestones,
      }));
      // Reset submitted state when removing milestone
      if (milestonesSubmitted) {
        setMilestonesSubmitted(false);
      }
    }
  };

  const handleSubmitMilestones = async () => {
    // Validate milestones before submitting
    const errors = validateStep(2);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Scroll to first error
      setTimeout(() => {
        const errorElement = document.querySelector(
          '[class*="text-red-600"]',
        );
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
      return;
    }

    // Prepare the milestone payload
    const milestonePayload = {
      p_job_category: formData.jobCategory,
      p_jmain: formData.projectNumber,
      MilestoneList: formData.milestones
        .filter(
          (milestone) =>
            milestone.milestone && milestone.milestone.trim() !== "",
        )
        .map((milestone) => ({
          p_milestone_code: milestone.code,
          p_milestone_date: milestone.date,
          p_remarks: milestone.remarks || "",
          p_milestone_location: milestone.location || "",
        })),
    };

    try {
      await dispatch(submitMilestone(milestonePayload));
      // Mark milestones as submitted on success
      setMilestonesSubmitted(true);
      setValidationErrors({});
    } catch (error) {
      console.error("Failed to submit milestones:", error);
      setValidationErrors({
        milestones:
          error.message ||
          "Failed to submit milestones. Please try again.",
      });
    }
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
                  Rate each criteria-unit combination. At least one evaluation is required.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({totalRows} total items)
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
            ) : totalRows === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No evaluation criteria available.
                </p>
              </div>
            ) : (
              <>
                {/* Evaluation Table */}
                <div className="mb-6">
                  {isMobile ? (
                    // Mobile View
                    <div className="space-y-4">
                      {currentPageData.map((item, rowIndex) => {
                        const actualIndex = startIndex + rowIndex;
                        const rowData = selectedRows[actualIndex] || {};
                        
                        return (
                          <div
                            key={actualIndex}
                            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-900"
                          >
                            {/* Criteria and Unit Info */}
                            <div className="mb-3">
                              <div className="mb-1">
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                  Criteria:
                                </span>
                                <span className="text-xs text-gray-900 dark:text-white ml-2">
                                  {item.criteriaCode} - {item.criteriaDescription}
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
                              <div className="flex flex-wrap gap-2">
                                {[
                                  { value: "P", label: "Poor", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
                                  { value: "A", label: "Average", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
                                  { value: "G", label: "Good", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
                                  { value: "E", label: "Excellent", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
                                  { value: "N", label: "Not Relevant", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
                                ].map((option) => (
                                  <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleEvaluationChange(rowIndex, "evaluation", option.value)}
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
                                  onClick={() => handleEvaluationChange(rowIndex, "yesNo", "YES")}
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
                                  onClick={() => handleEvaluationChange(rowIndex, "yesNo", "NO")}
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
                                onChange={(e) => handleEvaluationChange(rowIndex, "remarks", e.target.value)}
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
                                onChange={(e) => handleEvaluationChange(rowIndex, "actionTaken", e.target.value)}
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
                          {currentPageData.map((item, rowIndex) => {
                            const actualIndex = startIndex + rowIndex;
                            const rowData = selectedRows[actualIndex] || {};
                            
                            return (
                              <tr key={actualIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                {/* Criteria */}
                                <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                  <div className="text-gray-900 dark:text-white">
                                    <div className="font-medium">{item.criteriaCode}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                      {item.criteriaDescription}
                                    </div>
                                  </div>
                                </td>
                                
                                {/* Unit */}
                                <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                  <div className="text-gray-900 dark:text-white">
                                    <div className="font-medium">{item.unitCode}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                      {item.unitDescription}
                                    </div>
                                  </div>
                                </td>
                                
                                {/* Evaluation */}
                                <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                  <div className="flex flex-wrap gap-1">
                                    {[
                                      { value: "P", label: "P", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
                                      { value: "A", label: "A", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
                                      { value: "G", label: "G", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
                                      { value: "E", label: "E", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
                                      { value: "N", label: "N", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
                                    ].map((option) => (
                                      <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleEvaluationChange(rowIndex, "evaluation", option.value)}
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
                                </td>
                                
                                {/* Yes/No */}
                                <td className="px-4 py-3 border-r border-gray-300 dark:border-gray-600">
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleEvaluationChange(rowIndex, "yesNo", "YES")}
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
                                      onClick={() => handleEvaluationChange(rowIndex, "yesNo", "NO")}
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
                                    onChange={(e) => handleEvaluationChange(rowIndex, "remarks", e.target.value)}
                                    placeholder="Add remarks..."
                                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 resize-none"
                                    rows="2"
                                  />
                                </td>
                                
                                {/* Action Taken */}
                                <td className="px-4 py-3">
                                  <textarea
                                    value={rowData.actionTaken || ""}
                                    onChange={(e) => handleEvaluationChange(rowIndex, "actionTaken", e.target.value)}
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      <FiChevronLeft />
                      Previous
                    </button>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {startIndex + 1} to {endIndex} of {totalRows} items
                    </div>
                    
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      Next
                      <FiChevronRight />
                    </button>
                  </div>
                )}

                {/* Legend */}
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">
                    Evaluation Legend
                  </h4>
                  <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-5"} gap-3`}>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">P - POOR</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">A - AVERAGE</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">G - GOOD</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">E - EXCELLENT</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">N - NOT RELEVANT</span>
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
                    onChange={(e) => handleInputChange("observations", e.target.value)}
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
                  <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"} gap-4`}>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Afloat
                      </label>
                      <input
                        disabled
                        type="number"
                        min="0"
                        value={formData.afloatDuration === 0 ? "0" : formData.afloatDuration}
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
                        value={formData.indockDuration === 0 ? "0" : formData.indockDuration}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Total
                      </label>
                      <input
                        type="number"
                        value={Number(formData.afloatDuration) + Number(formData.indockDuration)}
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
        // Milestones Step
        return (
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${cardClass}`}
          >
            <div className="mb-4">
              <h2
                className={`font-bold text-gray-900 dark:text-white ${titleClass}`}
              >
                Project Milestones
              </h2>
              <p className={`text-gray-600 dark:text-gray-400 ${descClass}`}>
                Track key milestones and achievements for this project
              </p>
            </div>

            {validationErrors.milestones && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {validationErrors.milestones}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {formData.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Milestone {index + 1}
                    </h3>
                    {formData.milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-1 gap-3" : "grid-cols-2 gap-4"
                    }`}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Code
                      </label>
                      <div
                        className="relative"
                        ref={(el) =>
                          (milestoneDropdownRefs.current[index] = el)
                        }
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMilestoneIndex(
                              openMilestoneIndex === index ? null : index,
                            )
                          }
                          disabled={milestoneTypesLoading}
                          className={`w-full text-left input-field flex items-center justify-between ${
                            isMobile ? "py-2 text-sm" : ""
                          } ${
                            validationErrors[`milestone_code_${index}`]
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <span>
                            {milestone.code
                              ? milestone.code
                              : milestoneTypesLoading
                                ? "Loading codes..."
                                : "Select milestone code"}
                          </span>
                          <svg
                            className="w-4 h-4 ml-2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {openMilestoneIndex === index && (
                          <div
                            className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
                            style={{ maxHeight: "10rem", overflowY: "auto" }}
                          >
                            {milestoneTypes
                              .slice()
                              .sort((a, b) => {
                                const aCode =
                                  a.MILESTONE_TYPE_CODE ||
                                  a.MILESTONE_CODE ||
                                  a.CODE;
                                const bCode =
                                  b.MILESTONE_TYPE_CODE ||
                                  b.MILESTONE_CODE ||
                                  b.CODE;
                                const na = parseInt(aCode, 10);
                                const nb = parseInt(bCode, 10);
                                if (!isNaN(na) && !isNaN(nb)) return na - nb;
                                return String(aCode).localeCompare(
                                  String(bCode),
                                );
                              })
                              .map((mt, idx) => {
                                const code =
                                  mt.MILESTONE_TYPE_CODE ||
                                  mt.MILESTONE_CODE ||
                                  mt.CODE;
                                return (
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      handleMilestoneChange(
                                        index,
                                        "code",
                                        code,
                                      );
                                      setOpenMilestoneIndex(null);
                                    }}
                                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                      milestone.code === code
                                        ? "bg-blue-50 dark:bg-blue-900/30"
                                        : ""
                                    }`}
                                  >
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {code}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                      {validationErrors[`milestone_code_${index}`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors[`milestone_code_${index}`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Milestone
                      </label>
                      <input
                        type="text"
                        value={milestone.milestone}
                        readOnly
                        className={`input-field ${
                          isMobile ? "py-2 text-sm" : ""
                        } ${
                          validationErrors[`milestone_milestone_${index}`]
                            ? "border-red-500"
                            : ""
                        } bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
                        placeholder="Select a milestone code first"
                      />
                      {validationErrors[`milestone_milestone_${index}`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors[`milestone_milestone_${index}`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={milestone.date}
                        onChange={(e) =>
                          handleMilestoneChange(index, "date", e.target.value)
                        }
                        className={`input-field ${
                          isMobile ? "py-2 text-sm" : ""
                        } ${
                          validationErrors[`milestone_date_${index}`]
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {validationErrors[`milestone_date_${index}`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors[`milestone_date_${index}`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <div
                        className="relative"
                        ref={(el) =>
                          (milestoneDropdownRefs.current[`loc_${index}`] = el)
                        }
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenLocationIndex(
                              openLocationIndex === index ? null : index,
                            )
                          }
                          className={`w-full text-left input-field flex items-center justify-between ${
                            isMobile ? "py-2 text-sm" : ""
                          } ${
                            validationErrors[`milestone_location_${index}`]
                              ? "border-red-500"
                              : ""
                          }`}
                        >
                          <span>
                            {milestone.location
                              ? (
                                  milestoneLocationOptions.find(
                                    (o) => o.value === milestone.location,
                                  ) || { label: milestone.location }
                                ).label
                              : "Select Location"}
                          </span>
                          <svg
                            className="w-4 h-4 ml-2 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {openLocationIndex === index && (
                          <div
                            className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
                            style={{ maxHeight: "10rem", overflowY: "auto" }}
                          >
                            {milestoneLocationOptions.map((option) => (
                              <div
                                key={option.value}
                                onClick={() => {
                                  handleMilestoneChange(
                                    index,
                                    "location",
                                    option.value,
                                  );
                                  setOpenLocationIndex(null);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <div className="text-sm text-gray-900 dark:text-white">
                                  {option.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {validationErrors[`milestone_location_${index}`] && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {validationErrors[`milestone_location_${index}`]}
                        </p>
                      )}
                    </div>

                    <div className={isMobile ? "" : "col-span-2"}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Remarks
                      </label>
                      <textarea
                        value={milestone.remarks}
                        onChange={(e) =>
                          handleMilestoneChange(
                            index,
                            "remarks",
                            e.target.value,
                          )
                        }
                        className={`input-field ${
                          isMobile ? "py-2 text-sm" : ""
                        } ${
                          isMobile ? "h-20" : "h-24"
                        } resize-none overflow-auto`}
                        placeholder="Add any remarks about this milestone..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addMilestone}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FiTrendingUp className="w-5 h-5" />
                Add Another Milestone
              </button>
            </div>

            {/* Submit Milestones Button */}
            <div className="mt-6">
              {milestonesSubmitted ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-500 rounded-lg flex items-center gap-3">
                  <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                    Milestones submitted successfully! You can now proceed to
                    the next step.
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitMilestones}
                  disabled={milestoneSubmitting}
                  className={`btn-primary w-full flex items-center justify-center gap-2 ${
                    milestoneSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {milestoneSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-5 h-5" />
                      Submit Milestones
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        );

      case 3:
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

            {/* Milestones Summary - only show if milestones were submitted */}
            {milestonesSubmitted &&
              formData.milestones.filter((m) => m.milestone).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Project Milestones
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.milestones
                      .filter((milestone) => milestone.milestone)
                      .map((milestone, index) => {
                        return (
                          <div
                            key={index}
                            className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <span className="inline-flex w-fit px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-md text-xs font-medium">
                                    {milestone.code}
                                  </span>
                                  <h5 className="font-medium text-gray-900 dark:text-white break-words">
                                    {milestone.milestone}
                                  </h5>
                                </div>

                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="flex items-center">
                                    <FiCalendar className="w-4 h-4 mr-1 flex-shrink-0" />
                                    <span className="break-words">
                                      {milestone.date
                                        ? new Date(
                                            milestone.date,
                                          ).toLocaleDateString()
                                        : "No date set"}
                                    </span>
                                  </div>
                                  {milestone.location && (
                                    <div className="flex items-center min-w-0">
                                      <span className="mr-1 flex-shrink-0">
                                        📍
                                      </span>
                                      <span className="break-words">
                                        {milestone.location}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {milestone.remarks && (
                              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words">
                                  {milestone.remarks}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

            {/* Ratings Summary */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Ratings Summary
              </h4>

              {/* Evaluation Details Ratings */}
              {Object.values(selectedRows).filter(
                (row) => row.evaluation && row.evaluation !== "N",
              ).length > 0 && (
                <>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-3">
                    Evaluation Details
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                    {Object.values(selectedRows)
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

                        // Find the criteria description
                        const criteriaItem = allCriteriaUnits.find(
                          item => item.criteriaCode === row.criteriaCode && item.unitCode === row.unitCode
                        );

                        return (
                          <div
                            key={index}
                            className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-words">
                                {criteriaItem ? `${criteriaItem.criteriaCode} - ${criteriaItem.unitCode}` : `${row.criteriaCode}-${row.unitCode}`}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getScoreColor(
                                  score,
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
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
                            className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-words">
                                {category
                                  .split(/(?=[A-Z])/)
                                  .slice(0, 2)
                                  .join(" ")}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getScoreColor(
                                  score,
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
                {Object.values(selectedRows).filter(
                  (row) => row.evaluation && row.evaluation !== "N",
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
                onClick={() => {
                  setFeedbackSubmitted(false);
                  setCurrentStep(0);
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

      case 4:
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
                      milestones: [
                        {
                          code: "",
                          milestone: "",
                          date: "",
                          location: "",
                          remarks: "",
                        },
                      ],
                    });
                    setSelectedRows({});
                    setAllCriteriaUnits([]);
                    setCurrentPage(1);
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
              if (index === steps.length - 1 && !feedbackSubmitted)
                return false;
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
        currentStep !== 3 &&
        currentStep !== 4 && <MobileStepButtons />}

      {/* Desktop Navigation */}
      {!isMobile &&
        currentStep < steps.length - 1 &&
        currentStep !== 3 &&
        currentStep !== 4 && (
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