import React from 'react';
import styles from './Todo.module.scss';

const TodoListItem = React.memo(
  ({ todo, toggleTodo, removeTodo, editName: editTodo }) => {
    const [editing, setEditing] = React.useState(false);
    const [newName, setNewName] = React.useState(todo.name);
    const nameInput = React.useRef(null);

    React.useEffect(() => {
      if (editing && nameInput.current) {
        nameInput.current.focus();
      }
    }, [editing]);

    const updateName = () => {
      editTodo(todo.id, newName);
      setEditing(false);
    };

    return editing ? (
      <>
        <div className={styles.editTodo}>
          <div
            className={`${styles.todoItem} ${todo.done ? styles.checked : ''}`}>
            <span onClick={updateName}>✓</span>
            <input
              ref={nameInput}
              value={newName}
              onChange={event => setNewName(event.target.value)}
              type="text"
            />
          </div>
        </div>
      </>
    ) : (
      <>
        <div
          className={`${styles.todoItem} ${todo.done ? styles.checked : ''}`}>
          <label htmlFor="done">Done</label>
          <input
            name="done"
            type="checkbox"
            checked={todo.done}
            onChange={() => {
              toggleTodo(todo.id);
            }}
          />
          <div className={styles.todoDescriptions}>
            <h3 className={styles.todoName}>{todo.name}</h3>
            <p className={styles.todoDate}>
              ({new Intl.DateTimeFormat('en-US').format(todo.date)})
            </p>
          </div>
          <div className={styles.todoActions}>
            <button onClick={() => setEditing(true)} className={styles.edit}>
              Edit
            </button>
            <button
              onClick={() => removeTodo(todo.id)}
              className={styles.delete}>
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default TodoListItem;
