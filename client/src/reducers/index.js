import { combineReducers } from 'redux';
import tomoReducer from './tomoReducer';
import petReducer from './petReducer';

const rootReducer = combineReducers({
  tomo: tomoReducer,
  newPets: petReducer
});

export default rootReducer;
