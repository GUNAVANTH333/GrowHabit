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
    <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
      <button onClick={toggleMenu} style={ellipsisButtonStyle} aria-label="More options">
        ⋮
      </button>
      {isOpen && (
        <div style={menuStyle}>          
          <div onClick={() => handleAction('Delete')} style={menuItemStyle}>Delete</div>
          <div onClick={() => handleAction('Reset')} style={menuItemStyle}>Reset</div>
        </div>
      )}
    </div>
  );
}


const ellipsisButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '28px',
  cursor: 'pointer',
  padding: '4px',
  lineHeight: 1,
  color: '#333',
};

const menuStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  zIndex: 1,
};

const menuItemStyle = {
  padding: '8px 12px',
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  backgroundColor: '#fff',
};

export default EllipsisMenu;
