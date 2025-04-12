import "./NavBar.css"
function NavBar() {
    return(
        <>
        <div className="nav">
            <div>
                <div className="nav-links">
                    <a className="links">Habits</a>
                    <a className="links">Pending Habits</a>
                    <a className="links">Tasks</a>
                </div>
            </div>
        </div>
        </>
    )
}
export default NavBar;