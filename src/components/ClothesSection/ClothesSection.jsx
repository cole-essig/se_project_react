import React from "react";
import './ClothesSection.css'
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ weatherData, handleImageClick }) {
    return (
        <>
            <div className="clothes-section">
                <p className="clothes-section__description">Your Items</p>
                <button className="clothes-section__add_button">+ Add New</button>
            </div>
            <ul className="cards__list">
                {defaultClothingItems.filter((item) => {
                    return item.weather === weatherData.type;
                }).map((item) => {
                return <ItemCard key={item._id} item={item} onCardClick={handleImageClick} />;
                })}
            </ul>
        </>
    )
}

export default ClothesSection;