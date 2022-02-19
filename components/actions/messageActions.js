import {
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAILURE,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_FAILURE,
} from "../../constants/messageConstant";
import axios from "axios";
import config from "../../config";

/* Send message from user */
const sendMessage = (message) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_SEND_REQUEST });
    const { data } = await axios.post(
      `${config.apiURL}/message`,
      { message },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: MESSAGE_SEND_SUCCESS, payload: data.data });
    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: MESSAGE_SEND_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

const getUserMessages = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_GET_REQUEST });
    const { data } = await axios.get(`${config.apiURL}/message`, {
      params: { page, limit },
      withCredentials: true,
    });
    dispatch({ type: MESSAGE_GET_SUCCESS, payload: data.data });
    return Promise.resolve(data.data);
  } catch (error) {
    dispatch({
      type: MESSAGE_GET_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
    return Promise.reject(error?.response?.data?.message || error.message);
  }
};

export { sendMessage, getUserMessages };
