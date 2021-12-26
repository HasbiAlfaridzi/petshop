import { combineReducers } from "redux";
import {getAllDogs,getSubDogs,getImgDogs} from './dog/index';

const allReducers = combineReducers({
  getAllDogs,
  getSubDogs,
  getImgDogs
});
export default allReducers;