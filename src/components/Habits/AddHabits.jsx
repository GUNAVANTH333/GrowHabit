import { useState } from "react";
import "./Habits.css";
import InputHabit from "./Habits";

function Habits() {
  const [habits, setNewHabit] = useState([]);
  const [addHabit,setAddHabit] = useState(false)
  const [input, setInput] = useState("");

  const updateHabits = () => {
    setAddHabit(!addHabit)
    if (addHabit) {
      if (input.trim() === "") {
        alert("Please enter a Habit before adding it.");
        return;
      }
      setNewHabit([...habits, { name: input, streak: 0 }]);
      setInput("");
    }

  };

  const handleHabitClick = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].streak += 1;
    setNewHabit(updatedHabits);
  };

  return (
    <>
    <div id="habits-main">
      <h1>Hello, GoodMorning User</h1>
      {addHabit ? <div><input
        className="habit_input"
        value={input}
        placeholder="Type new Habit..."
        onChange={(event) => setInput(event.target.value)
        }
        /> 
        <button className="add_habit" onClick={updateHabits}>Add a New Habit</button>
        <InputHabit input={input} habits={habits} setNewHabit={setNewHabit} setInput={setInput} addHabit={addHabit} setAddHabit={setAddHabit}/>
        </div>
        :
      <button className="add_habit" onClick={updateHabits}>Add a New Habit</button>}
      <ul className="habit-list">
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
      </div>
    </>
  );
}

export default Habits;
