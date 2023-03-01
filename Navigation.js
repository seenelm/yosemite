import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import logo from '../assets/logo.png'
import logo1 from '../assets/logo1.png'

const Navigation = ({ navClassName }) => {
  return (
    <nav className={navClassName}>
      <div className='logoContainer'>
        <img className='logo' src={logo} />
        <img className='logo1' src={logo1} />
      </div>
      <div className='spacing'></div>
      <Link to='/dashboard' className='navlink'>
        <div className='naviconcontainer'>
          <i className="material-symbols-outlined navIcon">Dashboard</i>
        </div>
        <span className='navlabel'>Dashboard</span>
      </Link>
      <Link to='/calendar' className='navlink'>
        <div className='naviconcontainer'>
          <i className="material-symbols-outlined navIcon">Event</i>
        </div>
        <span className='navlabel'>Calendar</span>
      </Link>
      <Link to='/history' className='navlink'>
        <div className='naviconcontainer'>
          <i className="material-symbols-outlined navIcon">History</i>
        </div>
        <span className='navlabel'>History</span>
      </Link>
      <Link to='/logout' className='navlink'>
        <div className='naviconcontainer'>
          <i className="material-symbols-outlined navIcon">Logout</i>
        </div>
        <span className='navlabel'>Logout</span>
      </Link>
    </nav>
  );
};

export default Navigation;