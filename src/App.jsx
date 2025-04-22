import Tracker from "./components/Tracker/Tracker.jsx";
import Habits from "./components/Habits/AddHabits.jsx";
import ToDoList from "./components/ToDoList/ToDoList.jsx";
import "./App.css"

function App() {
    return (
        <>
        <div id="main">
          <div className="greetings">
            <h1>Hello, GoodMorning User</h1>
          </div>
          <Habits/>
          <ToDoList/>
        </div>
        </>
    )
}

export default App;