import { Header } from "./components/Header";
import { Input } from "./components/Input";

import { ClipboardText , PlusCircle, Trash } from "phosphor-react";

import styles from "./App.module.css";
import { useState } from "react";

const TODO_LIST = [
  {
    id: 1,
    title: "Fazer café",
    isCompleted: false
  },
  {
    id: 2,
    title: "Estudar React",
    isCompleted: false
  },
  {
    id: 3,
    title: "Estudar Next",
    isCompleted: false
  }
];

function App() {
  const [todos, setTodos] = useState(TODO_LIST);
  const [inputValue, setInputValue] = useState("");

  function handleTodoClick(todoId: number) {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        };
      }

      return todo;
    });

    setTodos(newTodos);
  }

  function handleDeleteTodo(todoId: number) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(newTodos);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newTodo = {
      id: Math.random(),
      title: inputValue,
      isCompleted: false
    };

    setInputValue("");
    setTodos((state) => [...state, newTodo]);
  }

  const isCompletedCount = todos.filter((todo) => todo.isCompleted).length;
  const todosCount = todos.length;
  const completedBadgeText =
    todos.length === 0 ? 0 : `${isCompletedCount} de ${todosCount}`;

  return (
    <div>
      <Header />

      <main className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Adicione uma nova tarefa"
          />

          <button className={styles.submitButton} type="submit">
            Criar <PlusCircle size={18} />
          </button>
        </form>

        <div className={styles.todoListContainer}>
          <header className={styles.todoListHeader}>
            <div>
              Tarefas criadas <span>{todosCount}</span>
            </div>

            <div>
              Concluídas <span>{completedBadgeText}</span>
            </div>
          </header>

          {todosCount === 0 ? 
          <div className={styles.emptyTodoList}>
            <ClipboardText size={58} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div> 
          : <ul className={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                <div className={todo.isCompleted ? styles.completedTodo : ""}>
                  <input
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    checked={todo.isCompleted}
                    onClick={() => handleTodoClick(todo.id)}
                  />
                  <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
                </div>
                <Trash onClick={() => handleDeleteTodo(todo.id)} size={18} />
              </li>
            ))}
          </ul>}
        </div>
      </main>
    </div>
  );
}

export default App;
