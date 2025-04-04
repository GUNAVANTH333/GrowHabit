import { useState } from "react";
import "./Tracker.css"
function Tracker() {
    const [habits,setNewHabit] = useState(0)
    const updateHabits = () => {
        setNewHabit(habits+1)
    }
    return (
        <>
        <div className="add_habit">
            <h1>Create A new Habit</h1>
            <button onClick={updateHabits}>Add New Habit</button>
        </div>
        </>
    );
}
export default Tracker;