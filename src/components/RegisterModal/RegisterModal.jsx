import React, {useState} from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import "./RegisterModal.css";

function RegisterModal({ handleModalClose, isOpen, onRegister, switchActiveModal }) {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }

    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }

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
      onRegister({ name, avatar, email, password });
    }

    console.log(name, avatar, email, password)
    const title = 'Sign Up';
    const button = 'Sign Up';
    const switchButton = 'or Log In'
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
                    placeholder='Name'
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
                    placeholder='Avatar URL'
                    onChange={handleAvatarChange}
                    value={avatar}
                />
            </label>
            <label htmlFor='email' className='modal__label'>
                Email{" "}
                <input 
                    type='email'
                    className='modal__input'
                    id='email'
                    placeholder='ex.email'
                    value={email}
                    onChange={handleEmailChange}
                />
            </label>
            <label htmlFor='password' className='modal__label'>
                Password{" "}
                <input 
                    type='password'
                    className='modal__input'
                    id='password'
                    placeholder='Password'
                    onChange={handlePasswordChange}
                    value={password}
                />
            </label>
    </ModalWithForm>
  );
  }

  export default RegisterModal