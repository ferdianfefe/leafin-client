import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from '../../constants/userConstants';

const initialState = [];

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
    case USER_GET_PROFILE:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
