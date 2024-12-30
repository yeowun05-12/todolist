import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 0, content: '아침먹기', isCompleted: false },
    {
      id: 1,
      content: '모던 자바스크립트 책읽기',
      time: new Date(),
      isCompleted: false,
    },
    { id: 2, content: '영어 공부하기', isCompleted: false },
  ]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // 현재 시간

  return (
    <div className='container'>
      <CurrentTime />
      <Header />
      <InputValue addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

const Header = () => {
  return (
    <>
      <h1>TO DO LIST</h1>
    </>
  );
};

// 시간을 표시하기 위한 컨포넌트

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); //1초마다 갱신이 됨

    // 컨포넌트 언마운트 시 interval을 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div>
        <p> 현재 시간 : {currentTime.toLocaleTimeString()}</p>
      </div>
    </>
  );
};

// 인풋에 밸류값들어오면 추가할 수 있게 만든 로직
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

const TodoList = ({ todos, setTodos }) => {
  const [editedId, setEditedId] = useState(null);

  // 삭제 하는 함수 로직
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //완료 체크 하는 로직
  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };
  return (
    <>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
            }}
          >
            {editedId === todo.id ? (
              <>
                <input
                  type='text'
                  defaultValue={todo.content}
                  onChange={(e) => {
                    todo.content = e.target.value;
                  }}
                />
                <button
                  onClick={() => {
                    setEditedId(null);
                  }}
                >
                  저장
                </button>
              </>
            ) : (
              <>
                {todo.content}
                <button
                  onClick={() => {
                    setEditedId(todo.id);
                  }}
                >
                  수정
                </button>
              </>
            )}
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
            <label>
              <input
                type='checkBox'
                checked={todo.isCompleted}
                onChange={() => toggleCompletion(todo.id)}
              />
              완료
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
