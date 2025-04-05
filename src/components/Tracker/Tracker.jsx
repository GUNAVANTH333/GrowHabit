import { useState } from "react";
import "./Tracker.css"
function Tracker() {
    const [habits,setNewHabit] = useState({})
    const updateHabits = () => {
        setNewHabit()
    }
    return (
        <>
        <h1>Create A new Habit</h1>
        <div id="add_habit">
            <input placeholder="Enter new Habit..."/>
            <button onClick={updateHabits}>Add</button>
        </div>
        </>
    );
}
export default Tracker;