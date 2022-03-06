import {
  USER_GET_ALL_USERPLANT_LOG_REQUEST,
  USER_GET_ALL_USERPLANT_LOG_SUCCESS,
  USER_GET_ALL_USERPLANT_LOG_FAILURE,
  USER_GET_ONE_USERPLANT_LOG_REQUEST,
  USER_GET_ONE_USERPLANT_LOG_SUCCESS,
  USER_GET_ONE_USERPLANT_LOG_FAILURE,
} from "../../constants/userConstants";
import axios from "axios";
import config from "../../config";

const getAllPlantsLogs = () => async (dispatch) => {
  try {
    dispatch({ type: USER_GET_ALL_USERPLANT_LOG_REQUEST });

    const { data } = await axios.get(`${config.apiURL}/log/allplants`, {
      withCredentials: true,
    });
    dispatch({ type: USER_GET_ALL_USERPLANT_LOG_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_GET_ALL_USERPLANT_LOG_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

const getPlantLog = (plantId) => async (dispatch) => {
  try {
    dispatch({ type: USER_GET_ONE_USERPLANT_LOG_REQUEST });

    const { data } = await axios.get(`${config.apiURL}/log/one/${plantId}`, {
      withCredentials: true,
    });
    dispatch({ type: USER_GET_ONE_USERPLANT_LOG_SUCCESS, payload: data.data });

    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: USER_GET_ONE_USERPLANT_LOG_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

const getServerAllPlantsLogs = async (req) => {
  const { data } = await axios.get(`${config.apiURL}/log/allplants`, {
    headers: {
      cookie: `refreshToken=${req?.cookies?.refreshToken}; accessToken=${req?.cookies?.accessToken};`,
    },
  });
  return data;
};

export { getPlantLog, getAllPlantsLogs, getServerAllPlantsLogs };
