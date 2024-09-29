import React from "react";
import './ClothesSection.css'
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ weatherData, handleImageClick, handleAddNewClick, clothingItems }) {
    return (
        <>
            <div className="clothes-section">
              <div className="clothes-section__header">
                <p className="clothes-section__description">Your Items</p>
                <button type='button' onClick={handleAddNewClick} className="clothes-section__add_button">+ Add New</button>
              </div>
                <ul className="clothes-section__cards_list">
                    {clothingItems.filter((item) => {
                        return item.weather === weatherData.type;
                    }).map((item) => {
                    return <ItemCard key={item._id} item={item} onCardClick={handleImageClick} />;
                    })}
                </ul>
            </div>
        </>
    )
}

export default ClothesSection;