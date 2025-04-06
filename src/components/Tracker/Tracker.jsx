import { useState } from "react";
import "./Tracker.css"
function Tracker() {
    const [habits,setNewHabit] = useState([])
    const [input,setInput] = useState('')
    const updateHabits = () => {
        if (input.trim() === '') {
            alert('Please enter a Habit before adding it.');
            return;
        }
        setNewHabit([...habits,input])
        console.log(habits)
        setInput('')
    }
    return (
        <>
        <h1>Create A new Habit</h1>
        <input value= {input} placeholder="Type new Habit..." onChange={(event) => setInput(event.target.value)}></input>

        <button onClick={updateHabits}>Add Habit</button>
        <ul>
        {habits.map((i) => {
            return <li className="habit_element">{i}</li>
        })}
        </ul>
        </>
    );
}
export default Tracker;