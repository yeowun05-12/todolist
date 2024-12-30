import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 0, content: '아침먹기', time: new Date() },
    { id: 1, content: '모던 자바스크립트 책읽기', time: new Date() },
    { id: 2, content: '영어 공부하기', time: new Date() },
  ]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <Header />
      <InputValue addTodo={addTodo} />
      <TodoList todos={todos} />
    </>
  );
}

const Header = () => {
  return (
    <>
      <h1>TO DO LIST</h1>
    </>
  );
};

const InputValue = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        content: inputValue,
        time: new Date(),
      };
      addTodo(newTodo);
      setInputValue('');
    }
  };

  return (
    <>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button onClick={handleAdd}>추가</button>
    </>
  );
};

const TodoList = ({ todos }) => {
  return (
    <>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            {todo.content}
            <button onClick={() => {}}>수정</button>
            <button>삭제</button>
            <label htmlFor='/'>
              <input type='checkBox' /> 완료
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
