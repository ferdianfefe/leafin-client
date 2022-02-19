import {
  USER_GET_USERPLANT_FAILURE,
  USER_GET_USERPLANT_REQUEST,
  USER_GET_USERPLANT_SUCCESS,
} from '../../constants/userConstants';

const initialState = {
  isLoading: false,
  error: null,
  plants: null,
};

const plantReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return state;
  }
};

export default plantReducer;
