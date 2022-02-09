import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from "../../constants/userConstants";
import axios from "axios";
import config from "../../config";

const signin = (email, password) => async (dispath) => {
  try {
    dispath({ type: USER_SIGNIN_REQUEST });

    const { data } = await axios.post(
      `${config.apiURL}/user/signin`,
      { email, password },
      { withCredentials: true }
    );
    console.log(data);

    dispath({ type: USER_SIGNIN_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispath({
      type: USER_SIGNIN_FAILURE,
      payload: error.response.data.message,
    });
    return Promise.reject(error.response.data.message);
  }
};

const signup = (email, password) => async (dispath) => {
  try {
    dispath({ type: USER_SIGNUP_REQUEST });

    const { data } = await axios.post(
      `${config.apiURL}/user/signup`,
      { email, password },
      { withCredentials: true }
    );

    dispath({ type: USER_SIGNUP_SUCCESS, payload: data });

    return Promise.resolve(data);
  } catch (error) {
    dispath({
      type: USER_SIGNUP_FAILURE,
      payload: error.response.data.message,
    });
    return Promise.reject(error.response.data.message);
  }
};

export { signin, signup };
