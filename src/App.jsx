import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tracker from "./components/Tracker/Tracker.jsx";
import Habits from "./components/Habits/AddHabits.jsx";
import ToDoList from "./components/ToDoList/ToDoList.jsx";
import SideBar from "./components/SideBar.jsx";
import WeatherWidget from "./components/WeatherWidget.jsx";
import NavBar from "./components/NavBar.jsx";
import Login from "./components/Login/Login.jsx";
import "./App.css";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        isAuthenticated ? 
                        <Navigate to="/" replace /> : 
                        <Login />
                    } 
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <>
                                <NavBar />
                                <div className="app-container">
                                    <SideBar />
                                    <div className="main-content-grid">
                                        <div className="weather-grid">
                                            <WeatherWidget />
                                        </div>
                                        <div className="habits-grid">
                                            <Habits />
                                        </div>
                                        <div className="todo-grid">
                                            <ToDoList />
                                        </div>
                                        <div className="tracker-grid">
                                            <Tracker />
                                        </div>
                                    </div>
                                </div>
                            </>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;