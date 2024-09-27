import React from "react";
import './SideBar.css'
import avatar from '../../assets/avatar.svg'

function SideBar() {
    return (
        <div className="sidebar">
          <img className="sidebar__avatar" src={avatar} alt="Avatar Photo" />
          <p className="sidebar__username">User Name</p>
        </div>
    )
}

export default SideBar;