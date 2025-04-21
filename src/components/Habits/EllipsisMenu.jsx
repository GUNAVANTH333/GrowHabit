import React, { useState, useRef, useEffect } from 'react';

function EllipsisMenu({ onReset ,onDelete}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleAction = (action) => {
    if (action === 'Reset') {
      onReset();
    }
    if (action === 'Delete') {
      onDelete();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
      <div className="ellipsis-menu-container" ref={menuRef}>
        <button onClick={toggleMenu} className="ellipsis-button" aria-label="More options">
          ⋮
        </button>
        {isOpen && (
          <div className="ellipsis-dropdown">
            <div onClick={() => handleAction('Delete')} className="ellipsis-item">Delete</div>
            <div onClick={() => handleAction('Reset')} className="ellipsis-item">Reset</div>
          </div>
        )}
      </div>

  );
}

export default EllipsisMenu;
