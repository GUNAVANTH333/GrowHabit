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
        {filteredHabits.map((item) => (
              <ul>
              <li key={item.id}>{item.emoji} {item.name}</li>
              </ul>
            ))}
        </>
    );
}

export default InputHabit;