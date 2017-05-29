import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import todos from './todos'
import lists from './lists'
import filters from './filters'

export default combineReducers({
  todos,
  lists,
  filters,
  form: formReducer
});
