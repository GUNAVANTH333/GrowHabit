import React from 'react';
import './NavBar.css';

const NavBar = () => {
  const username = localStorage.getItem('username');

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">GrowHabit</div>
        {username && (
          <div className="navbar-username">
            Welcome, {username}
        </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar; 