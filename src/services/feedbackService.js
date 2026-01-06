import api from "./api";

// Get feedback dates from backend
export const getFeedbackDates = async (jobCategory, projectNumber) => {
  try {
    const response = await api.get(
      "/CDLRequirmentManagement/Feedback/GetDates",
      {
        params: {
          P_JOB_CATEGORY: jobCategory,
          P_JMAIN: projectNumber,
        },
      }
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
    const response = await api.get(
      "/CDLRequirmentManagement/Feedback/GetDuration",
      {
        params: {
          p_job_category: jobCategory,
          p_jmain: jmain,
        },
      }
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
    const response = await api.get(
      "/CDLRequirmentManagement/Feedback/GetJmain",
      {
        params: {
          P_JOB_CATEGORY: jobCategory,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add feedback
export const addFeedback = async (feedbackData) => {
  try {
    const response = await api.post(
      "/CDLRequirmentManagement/Feedback/Addfeedback",
      feedbackData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Units and Descriptions
export const getUnitsDescriptions = async () => {
  try {
    const response = await api.get(
      "/CDLRequirmentManagement/Feedback/GetUnitsDescriptions"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add Milestone
export const addMilestone = async (milestoneData) => {
  try {
    const response = await api.post(
      "/CDLRequirmentManagement/Milestone/AddMilestone",
      milestoneData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all milestone types
export const getMilestoneTypes = async () => {
  try {
    const response = await api.get(
      "/CDLRequirmentManagement/Milestone/GetAllMilestoneTypes"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all feedback entries by ship
export const getAllFeedback = async (jobCategory, jmain) => {
  try {
    const response = await api.get(
      "/CDLRequirmentManagement/Feedback/GetFeedbacksbyShip",
      {
        params: {
          p_job_category: jobCategory,
          p_jmain: jmain,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
