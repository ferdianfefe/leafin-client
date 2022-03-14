import {
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
  USER_GET_USERPLANT_FAILURE,
  USER_CREATE_USERPLANT_REQUEST,
  USER_CREATE_USERPLANT_SUCCESS,
  USER_CREATE_USERPLANT_FAILURE,
  USER_DELETE_USERPLANT_REQUEST,
  USER_DELETE_USERPLANT_SUCCESS,
  USER_DELETE_USERPLANT_FAILURE,
} from '../../constants/userConstants';

const initialState = {
  isLoading: false,
  error: null,
  plants: null,
};

const plantReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_CREATE_USERPLANT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_CREATE_USERPLANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        plants: payload,
      };
    case USER_CREATE_USERPLANT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case USER_GET_USERPLANT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_GET_USERPLANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        plants: payload,
      };
    case USER_GET_USERPLANT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: payload,
      };
    case USER_DELETE_USERPLANT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_DELETE_USERPLANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case USER_DELETE_USERPLANT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default plantReducer;
