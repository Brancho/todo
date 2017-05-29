/*
  This is a combination of some generic reducers
  which can be used with any "resource".

  A "resource" is a model of data that is usually
  fetched from the API.
 */

import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import byId, * as fromById from './byId';
import idsList, * as fromIdsList from './idsList';
import status, * as fromStatus from './status';
import pagination, * as fromPagination from './pagination';
import filters, * as fromFilters from './filters';

export default (type) => combineReducers({
  byId: byId(type),
  idsList: idsList(type),
  status: status(type),
  pagination: pagination(type),
  filters: filters(type),
});

// Get one item in a state of this reducer
export const getEntity = (type, id) => createSelector(
  state => fromById.getEntity(state[type].byId, id),
  entity => { if (entity) return entity }
)


function getListSelection(object, state){
  const ids = Object.keys(object);
  const activeList = state.todos.filters.activeList;

  if(activeList === 'all'){
    return ids;
  }

  return ids.filter(function(id) {
    const todo = object[id];
    return todo.list === activeList;
  });

}


function getSelection(object, state){
  const filter = state.todos.filters.activeFilter;
  const listIds = getListSelection(object, state);
  return listIds.filter(function(id) {
    const todo = object[id];

    if (filter === 'all') {
      return true;
    } else if (filter == 'completed' && !!todo.completed) {
      return true;
    } else if (filter == 'active' && !todo.completed) {
      return true
    } else {
      return false
    }
  });

}

// Get all items in a state of this reducer
export const getEntities = (type) => createSelector(
  state => state,
  state => getSelection(fromIdsList.getIds(state[type].byId), state),
  (state, entitiesIds) => {
    if (entitiesIds) {
      return entitiesIds.map(id => fromById.getEntity(state[type].byId, id))
    }
  }
);

// Get child entities by its parent ID
export const getChildEntities = (childType, parentType, parentId) => createSelector(
  state => state,
  state => fromById.getEntity(state[parentType].byId, parentId),
  (state, parent) => {
    if (parent && parent[childType]) {
      return parent[childType].map(id => fromById.getEntity(state[childType].byId, id))
    }
  }
)

export const isLoading = (state, type) => fromStatus.isLoading(state[type].status);

export const getErrors = (state, type) => fromStatus.getErrors(state[type].status);

export const getPagination = (state, type) => fromPagination.getPagination(state[type].pagination);
export const getActiveFilter = (state, type) => fromFilters.getActiveFilter(state[type].activeFilter);
