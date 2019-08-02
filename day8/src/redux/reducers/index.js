import todoReducer from './todosReducer';
import { combineReducers } from 'redux';
import filterReducer from './filterReducer';

export default combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

export const selectors = {
  getFilteredTodos: state => {
    return state.todos.filter(todo => {
      switch (state.filter) {
        case 'ALL':
          return true;
        case 'DONE':
          return todo.done;
        case 'UNDONE':
          return !todo.done;
      }
    });
  }
};
