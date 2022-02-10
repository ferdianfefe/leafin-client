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
  USER_SELECT_PICTURE,
} from "../../constants/userConstants";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  user: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        user: payload,
      };
    case USER_SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: payload,
      };
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: null,
        user: payload,
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: payload,
      };
    case USER_GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: payload,
      };
    case USER_GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: payload,
      };
    case USER_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case USER_SELECT_PICTURE:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: {
          ...state.user,
          selectedPicture: payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
