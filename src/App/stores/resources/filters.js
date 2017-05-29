import createReducer from '../utils/createReducer'

import t from './actions/constants'

export const defaultState = {
  activeFilter: 'all',
  activeList: 'all'
};

export default (type) => createReducer({
  initialState: defaultState,

  [t.SET_ACTIVE_FILTER]: (state, {payload: term, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return {
      ...state,
      activeFilter: term
    }
  },

  [t.SET_ACTIVE_LIST]: (state, {payload: term, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return {
      ...state,
      activeList: term
    }
  },

  [t.RESET_RESOURCE]: (state, {payload: entities, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return defaultState;
  }
});


export const getActiveFilter = state => state.activeList;
export const getActiveList = state => state.activeFilter;
export const getFilters = state => state;
