import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TodoCard from './TodoCard';
import AddButton from './AddButton';

const url = 'http://localhost:5000/todos';


const ListWrapper = () => {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState(null);

    const UniqKey = () => {
        if (todos && todos.length) {
            return todos[todos.length - 1].id + 1;
        } else {
            return 0;
        };
    };
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
            id: UniqKey(),
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
    const patchCompleted2 = async (id, e, idx) => {
        console.log(e.target.checked); //e.target.checked 를 받아옴
        todos[idx].completed = e.target.checked;//
        setTodos([...todos]);
        await Axios.patch(url + `/${id}`, { completed: e.target.checked });
    };
    //강사님
    const patchCompleted = async (id) => {
        console.log(id)
        const targetTodo = todos.find(el => el.id === id);
        //DB수정
        await Axios.patch(url + `/${id}`, {
            completed: !targetTodo.completed
        });
        //target
        targetTodo.completed = !targetTodo.completed;
        setTodos([...todos])
    };

    //DELETE
    const deleteTodos = async (id) => {
        await Axios.delete(url + `/${id}`);
        const targetTodo = todos.find(el => el.id === id);
        const idx = todos.indexOf(targetTodo);
        todos.splice(idx, 1); //todos 바뀜! > react
        setTodos([...todos]); // react setTodos > todos.splice

    };

    //react가 mount 되었을때 딱 한번 불러온다
    useEffect(() => {
        getTodos();
    }, []); //빈 배열을 넣어주어야 1회만 불러줌

    // const ViewTodos = (todos) => {
    //     return todos.map((el,idx) => {
    //         return (
    //             <li key={el.id}>
    //                 <input type="checkbox" onChange={(e)=>{
    //                     patchCompleted(el.id,e,idx)
    //                 }} checked={el.completed}/>
    //                 <span>{el.content}</span>
    //                 <button onClick={() => {deleteTodos(el.id)}}>x</button>
    //             </li>
    //         )
    //     })
    // }
    return (
        <>
            <h1>Todo front</h1>

            {/* <form onSubmit={postTodos}>
                <input type="text" onChange={e => {
                    setTodo(e.target.value)
                }} value={todo} />
                <button type="submit">등록</button>
            </form> */}

            <AddButton postTodos={postTodos} setTodo={setTodo} todo={todo} />
            {todos ? <TodoCard todos={todos} patchCompleted={patchCompleted} deleteTodos={deleteTodos} /> : <div>Spinner</div>}
        </>
    )
}


export default ListWrapper;