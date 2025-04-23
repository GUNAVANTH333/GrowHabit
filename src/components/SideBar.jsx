import { useState } from "react";
import MyCalendar from "./Calendar";
function SideBar() {
    return (
        <>
            <div id="sidebar-main">
                <div className="sidebar-calendar">
                    <MyCalendar/>
                </div>
            </div>
        </>
    );
}

export default SideBar;