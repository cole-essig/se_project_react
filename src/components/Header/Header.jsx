import './Header.css'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/avatar.svg'
function Header() {
    return (
      <header className='header'>
        <img className='header__logo' src={logo} />
        <p className='header__date-time'>June 15, New York</p>
      <button className='header__add-clothes-btn'>+ Add clothes</button>
      <div className='header__user-container'>
        <p className='header__username'>Terrence Tegegne</p>
        <img src={avatar} alt='User Avatar photo' className='Header__avatar' />
      </div>

      </header>
    )
}

export default Header;