import {
  MARKETPLACE_GET_ALL_REQUEST,
  MARKETPLACE_GET_ALL_SUCCESS,
  MARKETPLACE_GET_ALL_FAILURE,
  MARKETPLACE_GET_REQUEST,
  MARKETPLACE_GET_SUCCESS,
  MARKETPLACE_GET_FAILURE,
  MARKETPLACE_CREATE_REQUEST,
  MARKETPLACE_CREATE_SUCCESS,
  MARKETPLACE_CREATE_FAILURE,
  MARKETPLACE_DELETE_REQUEST,
  MARKETPLACE_DELETE_SUCCESS,
  MARKETPLACE_DELETE_FAILURE,
} from '../../constants/marketplaceConstants';

import axios from 'axios';
import config from '../../config';

/* Get all feeds */
const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: MARKETPLACE_GET_ALL_REQUEST });
    const { data } = await axios.get(`${config.apiURL}/product`, {
      withCredentials: true,
    });
    dispatch({ type: MARKETPLACE_GET_ALL_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: MARKETPLACE_GET_ALL_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

const getProduct = (slug) => async (dispatch) => {
  try {
    dispatch({ type: MARKETPLACE_GET_REQUEST });
    const { data } = await axios.get(`${config.apiURL}/product/${slug}`, {
      withCredentials: true,
    });
    dispatch({ type: MARKETPLACE_GET_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: MARKETPLACE_GET_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

/* Create feed */
const addProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: MARKETPLACE_CREATE_REQUEST });
    const { data } = await axios.post(`${config.apiURL}/product`, product, {
      withCredentials: true,
    });
    dispatch({ type: MARKETPLACE_CREATE_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: MARKETPLACE_CREATE_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

const deleteProduct = (slug, imageId) => async (dispatch) => {
  try {
    dispatch({ type: MARKETPLACE_DELETE_REQUEST });
    const { data } = await axios.delete(`${config.apiURL}/product/${slug}`, {
      withCredentials: true,
    });
    dispatch({ type: MARKETPLACE_DELETE_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: MARKETPLACE_DELETE_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

export { getAllProduct, getProduct, addProduct, deleteProduct };
