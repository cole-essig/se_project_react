import React from "react";
import './Profile.css'
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleImageClick, handleAddClick, clothingItems }) {
    return (
        <div className="profile">
          <section className="profile__sidebar">
            <SideBar />
          </section>
          <section className="profile__clothing-items">
            <ClothesSection handleImageClick={handleImageClick} handleAddNewClick={handleAddClick} clothingItems={clothingItems} />
          </section>
        </div>
    )
}

export default Profile;