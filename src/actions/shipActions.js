import toast from 'react-hot-toast';
import {
  GET_SHIPS_REQUEST,
  GET_SHIPS_SUCCESS,
  GET_SHIPS_FAILURE,
  GET_SHIP_DETAILS_REQUEST,
  GET_SHIP_DETAILS_SUCCESS,
  GET_SHIP_DETAILS_FAILURE,
  ADD_SHIP_REQUEST,
  ADD_SHIP_SUCCESS,
  ADD_SHIP_FAILURE,
  UPDATE_SHIP_REQUEST,
  UPDATE_SHIP_SUCCESS,
  UPDATE_SHIP_FAILURE,
} from '../constants/actionTypes';
import { shipService } from '../services/shipService';

// Get all ships for current user
export const getShips = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIPS_REQUEST });

    const ships = await shipService.getShips();

    dispatch({
      type: GET_SHIPS_SUCCESS,
      payload: ships,
    });
  } catch (error) {
    dispatch({
      type: GET_SHIPS_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to load ships');
  }
};

// Get ship details by ID
export const getShipDetails = (shipId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIP_DETAILS_REQUEST });

    const ship = await shipService.getShipDetails(shipId);

    dispatch({
      type: GET_SHIP_DETAILS_SUCCESS,
      payload: ship,
    });
  } catch (error) {
    dispatch({
      type: GET_SHIP_DETAILS_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to load ship details');
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

    toast.success('Ship added successfully');
  } catch (error) {
    dispatch({
      type: ADD_SHIP_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to add ship');
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

    toast.success('Ship updated successfully');
  } catch (error) {
    dispatch({
      type: UPDATE_SHIP_FAILURE,
      payload: error.message,
    });
    toast.error('Failed to update ship');
  }
};