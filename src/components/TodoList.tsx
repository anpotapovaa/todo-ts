import { Todo } from "types/todo";
import { TodoItem } from "./TodoItem";
import "../styles/app.css";


interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) { //массив задач, функция для переключения, функция удаления. Перебирает компонент, и каждый эедемент создаёт TodoItem, ключи - не забывать
  return (
    <ul className="list-item">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
