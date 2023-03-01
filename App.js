import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Main from './components/Main';
import './css/index.css';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  
  const [navClassName, setNavClassName] = useState(() => {
    return localStorage.getItem('navClassName') || 'nav';
  });

  const handleNavClick = () => {
    setNavClassName((prevClassName) => {
      const newClassName = prevClassName === 'nav' ? 'nav--collapsed' : 'nav';
      localStorage.setItem('navClassName', newClassName);
      return newClassName;
    });
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setNavClassName(localStorage.getItem('navClassName'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className='container'>
        <Navigation navClassName={navClassName} />
        <Main navClassName={navClassName} onNavClick={handleNavClick} />
      </div>
    </Router>
  );
};

export default App;