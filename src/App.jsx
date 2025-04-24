import Tracker from "./components/Tracker/Tracker.jsx";
import Habits from "./components/Habits/AddHabits.jsx";
import ToDoList from "./components/ToDoList/ToDoList.jsx";
import SideBar from "./components/SideBar.jsx";
import "./App.css"

function App() {
    return (
        <div className="app-container">
            <SideBar />
            <div className="main-content">
                <div className="greetings">
                    <h1>Hello, GoodMorning User</h1>
                </div>
                <Habits/>
                <ToDoList/>
            </div>
        </div>
    )
}

export default App;