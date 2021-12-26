import { all, fork } from "redux-saga/effects";
import {watchGetAllDogs,watchGetSubDogs,watchGetImgDogs} from './dog/index';

export default function* sagas() {
  yield all([
    fork(watchGetAllDogs),
    fork(watchGetSubDogs),
    fork(watchGetImgDogs)
  ]);
}