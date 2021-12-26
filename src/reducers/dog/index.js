import {
    GET_ALL_DOGS_ERROR,
    GET_ALL_DOGS_PROSES,
    GET_ALL_DOGS_SUCCESS,
    GET_SUB_DOGS_ERROR,
    GET_SUB_DOGS_PROSES,
    GET_SUB_DOGS_SUCCESS,
    GET_IMG_DOGS_ERROR,
    GET_IMG_DOGS_PROSES,
    GET_IMG_DOGS_SUCCESS,
  } from "../../actions/dog/index";
  
  const initState = {
    result: null,
    loading: false
  };

  const initStates = {
    result: [],
    loading: false
  };
  
  export function getAllDogs(state = initStates, action) {
    switch (action.type) {
      case GET_ALL_DOGS_PROSES:
        return {
          ...initStates,
          loading: true,
          error: null,
          result: []
        };
      case GET_ALL_DOGS_SUCCESS:
        return {
          ...state,
          result: action.result,
          loading: false,
          error: null
        };
      case GET_ALL_DOGS_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
          result: null
        };
      default:
        return state;
    }
  }

  export function getSubDogs(state = initStates, action) {
    switch (action.type) {
      case GET_SUB_DOGS_PROSES:
        return {
          ...initStates,
          loading: true,
          error: null,
          result: []
        };
      case GET_SUB_DOGS_SUCCESS:
        return {
          ...state,
          result: action.result,
          loading: false,
          error: null
        };
      case GET_SUB_DOGS_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
          result: null
        };
      default:
        return state;
    }
  }

  export function getImgDogs(state = initStates, action) {
    switch (action.type) {
      case GET_IMG_DOGS_PROSES:
        return {
          ...initStates,
          loading: true,
          error: null,
          result: []
        };
      case GET_IMG_DOGS_SUCCESS:
        return {
          ...state,
          result: action.result,
          loading: false,
          error: null
        };
      case GET_IMG_DOGS_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
          result: null
        };
      default:
        return state;
    }
  }