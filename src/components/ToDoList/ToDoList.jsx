import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import "./TodoList.css";

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");
    const [isInputVisible, setIsInputVisible] = useState(false);

    const addTodo = () => {
        if (todoInput.trim() === "") {
            alert("Please enter a ToDo before adding it.");
            return;
        }
        setTodos([...todos, {
            id: Date.now(),
            text: todoInput,
            completed: false,
            dateAdded: new Date()
        }]);
        setTodoInput("");
        setIsInputVisible(false);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        }));
        setTimeout(() => {
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id || !todo.completed));
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div id="todo-main">
            <div className="todo-header">
                <h2>Today's Tasks</h2>
                {isInputVisible ? (
                    <div className="todo-input-container">
                        <input
                            className="todo-input"
                            value={todoInput}
                            placeholder="Type a task"
                            onChange={(e) => setTodoInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                        <button className="add-todo-btn" onClick={addTodo}>
                            Add Task
                        </button>
                    </div>
                ) : (
                    <button className="add-todo-btn" onClick={() => setIsInputVisible(true)}>
                        Add Task
                    </button>
                )}
            </div>

            <ul className="todo-list">
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <h3>Ready to Conquer the Day! 💪</h3>
                        <p>Add your first task and start making progress.</p>
                        <p>Every task completed is a step towards your goals.</p>
                    </div>
                ) : (
                    todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                        >
                            <div className="todo-content">
                                <Checkbox
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    sx={{
                                        color: '#F4B183',
                                        '&.Mui-checked': {
                                            color: '#F4B183',
                                        },
                                    }}
                                />
                                <span className="todo-text">{todo.text}</span>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default ToDoList;