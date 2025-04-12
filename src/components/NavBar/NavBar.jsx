import "./NavBar.css"
function NavBar() {
    return(
        <>
        <div className="nav">
            <div>
                <ul className="nav-links">
                    <li className="links">Habits</li>
                    <li className="links">Pending Habits</li>
                    <li className="links">Tasks</li>
                </ul>
            </div>
        </div>
        </>
    )
}
export default NavBar;