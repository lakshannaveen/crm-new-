import axios from "axios";
import { authService } from "./authService";
import config from "../config";

const BACKEND_BASE_URL = config.api.baseURL;

// Get feedback dates from backend
export const getFeedbackDates = async (jobCategory, projectNumber) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Feedback/GetDates`,
      {
        params: {
          P_JOB_CATEGORY: jobCategory,
          P_JMAIN: projectNumber,
        },
        headers,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get duration (Afloat and Indock days)
export const getDuration = async (jobCategory, jmain) => {
  try {
    console.log("API Call - getDuration with params:", {
      p_job_category: jobCategory,
      p_jmain: jmain,
    });
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Feedback/GetDuration`,
      {
        params: {
          p_job_category: jobCategory,
          p_jmain: jmain,
        },
        headers,
      },
    );
    console.log("API Response - getDuration:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error - getDuration:", error.message);
    throw error;
  }
};

// Get JMain (project numbers) by job category
export const getJmain = async (jobCategory) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Feedback/GetJmain`,
      {
        params: {
          P_JOB_CATEGORY: jobCategory,
        },
        headers,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add feedback
export const addFeedback = async (feedbackData) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.post(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Feedback/Addfeedback`,
      feedbackData,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Units and Descriptions
export const getUnitsDescriptions = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Feedback/GetUnitsDescriptions`,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Criteria Descriptions
export const getCriterias = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Feedback/Getcriterias`,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add Milestone
export const addMilestone = async (milestoneData) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.post(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Milestone/AddMilestone`,
      milestoneData,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all milestone types
export const getMilestoneTypes = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Milestone/GetAllMilestoneTypes`,
      { headers },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all feedback entries by ship
export const getAllFeedback = async (jobCategory, jmain) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Feedback/GetFeedbacksbyShip`,
      {
        params: {
          p_job_category: jobCategory,
          p_jmain: jmain,
        },
        headers,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get milestones by ship
export const getMilestonesByShip = async (jobCategory, jmain) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/Milestone/GetMilestonebyShip`,
      {
        params: {
          P_JOB_CATEGORY: jobCategory,
          P_JMAIN: jmain,
        },
        headers,
      },
    );

    const milestones = response.data?.ResultSet || [];

    // Get milestone types to fetch descriptions
    const milestoneTypesResponse = await getMilestoneTypes();
    const milestoneTypes = milestoneTypesResponse?.ResultSet || [];

    // Create a map of milestone codes to descriptions
    const milestoneDescMap = {};
    milestoneTypes.forEach((type) => {
      const code = type.MILESTONE_CODE || type.code;
      const description = type.MILESTONE_DESCRIPTION || type.description;
      if (code && description) {
        milestoneDescMap[code] = description;
      }
    });

    return milestones.map((milestone) =>
      transformMilestoneData(milestone, milestoneDescMap),
    );
  } catch (error) {
    console.error("Error fetching milestones:", error);
    throw error;
  }
};

// Transform milestone data helper function
const transformMilestoneData = (apiMilestone, milestoneDescMap = {}) => {
  // Get milestone code from API response
  const milestoneCode =
    apiMilestone.MILESTONE_CODE ||
    apiMilestone.P_MILESTONE_CODE ||
    apiMilestone.code;

  // Get description from milestone types map, fallback to API data
  const milestoneDescription =
    milestoneDescMap[milestoneCode] ||
    apiMilestone.MILESTONE_NAME ||
    apiMilestone.title ||
    "Unnamed Milestone";

  // Transform API milestone data to match the expected format
  return {
    id: apiMilestone.MILESTONE_ID || apiMilestone.id,
    title: milestoneDescription,
    description: apiMilestone.MILESTONE_DESC || apiMilestone.description || "",
    date:
      apiMilestone.P_MILESTONE_DATE ||
      apiMilestone.MILESTONE_DATE ||
      apiMilestone.date ||
      new Date().toISOString(),
    remarks: apiMilestone.P_REMARKS || apiMilestone.REMARKS || "",
    location:
      apiMilestone.P_MILESTONE_LOCATION ||
      apiMilestone.MILESTONE_LOCATION ||
      "",
    status: getMilestoneStatus(apiMilestone),
    progress: apiMilestone.MILESTONE_PROGRESS || apiMilestone.progress || 0,
    // Keep raw data for reference
    raw: apiMilestone,
  };
};

// Get milestone status helper function
const getMilestoneStatus = (milestone) => {
  // Determine status based on API data
  const statusCode = milestone.MILESTONE_STATUS || milestone.status;

  if (
    statusCode === "C" ||
    statusCode === "completed" ||
    milestone.MILESTONE_PROGRESS >= 100
  ) {
    return "completed";
  } else if (
    statusCode === "P" ||
    statusCode === "in_progress" ||
    (milestone.MILESTONE_PROGRESS > 0 && milestone.MILESTONE_PROGRESS < 100)
  ) {
    return "in_progress";
  } else {
    return "pending";
  }
};

// Upload ship feedback attachment (multipart/form-data)
export const uploadShipFeedback = async (formData) => {
  try {
    const headers = {
      ...authService.getAuthHeader(),
      // Let axios set Content-Type with boundary for multipart
    };
    const response = await axios.post(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/UploadShipFeedback`,
      formData,
      { headers },
    );
    return response.data;
  } catch (error) {
    console.error("uploadShipFeedback error:", error);
    throw error;
  }
};

// Preview ship feedback (GET)
export const previewShipFeedback = async (jmain, jacat) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...authService.getAuthHeader(),
    };
    const response = await axios.get(
      `${BACKEND_BASE_URL}/CDLRequirmentManagement/ShipDetails/ShipFeedBackPreview`,
      { params: { jmain, jacat }, headers },
    );
    return response.data;
  } catch (error) {
    console.error("previewShipFeedback error:", error);
    throw error;
  }
};
