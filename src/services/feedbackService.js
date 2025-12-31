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
