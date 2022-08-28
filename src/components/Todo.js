import { useState, useEffect } from 'react';
import { useAuth } from './Context';

function Todo() {
  const [todos, setTodos] = useState([]);
  const { token } = useAuth();

  const getTodos = () => {
    const api = 'https://todoo.5xcamp.us/todos';
    fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'applicaiton/json',
        'authorization': token,
      }
    })
      .then(response => response.json())
      .then(response => setTodos(response.todos));
  }

  useEffect(() => {
    getTodos();
  }, []);
  
  return (
    <main>
      <h2>代辦清單</h2>
      <ul>
        {
          todos.map((item, index) => <li key={index}>{item.content}</li>)
        }
      </ul>
    </main>
  );
}

export default Todo;