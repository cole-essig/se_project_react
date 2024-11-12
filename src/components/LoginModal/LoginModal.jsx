import React, {useState} from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './LoginModal.css';

function LoginModal({ handleModalClose, isOpen, onLogIn, switchActiveModal}) {
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }

    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onLogIn();
      handleModalClose;
    }

    const title = 'Log in';
    const button = 'Log in';
    const switchButton = 'or Sign Up'
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

  export default LoginModal