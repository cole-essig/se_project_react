import React, {useState} from 'react';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../utils/contexts/CurrentuserContext';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './EditProfileModal.css';

function EditProfileModal({ handleModalClose, isOpen, switchActiveModal, profileUpdate }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const handleNameChange = (e) => {
      setName(e.target.value);
    }

    const [avatar, setURL] = useState('');
    const handleAvatarChange = (e) => {
      setURL(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        profileUpdate({ name: name, avatar: avatar })
    }

    const currentUserValue = () => {
        setName(currentUser.user);
        setURL(currentUser.avatar);
    }

    useEffect(() => {
      currentUserValue();
    }, [])


    const title = 'Change Profile data';
    const button = 'Save changes';
    const switchButton ="";
    return (
    <ModalWithForm
        handleModalClose={handleModalClose}
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        title={title}
        button={button}
        switchButton={switchButton}
        handleModalSwitch={switchActiveModal}
    >
        <label htmlFor='name' className='modal__label'>
                Name{" "}
                <input 
                    type='text'
                    className='modal__input'
                    id='name'
                    placeholder={currentUser.user}
                    value={name}
                    onChange={handleNameChange}
                />
            </label>
            <label htmlFor='avatarURL' className='modal__label'>
                Image{" "}
                <input 
                    type='url'
                    className='modal__input'
                    id='avatarURL'
                    placeholder={currentUser.avatar}
                    onChange={handleAvatarChange}
                    value={avatar}
                />
            </label>
    </ModalWithForm>
  );
  }

  export default EditProfileModal;