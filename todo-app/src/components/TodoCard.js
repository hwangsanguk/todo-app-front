import React from 'react';

const TodoCard = (props) => {
  console.log(props)
  return (
    <ul>
      {props.todos.map(el => {
        return (
          <li key={el.id}>
            <input type="checkbox" onChange={() => {props.patchCompleted(el.id)}} checked={el.completed}/>
            <span>{el.content}</span>
            <button onClick={() => {props.deleteTodos(el.id)}}>X</button>
          </li>
        )})}
    </ul>
  );
};

export default TodoCard;