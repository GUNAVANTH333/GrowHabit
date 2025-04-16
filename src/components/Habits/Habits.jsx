import { useState,useEffect } from "react";


function InputHabit({input}) {
    const [data,setData] = useState([])

    useEffect(() => {
       fetch("/habits.json")
       .then((response) => response.json())
       .then((d) => setData(d))
    },[])
    if (input.trim() === "") {
      return;
    }
    const filteredHabits = data.filter((hab) =>
      hab.name.toLowerCase().includes(input.toLowerCase())
    );
    return (
        <>
          <div style={{ position: "relative" }}>
            <div className="dropdown_suggestions">
              {filteredHabits.map((item) => (
                <div key={item.id} className="dropdown_item">
                  {item.emoji} {item.name}
                </div>
              ))}
            </div>
          </div>
        </>
    );
}

export default InputHabit;