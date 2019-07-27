import React from 'react';
import styles from './Todo.module.scss';
import TodoListItem from './TodoListItem';
import AddTodo from './AddTodo';

const TodoList = () => {
  const id = React.useRef(3);
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      name: 'Buy milk',
      date: new Date(),
      done: true
    },
    {
      id: 2,
      name: 'Buy pizza',
      date: new Date(),
      done: false
    }
  ]);
  const [filter, setFilter] = React.useState('ALL');
  const filteredTodos = React.useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'ALL':
          return true;
        case 'DONE':
          return todo.done;
        case 'UNDONE':
          return !todo.done;
      }
    });
  }, [filter, todos]);

  const addTodo = React.useCallback(name => {
    if (name.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: id.current++,
          name,
          done: false,
          date: new Date()
        }
      ]);
    }
  }, []);

  const editTodo = React.useCallback((todoId, newName) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id !== todoId ? todo : { ...todo, name: newName }
      )
    );
  }, []);

  const removeTodo = React.useCallback(todoId => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    }
  }, []);

  const toggleTodo = React.useCallback(todoId => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id !== todoId ? todo : { ...todo, done: !todo.done }
      )
    );
  }, []);

  const applyFilter = type => () => {
    setFilter(type);
  };

  return (
    <div className={styles.container}>
      {filteredTodos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          editName={editTodo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      ))}
      <AddTodo addTodo={addTodo} />
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

export default TodoList;
