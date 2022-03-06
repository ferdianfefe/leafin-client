import {
  USER_GET_ALL_USERPLANT_LOG_FAILURE,
  USER_GET_ALL_USERPLANT_LOG_REQUEST,
  USER_GET_ALL_USERPLANT_LOG_SUCCESS,
  USER_GET_ONE_USERPLANT_LOG_REQUEST,
  USER_GET_ONE_USERPLANT_LOG_SUCCESS,
  USER_GET_ONE_USERPLANT_LOG_FAILURE,
} from "../../constants/userConstants";

const initialState = {
  isLoading: false,
  error: null,
  logs: null,
};

const logsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_GET_ALL_USERPLANT_LOG_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_GET_ALL_USERPLANT_LOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        logs: payload,
      };
    case USER_GET_ALL_USERPLANT_LOG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: payload,
      };
    case USER_GET_ONE_USERPLANT_LOG_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_GET_ONE_USERPLANT_LOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        log: payload,
      };
    case USER_GET_ONE_USERPLANT_LOG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default logsReducer;
