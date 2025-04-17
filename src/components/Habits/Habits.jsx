import { useState, useEffect } from "react";

function InputHabit({ input,habits,setNewHabit,setInput }) {
  const [data, setData] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);

  useEffect(() => {
    fetch("/habits.json")
      .then((response) => response.json())
      .then((d) => setData(d));
  }, []);

  useEffect(() => {
    if (input.trim() !== "") {
      const filtered = data.filter((hab) =>
        hab.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredHabits(filtered);
    } else {
      setFilteredHabits([]);
    }
  }, [input, data]);

  const handleSuggestionClick = (emoji,habitName) => {
    setNewHabit([...habits,{ name: emoji+habitName , streak: 0}]);
    setInput("")
  };

  return (
    <>
      {input.trim() !== "" && (
        <div style={{ position: "relative" }}>
          <div className="dropdown_suggestions">
            {filteredHabits.map((item) => (
              <div
                key={item.id}
                className="dropdown_item"
                onClick={() => handleSuggestionClick(item.emoji,item.name)}
              >
                {item.emoji} {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default InputHabit;
