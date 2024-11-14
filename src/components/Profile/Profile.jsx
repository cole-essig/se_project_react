import React from "react";
import './Profile.css'
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleImageClick, handleAddClick, clothingItems, handleProfileChange, handleLogout }) {
    return (
        <div className="profile">
          <section className="profile__sidebar">
            <SideBar handleProfileChange={handleProfileChange} handleLogout={handleLogout} />
          </section>
          <section className="profile__clothing-items">
            <ClothesSection handleImageClick={handleImageClick} handleAddNewClick={handleAddClick} clothingItems={clothingItems} />
          </section>
        </div>
    )
}

export default Profile;