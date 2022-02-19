import {
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAILURE,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_FAILURE,
} from "../../constants/messageConstant";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  messages: [],
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MESSAGE_SEND_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case MESSAGE_SEND_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case MESSAGE_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case MESSAGE_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        messages: payload,
      };
    case MESSAGE_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default messageReducer;
