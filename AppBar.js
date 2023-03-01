import React from 'react'
import '../css/appbar.css'

function AppBar({ onNavClick }) {
  const handleNavClick = () => {
    onNavClick();
  };

  return (
    
    <div className='appbar'>
        <div className='spacer' />
        <i className='material-symbols-outlined clear-icon' onClick={handleNavClick}>Menu</i>
    </div>
  )
}

export default AppBar;
