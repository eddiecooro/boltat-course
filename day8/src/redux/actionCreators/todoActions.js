import { ADD_TODO, DELETE_TODO, EDIT_TODO, TOGGLE_TODO } from '../actionTypes';

let id = 0;
export function addTodo(name) {
  return {
    type: ADD_TODO,
    id: id++,
    name,
    date: Number(new Date())
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id
  };
}

export function editTodo(id, newName) {
  return {
    type: EDIT_TODO,
    id,
    name: newName
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

export function autoToggle(id) {
  return function(dispatch) {
    /*
      dispatch(requestStart())
      fetch(url).then(res => res.json()).then(res => dispatch(requestSuccess(res))).catch(err => requestFailed(err))
    */
    setInterval(() => {
      dispatch(toggleTodo(id));
    }, 1000);
  };
}
