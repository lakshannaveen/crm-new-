import toast from "react-hot-toast";
import axios from "axios";
import {
  GET_SHIPS_REQUEST,
  GET_SHIPS_SUCCESS,
  GET_SHIPS_FAILURE,
  SET_SELECTED_SHIP_JMAIN,
  GET_SHIP_DETAILS_REQUEST,
  GET_SHIP_DETAILS_SUCCESS,
  GET_SHIP_DETAILS_FAILURE,
  ADD_SHIP_REQUEST,
  ADD_SHIP_SUCCESS,
  ADD_SHIP_FAILURE,
  UPDATE_SHIP_REQUEST,
  UPDATE_SHIP_SUCCESS,
  UPDATE_SHIP_FAILURE,
  FETCH_SHIPS_REQUEST,
  FETCH_SHIPS_SUCCESS,
  FETCH_SHIPS_FAILURE,
  GET_SHIP_IMAGE_REQUEST,
  GET_SHIP_IMAGE_SUCCESS,
  GET_SHIP_IMAGE_FAILURE,
  UPLOAD_SHIP_IMAGE_REQUEST,
  UPLOAD_SHIP_IMAGE_SUCCESS,
  UPLOAD_SHIP_IMAGE_FAILURE,
} from "../constants/shipActionTypes";
import { shipService } from "../services/shipService";
import { authService } from "../services/authService";

export const fetchOwnerShips = (serviceNo) => async (dispatch) => {
  dispatch({ type: FETCH_SHIPS_REQUEST });

  try {
    const ships = await shipService.getShips(serviceNo);
    dispatch({ type: FETCH_SHIPS_SUCCESS, payload: ships });
  } catch (error) {
    dispatch({
      type: FETCH_SHIPS_FAILURE,
      payload: error.message,
    });
  }
};

// Get all ships for current user
export const getShips = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHIPS_REQUEST });

    // Get serviceNo from logged-in user
    const { auth } = getState();
    const serviceNo = auth.user?.serviceNo;

    if (!serviceNo) {
      throw new Error("User service number not found. Please log in again.");
    }

    const ships = await shipService.getShips(serviceNo);

    dispatch({
      type: GET_SHIPS_SUCCESS,
      payload: ships,
    });
  } catch (error) {
    dispatch({
      type: GET_SHIPS_FAILURE,
      payload: error.message,
    });
    toast.error(error.message || "Failed to load ships");
  }
};

// Set selected ship JMAIN in localStorage
export const setSelectedShipJmain = (jmainNo) => (dispatch) => {
  if (jmainNo) {
    localStorage.setItem("SELECTED_SHIP_JMAIN", jmainNo);
    dispatch({
      type: SET_SELECTED_SHIP_JMAIN,
      payload: jmainNo,
    });
  }
};

// Get ship details by ID
export const getShipDetails = (jmainNo) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHIP_DETAILS_REQUEST });

    // Get serviceNo from logged-in user
    const { auth } = getState();
    const serviceNo = auth.user?.serviceNo;

    if (!serviceNo) {
      throw new Error("User service number not found. Please log in again.");
    }

    // If jmainNo not provided, try to get from localStorage
    const jmain = jmainNo || localStorage.getItem("SELECTED_SHIP_JMAIN");

    if (!jmain) {
      throw new Error(
        "Ship JMAIN number not found. Please select a ship first.",
      );
    }

    const ship = await shipService.getShipDetails(serviceNo, jmain);

    dispatch({
      type: GET_SHIP_DETAILS_SUCCESS,
      payload: ship,
    });
  } catch (error) {
    dispatch({
      type: GET_SHIP_DETAILS_FAILURE,
      payload: error.message,
    });
    toast.error(error.message || "Failed to load ship details");
  }
};

// Add new ship
export const addShip = (shipData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SHIP_REQUEST });

    const newShip = await shipService.addShip(shipData);

    dispatch({
      type: ADD_SHIP_SUCCESS,
      payload: newShip,
    });

    toast.success("Ship added successfully");
  } catch (error) {
    dispatch({
      type: ADD_SHIP_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to add ship");
  }
};

// Update ship
export const updateShip = (shipId, shipData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SHIP_REQUEST });

    const updatedShip = await shipService.updateShip(shipId, shipData);

    dispatch({
      type: UPDATE_SHIP_SUCCESS,
      payload: updatedShip,
    });

    toast.success("Ship updated successfully");
  } catch (error) {
    dispatch({
      type: UPDATE_SHIP_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to update ship");
  }
};

// Fetch ship image with auth header
export const fetchShipImage = (imageUrl, jmainNo) => async (dispatch) => {
  if (!imageUrl || !imageUrl.startsWith("http")) {
    // Return null for local/missing images - let components use placeholder
    dispatch({
      type: GET_SHIP_IMAGE_SUCCESS,
      payload: { jmainNo, url: null },
    });
    return null;
  }

  dispatch({ type: GET_SHIP_IMAGE_REQUEST });

  try {
    const response = await axios.get(imageUrl, {
      headers: authService.getAuthHeader(),
      responseType: "blob",
    });

    const objectUrl = URL.createObjectURL(response.data);

    dispatch({
      type: GET_SHIP_IMAGE_SUCCESS,
      payload: { jmainNo, url: objectUrl },
    });

    return objectUrl;
  } catch (error) {
    console.error("Failed to fetch ship image", error);
    dispatch({
      type: GET_SHIP_IMAGE_FAILURE,
      payload: error.message,
    });
    return null;
  }
};

// Upload ship image
export const uploadShipImage = (jmainNo, file) => async (dispatch) => {
  dispatch({ type: UPLOAD_SHIP_IMAGE_REQUEST });

  try {
    await shipService.uploadShipImage(jmainNo, file);

    dispatch({ type: UPLOAD_SHIP_IMAGE_SUCCESS });

    // After successful upload, refetch the image to update the cache
    const imageUrl = shipService.getShipImage({ SHIP_JMAIN: jmainNo });
    if (imageUrl) {
      dispatch(fetchShipImage(imageUrl, jmainNo));
    }

    toast.success("Ship image uploaded successfully");
  } catch (error) {
    console.error("Failed to upload ship image", error);
    dispatch({
      type: UPLOAD_SHIP_IMAGE_FAILURE,
      payload: error.message,
    });
    toast.error("Failed to upload ship image");
  }
};
