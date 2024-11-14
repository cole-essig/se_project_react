export default ItemCard;
import "./ItemCard.css";

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
          <img src={item.imageUrl} alt={item.name} className='card__image' onClick={handleCardClick} />
        </li>
        )
}