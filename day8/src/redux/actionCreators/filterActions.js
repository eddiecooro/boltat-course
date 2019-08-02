import { SET_FILTER } from '../actionTypes';

export function setFilter(filterName) {
  return {
    type: SET_FILTER,
    name: filterName
  };
}
