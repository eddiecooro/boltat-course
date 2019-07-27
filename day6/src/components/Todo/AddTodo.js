import React from 'react';
import styles from './Todo.module.scss';

const AddTodo = React.memo(({ addTodo }) => {
  const [todoName, setTodoName] = React.useState('');

  const handleTodoNameChange = event => {
    setTodoName(event.target.value);
  };

  return (
    <div className={styles.addTodo}>
      <div className={styles.todoItem}>
        <span
          onClick={() => {
            addTodo(todoName);
            setTodoName('');
          }}>
          +
        </span>
        <input
          value={todoName}
          onChange={handleTodoNameChange}
          placeholder="Enter todo name..."
          type="text"
        />
      </div>
    </div>
  );
});

export default AddTodo;
