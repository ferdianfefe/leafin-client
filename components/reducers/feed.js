import {
  FEED_GET_ALL_REQUEST,
  FEED_GET_ALL_SUCCESS,
  FEED_GET_ALL_FAILURE,
  FEED_GET_REQUEST,
  FEED_GET_SUCCESS,
  FEED_GET_FAILURE,
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAILURE,
  FEED_GET_TAGS_REQUEST,
  FEED_GET_TAGS_SUCCESS,
  FEED_GET_TAGS_FAILURE,
} from "../../constants/feedConstants";

const initialState = {
  feeds: [],
  tags: [],
  feed: {},
  loading: false,
  error: null,
};

const feedReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FEED_GET_ALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FEED_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        feeds: payload,
      };
    case FEED_GET_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FEED_GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FEED_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        feed: payload,
      };
    case FEED_GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FEED_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FEED_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        feed: payload,
      };
    case FEED_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FEED_GET_TAGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FEED_GET_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tags: payload,
      };
    case FEED_GET_TAGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default feedReducer;
