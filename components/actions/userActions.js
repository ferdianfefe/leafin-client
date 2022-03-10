import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_GET_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_SET_QUIZ_STATUS_REQUEST,
  USER_SET_QUIZ_STATUS_SUCCESS,
  USER_SET_QUIZ_STATUS_FAILURE,
} from "../../constants/userConstants";
import axios from "axios";
import config from "../../config";

const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });

    const { data } = await axios.post(
      `${config.apiURL}/user/signin`,
      { email, password },
      { withCredentials: true }
    );

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: { data: data.message } });

    return Promise.resolve(data.message);
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

const signup = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const { data } = await axios.post(
      `${config.apiURL}/user/signup`,
      { email, password },
      { withCredentials: true }
    );

    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

/* Get user profile */
const getProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_GET_PROFILE_REQUEST });

    const { data } = await axios.get(`${config.apiURL}/user/`, {
      withCredentials: true,
    });
    dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_GET_PROFILE_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

// Get User Profile with SSR Method
const getServerProfile = async (req) => {
  const { data } = await axios.get(`${config.apiURL}/user/`, {
    headers: {
      cookie: `refreshToken=${req?.cookies?.refreshToken}; accessToken=${req?.cookies?.accessToken};`,
    },
  });
  return data;
};

/* Update user profile */
const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { data } = await axios.patch(`${config.apiURL}/user/`, formData, {
      withCredentials: true,
    });

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
    return Promise.reject(error.response.data.message);
  }
};

const selectPicture = (picture) => async (dispatch) => {
  dispatch({ type: USER_SELECT_IMAGE, payload: picture });
  return Promise.resolve();
};

const setQuizStatus = () => async (dispatch) => {
  try {
    dispatch({ type: USER_SET_QUIZ_STATUS_REQUEST });

    const { data } = await axios.post(
      `${config.apiURL}/user/quiz/`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({ type: USER_SET_QUIZ_STATUS_SUCCESS, payload: data.data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_SET_QUIZ_STATUS_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

export {
  signin,
  signup,
  getProfile,
  updateProfile,
  selectPicture,
  getServerProfile,
  setQuizStatus,
};
