import React from "react";
export default ItemCard;
import "./ItemCard.css";
import avatar from '../../assets/avatar.svg'

function ItemCard({ item, onCardClick, onCardLike }) {
    const handleCardClick = () => {
        onCardClick(item);
    }

    const handleLike = () => {
      onCardLike({ ID: item._id, isLike: item.likes})
    }

    return (
        <li className='card'>
          <h2 className='card__name'>{item.name}</h2>
          <button className="card__like-button" onClick={handleLike}><img src={avatar} alt="heart button" /></button>
          <img src={item.imageUrl} alt={item.name} className='card__image' onClick={handleCardClick} />
        </li>
        )
}