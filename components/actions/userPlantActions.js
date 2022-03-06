import {
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
  USER_GET_USERPLANT_FAILURE,
} from "../../constants/userConstants";
import axios from "axios";
import config from "../../config";

const addUserPlant =
  ({ token, plantName, plantType }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_GET_USERPLANT_REQUEST });

      const { data } = await axios.post(
        `${config.apiURL}/user-plant/`,
        {
          token,
          plantName,
          plantType,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: USER_GET_USERPLANT_SUCCESS, payload: data });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: USER_GET_USERPLANT_FAILURE,
        payload: error?.response?.data?.message || error.message,
      });
      return Promise.reject(error?.response?.data?.message || error.message);
    }
  };

const getUserPlant = () => async (dispatch) => {
  try {
    dispatch({ type: USER_GET_USERPLANT_REQUEST });

    const { data } = await axios.get(`${config.apiURL}/user-plant/`, {
      withCredentials: true,
    });
    dispatch({ type: USER_GET_USERPLANT_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_GET_USERPLANT_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

const getServerUserPlant = async (req) => {
  const { data } = await axios.get(`${config.apiURL}/user-plant/`, {
    headers: {
      cookie: `refreshToken=${req?.cookies?.refreshToken}; accessToken=${req?.cookies?.accessToken};`,
    },
  });
  return data;
};

export { addUserPlant, getUserPlant, getServerUserPlant };
