import React, {useState,useEffect} from 'react';
import Axios from 'axios';

const url = 'http://localhost:5000/todos';

const App = () =>{
    const [todos, setTodos] = useState(null);

    //GET
    const getTodos = async () =>{
        const result = await Axios.get(url);
        const { data } = result;
        setTodos(data);
    };

    //POST
    const postTodos = async () =>{
        console.log('todo작성 시작');
        const sample = {
            //TODO: UNIQ. KEY
            id : todos.length +1,
            content: "react.js"
        };
        const result = await Axios.post(url, sample);
        const {data} = result;
        //이렇게만 하면 sample을 front에 보여주지 못함

        //setTodos를 통해서 state값을 조정하여 새로 랜더링
        setTodos([...todos,data]);
    };

    //react가 mounte 되었을때 딱 한번 불러온다
    useEffect(()=> {
        getTodos();
    },[]); //빈 배열을 넣어주어야 1회만 불러줌

    return(
        <>
        <h1>Todo front</h1>
        <form>
            <input type="text" />
            <button type="button" onClick={postTodos}>등록</button>
        </form>
        {todos ?
         todos.map(el =>(<div key={el.id}>{el.content}</div>))
          : <div>Spinner</div>}
        </>
    );
};

export default App;