import Tracker from "./components/Tracker/Tracker.jsx";
import NavBar from "./components/NavBar/NavBar.jsx"
import "./App.css"
function App() {
    return (
        <>
        <NavBar/>
        <div id="main">
            <Tracker/>
        </div>
        </>
    )
}

export default App;