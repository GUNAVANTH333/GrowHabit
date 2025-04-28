import Tracker from "./components/Tracker/Tracker.jsx";
import Habits from "./components/Habits/AddHabits.jsx";
import ToDoList from "./components/ToDoList/ToDoList.jsx";
import SideBar from "./components/SideBar.jsx";
import WeatherWidget from "./components/WeatherWidget.jsx";
import "./App.css"

function App() {
    return (
        <div className="app-container">
            <SideBar />
            <div className="main-content-grid">
                <div className="weather-grid">
                    <WeatherWidget/>
                </div>
                <div className="habits-grid">
                    <Habits/>
                </div>
                <div className="todo-grid">
                    <ToDoList/>
                </div>
                {/* Optionally add Tracker below or elsewhere */}
                {/* <div className="tracker-grid"><Tracker/></div> */}
            </div>
        </div>
    )
}

export default App;