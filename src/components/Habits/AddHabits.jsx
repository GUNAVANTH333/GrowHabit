import { useState, useEffect } from "react";
import "./Habits.css";
import InputHabit from "./Habits";
import EllipsisMenu from "./EllipsisMenu";
import Checkbox from '@mui/material/Checkbox';

function Habits() {
  const [habits, setNewHabit] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [addHabit, setAddHabit] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    window.dispatchEvent(new CustomEvent('habitsUpdated', { detail: habits }));
  }, [habits]);

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

    checkDate();
    
    const interval = setInterval(checkDate, 60000);
    return () => clearInterval(interval);
  }, []);

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
      const matchingSuggestion = suggestions.find(s => s.name.toLowerCase() === input.toLowerCase());
      const newHabit = {
        name: input,
        emoji: matchingSuggestion?.emoji || '📝',
        streak: 0,
        completed: false,
        id: Date.now()
      };
      
      setNewHabit(prevHabits => [...prevHabits, newHabit]);
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
        <h2 className="habits-title" style={{marginBottom: '18px', fontWeight: 700, fontSize: '2rem'}}>Daily Habits</h2>
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
          {habits.length === 0 ? (
            <div className="empty-state">
              <h3>Start Your Journey to Success! 🚀</h3>
              <p>Create your first habit and begin your path to personal growth.</p>
              <p>Small steps lead to big changes. What will you achieve today?</p>
            </div>
          ) : (
            habits.map((habit) => (
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
                  <span className="habit-name">
                    <span className="habit-emoji">{habit.emoji}</span>
                    {habit.name}
                  </span>
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Habits;
