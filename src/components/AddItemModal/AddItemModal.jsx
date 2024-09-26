import React, {useState} from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ handleModalClose, isOpen, onAddItem}) {
    const [name, setName] = useState('');
    const handleNameChange = (e) => {
      setName(e.target.value);
      console.log(name);
    }

    const [link, setURL] = useState('');
    const handleLinkChange = (e) => {
      setURL(e.target.value);
      console.log(link);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem({ name, link });
    }
    
    return (
        <ModalWithForm 
        handleModalClose={handleModalClose}
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        >
            <label htmlFor='name' className='modal__label'>
                Name{" "}
                <input 
                    type='text'
                    className='modal__input'
                    id='name'
                    placeholder='Name'
                    value={name}
                    onChange={handleNameChange}
                />
            </label>
            <label htmlFor='imageURL' className='modal__label'>
                Image{" "}
                <input 
                    type='url'
                    className='modal__input'
                    id='imageURL'
                    placeholder='Image URL'
                    onChange={handleLinkChange}
                    value={link}
                />
            </label>
            <fieldset className="modal__radio-buttons">
                <legend className='modal__legend'>Select the weather type:</legend>
                <label htmlFor="hot" className="modal__label modal__label_type_radio">
                    <input
                        name='weather' 
                        id="hot"
                        type="radio" 
                        className="modal__radio-input" 
                        value='hot'
                    /> Hot
                </label>
                <label htmlFor="warm" className="modal__label modal__label_type_radio">
                    <input
                        name='weather' 
                        id="warm"
                        type="radio" 
                        className="modal__radio-input"
                        value='warm' 
                    /> Warm
                </label>
                <label htmlFor="cold" className="modal__label modal__label_type_radio">
                    <input
                        name='weather'
                        id='cold' 
                        type="radio" 
                        className="modal__radio-input"
                        value='cold' 
                    /> Cold
                </label>
            </fieldset>
        </ModalWithForm>
    )
}

export default AddItemModal;