import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  return (
    <div className="container">
      <h1>TODO-LIST</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input 
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className="input-btn"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <li>
      {todo.content}
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className="modify-btn"
        onClick={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
        }}
      >
        수정
      </button>
      <button className="delete-btn"
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
