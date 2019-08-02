import React from 'react';
import { connect } from 'react-redux';
import * as todoActions from '../../redux/actionCreators/todoActions';
import styles from './Todo.module.scss';
import TodoListItem from './TodoListItem';
import AddTodo from './AddTodo';
import { selectors } from '../../redux/reducers/index';
import { setFilter } from '../../redux/actionCreators/filterActions';

const TodoList = ({ todos, filter, setFilter }) => {
  const applyFilter = type => () => {
    setFilter(type);
  };

  return (
    <div className={styles.container}>
      {todos.map(todo => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
      <AddTodo />
      <div className={styles.filters}>
        <button disabled={filter === 'ALL'} onClick={applyFilter('ALL')}>
          All
        </button>
        <button disabled={filter === 'DONE'} onClick={applyFilter('DONE')}>
          Done
        </button>
        <button disabled={filter === 'UNDONE'} onClick={applyFilter('UNDONE')}>
          Undone
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todos: selectors.getFilteredTodos(state)
  };
};
export default connect(
  mapStateToProps,
  { setFilter }
)(TodoList);
