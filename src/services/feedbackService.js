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

// Submit feedback
// export const submitFeedback = async (feedbackData) => {
//   try {
//     const response = await api.post('/CDLRequirmentManagement/Feedback/Submit', feedbackData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
