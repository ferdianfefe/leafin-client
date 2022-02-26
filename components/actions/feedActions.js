import {
  FEED_GET_ALL_REQUEST,
  FEED_GET_ALL_SUCCESS,
  FEED_GET_ALL_FAILURE,
  FEED_GET_REQUEST,
  FEED_GET_SUCCESS,
  FEED_GET_FAILURE,
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAILURE,
} from "../../constants/feedConstant";

import axios from "axios";
import config from "../../config";

/* Get all feeds */
const getAllFeeds = (page, limit, selectedFilters) => async (dispatch) => {
  try {
    dispatch({ type: FEED_GET_ALL_REQUEST });
    const { data } = await axios.get(`${config.apiURL}/feed`, {
      params: {
        page,
        limit,
        tags: selectedFilters,
      },
      withCredentials: true,
    });
    dispatch({ type: FEED_GET_ALL_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: FEED_GET_ALL_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

/* Get one feed */
const getFeed = (slug) => async (dispatch) => {
  try {
    dispatch({ type: FEED_GET_REQUEST });
    const { data } = await axios.get(`${config.apiURL}/feed/${slug}`, {
      withCredentials: true,
    });
    dispatch({ type: FEED_GET_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: FEED_GET_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

/* Create feed */
const createFeed = (feed) => async (dispatch) => {
  try {
    dispatch({ type: FEED_CREATE_REQUEST });
    const { data } = await axios.post(`${config.apiURL}/feed`, feed, {
      withCredentials: true,
    });
    dispatch({ type: FEED_CREATE_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: FEED_CREATE_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

export { getAllFeeds, getFeed, createFeed };
