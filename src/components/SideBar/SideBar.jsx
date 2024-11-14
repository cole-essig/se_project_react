import React from "react";
import './SideBar.css'
import { useContext } from 'react';
import { CurrentUserContext } from '../../utils/contexts/CurrentuserContext';

function SideBar({handleProfileChange, handleLogout}) {
  const currentUser = useContext(CurrentUserContext);
  console.log(handleLogout);
  console.log(handleProfileChange)
    return (
       <>
        <div className="sidebar">
          <img className="sidebar__avatar" src={currentUser.avatar} alt="Avatar Photo" />
          <p className="sidebar__username">{currentUser.user}</p>
        </div>
        <div className="sidebar__buttons">
          <button className="sidebar__profile-button" onClick={handleProfileChange}>Change profile data</button>
          <button className="sidebar__logout-button" onClick={handleLogout}>Log out</button>
        </div>
       </>
    )
}

export default SideBar;