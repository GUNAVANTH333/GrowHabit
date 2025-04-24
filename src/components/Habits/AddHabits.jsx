import { useState, useEffect } from "react";
import "./Habits.css";
import InputHabit from "./Habits";
import EllipsisMenu from "./EllipsisMenu";
import Checkbox from '@mui/material/Checkbox';

function Habits() {
  const [habits, setNewHabit] = useState([]);
  const [addHabit, setAddHabit] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load habits from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setNewHabit(JSON.parse(savedHabits));
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Check and reset completed status at midnight
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const lastReset = localStorage.getItem('lastResetDate');
      const today = now.toDateString();

      if (lastReset !== today) {
        setNewHabit(prevHabits => 
          prevHabits.map(habit => ({
            ...habit,
            completed: false
          }))
        );
        localStorage.setItem('lastResetDate', today);
      }
    };

    checkDate(); // Check on mount
    
    // Check every minute for date change
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load habit suggestions
  useEffect(() => {
    fetch('/habits.json')
      .then(response => response.json())
      .then(data => setSuggestions(data))
      .catch(error => console.error('Error loading habit suggestions:', error));
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name);
    setShowSuggestions(false);
  };

  const updateHabits = () => {
    setAddHabit(!addHabit);
    if (addHabit) {
      if (input.trim() === "") {
        alert("Please enter a Habit before adding it.");
        return;
      }
      setNewHabit([...habits, { 
        name: input, 
        streak: 0,
        completed: false,
        id: Date.now()
      }]);
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleHabitComplete = (id) => {
    setNewHabit(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === id) {
          const newCompleted = !habit.completed;
          return {
            ...habit,
            completed: newCompleted,
            streak: newCompleted ? habit.streak + 1 : habit.streak - 1
          };
        }
        return habit;
      })
    );
  };

  return (
    <>
      <div id="habits-main">
        <div className="habit-header">
          {addHabit ? (
            <div className="add-habit-container">
              <div className="input-wrapper">
                <input
                  className="habit_input"
                  value={input}
                  placeholder="Type new Habit..."
                  onChange={handleInputChange}
                />
                {showSuggestions && (
                  <div className="dropdown_suggestions">
                    {suggestions
                      .filter(suggestion => 
                        suggestion.name.toLowerCase().includes(input.toLowerCase())
                      )
                      .map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="dropdown_item"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion.emoji} {suggestion.name}
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
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

        <div className="habit-list">
          {habits.map((habit) => (
            <div 
              key={habit.id}
              className={`habit_element ${habit.completed ? 'completed' : ''}`}
            >
              <div className="habit-content">
                <Checkbox
                  checked={habit.completed || false}
                  onChange={() => handleHabitComplete(habit.id)}
                  sx={{
                    color: '#F4B183',
                    '&.Mui-checked': {
                        color: '#F4B183',
                    },
                }}
                />
                <span className="habit-name">{habit.emoji} {habit.name}</span>
                <span className="streak_counter">{habit.streak}</span>
                <EllipsisMenu 
                  onReset={() => {
                    setNewHabit(prevHabits => 
                      prevHabits.map(h => 
                        h.id === habit.id ? { ...h, streak: 0 } : h
                      )
                    );
                  }}
                  onDelete={() => {
                    setNewHabit(prevHabits => 
                      prevHabits.filter(h => h.id !== habit.id)
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Habits;
