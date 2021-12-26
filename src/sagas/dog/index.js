import { takeLatest, put } from "redux-saga/effects";
import {
  GET_ALL_DOGS_ERROR,
  GET_ALL_DOGS_SUCCESS,
  GET_ALL_DOGS_PROSES,
  GET_SUB_DOGS_ERROR,
  GET_SUB_DOGS_SUCCESS,
  GET_SUB_DOGS_PROSES,
  GET_IMG_DOGS_ERROR,
  GET_IMG_DOGS_PROSES,
  GET_IMG_DOGS_SUCCESS
} from "../../actions/dog";
import { filterFetch } from "../../utils/apiFetch";

function* getAllDogs() {
  try {
    const result = yield filterFetch('http://dog.ceo/api/breeds/list/all', {
      method: 'GET',
    });
    yield put({
      type: GET_ALL_DOGS_SUCCESS,
      result: result
    });
  } catch (error) {
    yield put({
      type: GET_ALL_DOGS_ERROR,
      error: error
    });
  }
}

function* getSubDogs(data) {
  try {
    const result = yield filterFetch('https://dog.ceo/api/breed/'+data.data+'/list', {
      method: 'GET',
    });
    yield put({
      type: GET_SUB_DOGS_SUCCESS,
      result: result
    });
  } catch (error) {
    yield put({
      type: GET_SUB_DOGS_ERROR,
      error: error
    });
  }
}

function* getImgDogs(data) {
  try {
    const result = yield filterFetch('https://dog.ceo/api/breed/'+data.data+'/images', {
      method: 'GET',
    });
    yield put({
      type: GET_IMG_DOGS_SUCCESS,
      result: result
    });
  } catch (error) {
    yield put({
      type: GET_IMG_DOGS_ERROR,
      error: error
    });
  }
}

export function* watchGetAllDogs() {
  yield takeLatest(GET_ALL_DOGS_PROSES, getAllDogs);
}

export function* watchGetSubDogs() {
  yield takeLatest(GET_SUB_DOGS_PROSES, getSubDogs);
}

export function* watchGetImgDogs() {
  yield takeLatest(GET_IMG_DOGS_PROSES, getImgDogs);
}