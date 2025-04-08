import { useState } from "react";
import "./Tracker.css";

function Tracker() {
  const [habits, setNewHabit] = useState([]);
  const [input, setInput] = useState("");

  const updateHabits = () => {
    if (input.trim() === "") {
      alert("Please enter a Habit before adding it.");
      return;
    }
    setNewHabit([...habits, { name: input, streak: 0 }]);
    setInput("");
  };

  const handleHabitClick = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].streak += 1;
    setNewHabit(updatedHabits);
  };

  return (
    <>
      <h1>Create A new Habit</h1>
      <input
        value={input}
        placeholder="Type new Habit..."
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={updateHabits}>Add Habit</button>
      <ul>
        {habits.map((habit, index) => (
          <li
            key={index}
            className="habit_element"
            onClick={() => handleHabitClick(index)}
          >
            {habit.name}
            <span className="streak_counter">{habit.streak}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tracker;
