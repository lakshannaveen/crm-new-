import toast from "react-hot-toast";
import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECT_DETAILS_REQUEST,
  GET_PROJECT_DETAILS_SUCCESS,
  GET_PROJECT_DETAILS_FAILURE,
  UPDATE_PROJECT_PROGRESS_REQUEST,
  UPDATE_PROJECT_PROGRESS_SUCCESS,
  UPDATE_PROJECT_PROGRESS_FAILURE,
  GET_MILESTONES_REQUEST,
  GET_MILESTONES_SUCCESS,
  GET_MILESTONES_FAILURE,
} from "../constants/projectActionTypes";
import { projectService } from "../services/projectService";

// Get all projects
export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECTS_REQUEST });
    const projects = await projectService.getProjects();
    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: projects,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECTS_FAILURE,
      payload: error.message,
    });
    toast.error(error.message || "Failed to load projects");
  }
};

// Get project details by ID
export const getProjectDetails = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECT_DETAILS_REQUEST });
    const project = await projectService.getProjectDetails(projectId);
    dispatch({
      type: GET_PROJECT_DETAILS_SUCCESS,
      payload: project,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_DETAILS_FAILURE,
      payload: error.message,
    });
    toast.error(error.message || "Failed to load project details");
  }
};

// Update project progress
export const updateProjectProgress =
  (projectId, progress) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROJECT_PROGRESS_REQUEST });
      const updatedProject = await projectService.updateProjectProgress(
        projectId,
        progress
      );
      dispatch({
        type: UPDATE_PROJECT_PROGRESS_SUCCESS,
        payload: updatedProject,
      });
      toast.success("Project progress updated successfully");
    } catch (error) {
      dispatch({
        type: UPDATE_PROJECT_PROGRESS_FAILURE,
        payload: error.message,
      });
      toast.error(error.message || "Failed to update project progress");
    }
  };

// Get milestones by ship
export const getMilestonesByShip = (jobCategory, jmain) => async (dispatch) => {
  try {
    dispatch({ type: GET_MILESTONES_REQUEST });

    if (!jobCategory || !jmain) {
      throw new Error("Job category and JMAIN are required");
    }

    const milestones = await projectService.getMilestonesByShip(
      jobCategory,
      jmain
    );

    dispatch({
      type: GET_MILESTONES_SUCCESS,
      payload: milestones,
    });
  } catch (error) {
    dispatch({
      type: GET_MILESTONES_FAILURE,
      payload: error.message,
    });
    toast.error(error.message || "Failed to load milestones");
  }
};
