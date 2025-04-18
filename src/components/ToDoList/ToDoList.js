import React, { useState } from "react";

function ToDoList(){
    const [Todo,setTodo] = useState([])
    const [todoInput, setTodoInput] = useState("");
    const [check,setCheck] = useState(false)

    const updateTodo = () => {
        setCheck(!check)
        if (check) {
          if (input.trim() === "") {
            alert("Please enter a ToDo before adding it.");
            return;
          }
          setTodo([...Todo,todoInput]);
          setTodoInput("");
        }
    
      };

    return (
        <>
        <input value={todoInput} placeholder="Type a ToDo" onChange={(e) => setTodoInput(e.target.value)}/>
        <button onClick={updateTodo}>Add Todo</button>
        </>
    );
}

export default ToDoList;