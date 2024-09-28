import React from "react";
import './Profile.css'
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ weatherData, handleImageClick, handleAddClick }) {
    return (
        <div className="profile">
          <section className="profile__sidebar">
            <SideBar />
          </section>
          <section className="profile__clothing-items">
            <ClothesSection weatherData={weatherData} handleImageClick={handleImageClick} handleAddNewClick={handleAddClick} />
          </section>
        </div>
    )
}

export default Profile;