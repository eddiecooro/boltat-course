import { SET_FILTER } from '../actionTypes';

export default (state = 'ALL', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.name;
    default:
      return state;
  }
};
