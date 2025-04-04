import { useState } from "react";

function Tracker() {
    const [habits,setNewHabit] = useState(0)
    return (
        <>
        <div className="add_habit">
            <button onClick={setNewHabit(habits+1)}></button>
        </div>
        </>
    );
}