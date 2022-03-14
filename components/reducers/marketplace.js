import {
  MARKETPLACE_GET_ALL_REQUEST,
  MARKETPLACE_GET_ALL_SUCCESS,
  MARKETPLACE_GET_ALL_FAILURE,
  MARKETPLACE_GET_REQUEST,
  MARKETPLACE_GET_SUCCESS,
  MARKETPLACE_GET_FAILURE,
  MARKETPLACE_CREATE_REQUEST,
  MARKETPLACE_CREATE_SUCCESS,
  MARKETPLACE_CREATE_FAILURE,
  MARKETPLACE_DELETE_REQUEST,
  MARKETPLACE_DELETE_SUCCESS,
  MARKETPLACE_DELETE_FAILURE,
} from '../../constants/marketplaceConstants';

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

const marketplaceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MARKETPLACE_GET_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MARKETPLACE_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: payload,
      };
    case MARKETPLACE_GET_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case MARKETPLACE_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MARKETPLACE_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: payload,
      };
    case MARKETPLACE_GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case MARKETPLACE_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MARKETPLACE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: payload,
      };
    case MARKETPLACE_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case MARKETPLACE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MARKETPLACE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: {},
      };
    case MARKETPLACE_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default marketplaceReducer;
