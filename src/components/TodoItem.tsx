import {Todo} from '../types/todo'
import "../styles/app.css";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void; //переключение состояния 
    onDelete: (id:string) => void; //удаление задачи
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span className={todo.completed ? "done" : ""}>
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </li>
  );
}
