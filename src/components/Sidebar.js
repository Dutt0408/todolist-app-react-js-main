import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSun, faCalendar, faFilter, faFlag, faShare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AdminImage from '../Admin.jpeg'; 
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleClick = () => {

    navigate('/profile');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`Sidebar ${sidebarVisible ? 'visible' : ''}`}>
    <div className="MobileNavbar" onClick={toggleSidebar}>
    <span className="burgerIcon">&#9776;</span>
    </div>
      <nav className="navbar">
        <p style={{fontWeight:'bold',color:'black'}}><FontAwesomeIcon icon={faHouse}  /> Home</p>
        <p> <FontAwesomeIcon icon={faSun} /> Today</p>
        <p><FontAwesomeIcon icon={faCalendar} /> Tomorrow</p>
        <p> <FontAwesomeIcon icon={faFilter} style={{ color: "#572e94" }} /> Important</p>
        <p> <FontAwesomeIcon icon={faFlag} /> Priority</p>
        <p> <FontAwesomeIcon icon={faShare} /> Share Progress</p>
      </nav>
      <p className='ProfileTxt' onClick={handleClick} > My Profile</p>
      <div className="Profile" onClick={handleClick}>
        <img
          className="profileImage"
          src={AdminImage}
          alt="Profile"
          
        /> 
      </div>
    </div>
  );
}
