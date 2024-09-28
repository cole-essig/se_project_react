import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import avatar from '../../assets/avatar.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
    return (
      <header className='header'>
        <Link to="/">
          <img className='header__logo' alt='Logo' src={logo} />
        </Link>
        <p className='header__date-time'>{currentDate}, {weatherData.city}</p>
        <ToggleSwitch />
        <button type='button' onClick={handleAddClick} className='header__add-clothes-btn'>+ Add clothes</button>
        <Link to='/profile' className='header__link'>
          <div className='header__user-container'>
            <p className='header__username'>Terrence Tegegne</p>
            <img src={avatar} alt='User Avatar photo' className='Header__avatar' />
          </div>
        </Link>
      </header>
    )
}

export default Header;