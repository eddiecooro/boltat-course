import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO } from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { name: action.name, id: action.id, done: false, date: action.date }
      ];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, name: action.name } : todo
      );
    default:
      return state;
  }
};
