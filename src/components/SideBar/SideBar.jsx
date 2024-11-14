import React from "react";
import './SideBar.css'
import { CurrentUserContext } from '../../utils/contexts/CurrentuserContext';

function SideBar() {
  const currentUser = useContext(CurrentUserContext);
    return (
        <div className="sidebar">
          <img className="sidebar__avatar" src={currentUser.avatar} alt="Avatar Photo" />
          <p className="sidebar__username">{currentUser.user}</p>
        </div>
    )
}

export default SideBar;