import { useState } from "react";
import MyCalendar from "./Calendar";

function SideBar() {
    const getCurrentDate = () => {
        const now = new Date();
        const date = now.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const time = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return `${date}, ${time}`;
    };

    const getDayOfWeek = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    };

    return (
        <div id="sidebar-main">
            <div className="sidebar-content">
                <div className="greeting">
                    <h1>Happy {getDayOfWeek()} 👋</h1>
                    <p>{getCurrentDate()}</p>
                </div>

                <div className="sidebar-calendar">
                    <MyCalendar/>
                </div>
            </div>
        </div>
    );
}

export default SideBar;