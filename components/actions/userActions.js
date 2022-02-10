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
} from "../../constants/userConstants";
import axios from "axios";
import config from "../../config";

const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });

    const res = await axios.post(
      `${config.apiURL}/user/signin`,
      { email, password },
      { withCredentials: true }
    );
    console.log(res);
    const data = res.data;

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAILURE,
      payload: error.response.data.message,
    });
    return Promise.reject(error.response.data.message);
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
      payload: error.response.data.message,
    });
    return Promise.reject(error.response.data.message);
  }
};

/* Get user profile */
const getProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_GET_PROFILE_REQUEST });
    // const res = await fetch(`${config.apiURL}/user/`, {
    //   method: 'GET',
    //   credentials: 'include',
    // });

    // const data = await res.json();

    const { data } = await axios.get(`${config.apiURL}/user/`, {
      withCredentials: true,
    });
    dispatch({ type: USER_GET_PROFILE_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_GET_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
    return Promise.reject(error.response.data.message);
  }
};

/* Update user profile */
const updateProfile =
  (name = null, email = null, password = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const { data } = await axios.patch(
        `${config.apiURL}/user/`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

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

export { signin, signup, getProfile, updateProfile, selectPicture };
