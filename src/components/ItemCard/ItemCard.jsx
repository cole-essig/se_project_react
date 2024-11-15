import React from "react";
import { useState } from "react";
export default ItemCard;
import "./ItemCard.css";
import heart from '../../assets/heart.svg'
import blackheart from '../../assets/active-heart.svg'

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isLikedBy, setIsLikedBy] = useState([]);
    const isLikedCurrentUser = item.likes.some(id => id === currentUser._id);

    const handleCardClick = () => {
        onCardClick(item);
    }

    const handleLike = () => {
      onCardLike({ ID: item._id, isLike: item.likes})
      setIsLiked(true);
      setIsLikedBy([item._id, ...isLikedBy]);
    }

    return (
        <li className='card'>
          <div className="card__header">
          <h2 className='card__name'>{item.name}</h2>
          <button className={`card__like-button ${isLoggedIn ? 'card__like-button_active' : ''}`} onClick={handleLike}><img src={isLiked || isLikedCurrentUser ? blackheart : heart} alt="heart button" /></button>
          </div>
          <img src={item.imageUrl} alt={item.name} className="card__image" onClick={handleCardClick} />
        </li>
        )
}

