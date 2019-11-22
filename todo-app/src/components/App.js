import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const url = 'http://localhost:5000/todos';

const App = () => {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState(null);

    //GET
    const getTodos = async () => {
        const result = await Axios.get(url);
        const { data } = result;
        setTodos(data);
    };

    //POST
    const postTodos = async (e) => {
        e.preventDefault();
        console.log('todo작성 시작');
        const sample = {
            //TODO: UNIQ. KEY
            id: todos.length + 1,
            content: todo,
            completed: false
        };
        const result = await Axios.post(url, sample);
        const { data } = result;
        //이렇게만 하면 sample을 front에 보여주지 못함

        //setTodos를 통해서 state값을 조정하여 새로 랜더링
        setTodos([...todos, data]);
        setTodo('');
    };

    // TODO : patch, 체크박스 온 체인지
    const pachCompleted = async() =>{

    };

    //DELETE
    const deleteTodos = async(id)=>{
        await Axios.delete(url + `/${id}`);
        const targetTodo = todos.find(el => el.id === id);
        const idx = todos.indexOf(targetTodo);
        todos.splice(idx,1); //todos 바뀜! > react
        setTodos([...todos]); // react setTodos > todos.splice

    };

    //react가 mount 되었을때 딱 한번 불러온다
    useEffect(() => {
        getTodos();
    }, []); //빈 배열을 넣어주어야 1회만 불러줌

    const ViewTodos = (todos) => {
        return todos.map(el => {
            return (
                <li key={el.id}>
                    <input type="checkbox" />
                    <span>{el.content}</span>
                    <button onClick={() => {deleteTodos(el.id)}}>x</button>
                </li>
            )
        })
    }
    return (

        <>
            <h1>Todo front</h1>
            <form onSubmit={postTodos}>
                <input type="text" onChange={e => {
                    setTodo(e.target.value)
                }} value={todo} />
                <button type="submit">등록</button>
            </form>
            {todos ? <ul>{ViewTodos(todos)}</ul> : <div>Spinner</div>}
        </>
    );
};

export default App;