import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { useContext } from 'react';
import { CurrentUserContext } from '../../utils/contexts/CurrentuserContext';

function Header({ handleAddClick, weatherData, isLoggedIn, onSignUpClick, onLogInClick }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  const currentUser = useContext(CurrentUserContext);
    return (
      <header className='header'>
        <Link to="/">
          <img className='header__logo' alt='Logo' src={logo} />
        </Link>
        <p className='header__date-time'>{currentDate}, {weatherData.city}</p>
        <ToggleSwitch />
        {isLoggedIn ? 
        <>
          <button type='button' onClick={handleAddClick} className='header__add-clothes-btn'>+ Add clothes</button>
          <Link to='/profile' className='header__link'>
            <div className='header__user-container'>
              <p className='header__username'>{currentUser.user}</p>
              <img src={currentUser.avatar} alt='User Avatar photo' className='header__avatar' />
            </div>
          </Link> 
        </>
        :
        <div>
          <button className='header__signup-btn' type='button' onClick={onSignUpClick}>Sign Up</button>
          <button className='header__login-btn' type='button' onClick={onLogInClick}>Log In</button>
        </div> 
        }
      </header>
    )
}

// {`header__add-clothes-btn ${isLoggedIn ? "header__btn_open" : ""}`}

export default Header;