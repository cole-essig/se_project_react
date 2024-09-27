import React from "react";
import './Profile.css'
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ weatherData, handleImageClick }) {
    return (
        <div className="profile">
          <section className="profile__sidebar">
            <SideBar />
          </section>
          <section className="profile__clothing-items">
            <ClothesSection weatherData={weatherData} handleImageClick={handleImageClick} />
          </section>
        </div>
    )
}

export default Profile;