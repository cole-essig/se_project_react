import "./ItemModal.css";
import { CurrentUserContext } from '../../utils/contexts/CurrentuserContext';
import { useContext } from "react";

function ItemModal({ isOpen, handleModalClose, card, handleCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  return (
   <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
     <div className="modal__content_type_image">
      <button type='button' className='modal__close' onClick={handleModalClose}></button>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
          <h2 className="modal__footer_caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button type="button" className={`modal__delete ${isOwn ? 'modal_delete-on' : ''}`} onClick={handleCardDelete}>Delete item</button>
      </div>
     </div>
   </div>
  )
}

export default ItemModal