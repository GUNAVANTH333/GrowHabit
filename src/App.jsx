import Tracker from "./components/Tracker/Tracker.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Habits from "./components/Habits/AddHabits.jsx";
import ToDoList from "./components/ToDoList/ToDoList.jsx";
import "./App.css"

function App() {
    return (
        <>
        <NavBar/>
        <div id="main">
            <Habits/>
            <ToDoList/>
        </div>
        </>
    )
}

export default App;