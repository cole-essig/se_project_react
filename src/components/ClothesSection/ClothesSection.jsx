import React from "react";
import './ClothesSection.css'
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from 'react';
import { CurrentUserContext } from '../../utils/contexts/CurrentuserContext';

function ClothesSection({ handleImageClick, handleAddNewClick, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);
    return (
            <div className="clothes-section">
              <div className="clothes-section__header">
                <p className="clothes-section__description">Your Items</p>
                <button type='button' onClick={handleAddNewClick} className="clothes-section__add_button">+ Add New</button>
              </div>
                <ul className="clothes-section__cards_list">
                    {clothingItems.map((item) => {
                      if (currentUser._id === item.owner) {
                        return <ItemCard key={item._id} item={item} onCardClick={handleImageClick} />;
                      }
                    })}
                </ul>
            </div>
    )
}

export default ClothesSection;