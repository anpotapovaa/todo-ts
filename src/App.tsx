import React, { useReducer } from "react";
import {Header} from "./components/Header";
import {AddTodo} from "./components/AddTodo";
import {TodoList} from "./components/TodoList";
import { Todo } from "./types/todo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./styles/app.css";

/**
 * Reducer actions — строго типизированы
 */
type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "SET"; payload: Todo[] };

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload.id);
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

export default function App() {
  // Загружаем из localStorage (через наш хук)
  const [saved, setSaved] = useLocalStorage<Todo[]>("todos:v1", []);

  // Инициализация reducer начальным состоянием из localStorage
  const [todos, dispatch] = useReducer(todosReducer, saved);

  // Синхронизируем reducer state обратно в localStorage — вызываем setSaved
  React.useEffect(() => {
    setSaved(todos);
  }, [todos, setSaved]);

  // добавление нового туду
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: cryptoRandomId(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD", payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE", payload: { id } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const clearAll = () => {
    // простой способ очистить — перезаписать массив
    dispatch({ type: "SET", payload: [] });
  };

  return (
    <div className="app-container">
      <Header title="Todo (TypeScript + Vite)" />
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

      <div className="buttons">
        <div>{todos.length} item(s)</div>
        <div>
          <button onClick={() => window.location.reload()}>Reload page</button>
          <button onClick={clearAll}>Clear all</button>
        </div>
      </div>
    </div>
  );
}

/** маленькая утилита для id — использует web crypto, fallback простая */
function cryptoRandomId() {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2, 9);
  }
}
