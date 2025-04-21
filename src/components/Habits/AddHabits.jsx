import { useState } from "react";
import "./Habits.css";
import InputHabit from "./Habits";
import EllipsisMenu from "./EllipsisMenu";

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
  <div className="habit-header">
    <h1>Hello, GoodMorning User</h1>
    {addHabit ? (
      <div className="add-habit-container">
        <input
          className="habit_input"
          value={input}
          placeholder="Type new Habit..."
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="add_habit" onClick={updateHabits}>
          Add a New Habit
        </button>
      </div>
    ) : (
      <button className="add_habit" onClick={updateHabits}>
        Add a New Habit
      </button>
    )}
  </div>

  {addHabit && (
    <InputHabit
      input={input}
      habits={habits}
      setNewHabit={setNewHabit}
      setInput={setInput}
      addHabit={addHabit}
      setAddHabit={setAddHabit}
    />
  )}

  <div className="habit-list">
    {habits.map((habit, index) => (
      <div className="habit_element">
      <div
        key={index}
        onClick={() => handleHabitClick(index)}
      >
        {habit.name}
        <span className="streak_counter">{habit.streak}</span>
      </div>
      <EllipsisMenu 
      onReset={() => {
        const updatedHabits = [...habits];
        updatedHabits[index].streak = 0;
        setNewHabit(updatedHabits);
      }}
      onDelete = {() => {
        const updatedHabits = habits.filter((_, i) => i !== index);
        setNewHabit(updatedHabits);
      }}
      />
      </div>
    ))}
  </div>
</div>

    </>
  );
}

export default Habits;
