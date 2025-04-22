import React, { useState } from "react";

function ToDoList(){
    const [Todo,setTodo] = useState([])
    const [todoInput, setTodoInput] = useState("");
    const [check,setCheck] = useState(false)

    const updateTodo = () => {
        setCheck(!check)
        if (check) {
          if (todoInput.trim() === "") {
            alert("Please enter a ToDo before adding it.");
            return;
          }
          setTodo([...Todo,{text: todoInput, id: Date.now()}]);
          setTodoInput("");
        }
      };
    const handleRemove = (id) => {
        setTodo(Todo.filter((item) => item.id !== id))
      };
    return (
        <>
        <div id="todo-main">
        {check ? 
          <div>
            <input
            className="habit_input"
            value={todoInput} placeholder="Type a ToDo" onChange={(e) => setTodoInput(e.target.value)}/>
            <button className="add_habit" onClick={updateTodo}>Add Todo</button>
          </div> 
          :
          <button className="add_habit" onClick={updateTodo}>Add Todo</button>
        }
          <ul className="habit-list">
              {Todo.map((item, index) => 
                <li
                  onClick={()=>handleRemove(item.id)}
                  key={index}
                  className="habit_element"
                >
                  {item.text}
                </li>
              )}
          </ul>
        </div>
        </>
    );
}

export default ToDoList;