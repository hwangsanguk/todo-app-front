import React, {useState,useEffect} from 'react';
import Axios from 'axios';

const url = 'http://localhost:5000/todos';

const App = () =>{
    const [todos, setTodos] = useState(null);

    //GET
    const getTodos = async () =>{
        console.log('todo list 가져오기');
        const result = await Axios.get(url);
        const { data } = result;
        setTodos(data);
    };

    //react가 mounte 되었을때 딱 한번 불러온다
    useEffect(()=> {
        getTodos();
    },[]);

    return(
        <>
        <h1>front</h1>
        {todos ?
         todos.map(el =>(<div key={el.id}>{el.content}</div>))
          : <div>Spinner</div>}
        </>
    );
};

export default App;