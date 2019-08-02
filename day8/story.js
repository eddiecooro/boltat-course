const { createStore, combineReducers } = require('redux');
// import { createStore, combineReducers } from 'redux';

// actionTypes
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

// actionCreator
function addTodo(todoName) {
  return {
    type: ADD_TODO,
    name: todoName
  };
}
function deleteTodo(todoName) {
  return {
    type: DELETE_TODO,
    name: todoName
  };
}
function toggleTodo(todoName) {
  return {
    type: TOGGLE_TODO,
    name: todoName
  };
}

// reducers
const todosReducer = (todos = [], action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [...todos, { name: action.name, done: false }];
    }
    case DELETE_TODO: {
      return todos.filter(todo => todo.name !== action.name);
    }
    case TOGGLE_TODO: {
      return todos.map(todo =>
        todo.name === action.name ? { ...todo, done: !todo.done } : todo
      );
    }
    default: {
      return todos;
    }
  }
};

const countersReducer = (counter = 0, action) => {
  switch (action.type) {
    case ADD_TODO:
      return counter + 1;
    case DELETE_TODO:
      return counter - 1;
    default:
      return counter;
  }
};

// store
const store = createStore(
  combineReducers({
    counter: countersReducer,
    todos: todosReducer
  })
);

store.subscribe(() => console.log('new state:', store.getState()));

store.dispatch(addTodo('Buy'));
store.dispatch(addTodo('Buy2'));
store.dispatch(deleteTodo('Buy2'));
store.dispatch(toggleTodo('Buy'));
store.dispatch(deleteTodo('Buy'));

// function createStore(reducer) {
//   let state = reducer(undefined, {});
//   const subscribs = [];

//   return {
//     getState: () => state,
//     subscribe: fn => {
//       subscribs.push(fn);
//     },
//     dispatch: action => {
//       state = reducer(state, action);
//       subscribs.forEach(fn => fn());
//     }
//   };
// }

// function combineReducers(obj) {
//   return (state = {}, action) => {
//     return Object.keys(obj).reduce((prev, current) => {
//       return {
//         ...prev,
//         [current]: obj[current](state[current], action)
//       };
//     }, {});
//   };
// }

// const combinedReducer = combineReducers({
//   counter: countersReducer,
//   todos: todosReducer
// });
// const store = createStore(combinedReducer);
