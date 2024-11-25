import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Profile from '../Profile/Profile';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import avatar from '../../assets/avatar.svg'
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { APIkey, latitude, longitude } from '../../utils/constants';
import {CurrentTempUnitContext} from '../../utils/contexts/CurrentTempUnitContext';
import { CurrentUserContext } from '../../utils/contexts/CurrentuserContext';
import { getItems, setItems, deleteItems, addCardLike, removeCardLike } from '../../utils/api';
import { signin, signup, checkToken } from '../../utils/auth';

function App() {

    const [weatherData, setWeatherData] = useState({ 
      type: "",
      temp: { F: 999 },
      city: "",
      isDay: "",
      condition: ""
    });
    const [activeModal, setActiveModal] = useState('');
    const [selectedCard, setSelectedCard] = useState({})
    const [currentTempUnit, setToggleUnitSwitch] = useState("F");
    const [clothingItems, setClothingItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({_id: '', user: "", avatar: avatar});
    const handleAddClick = () => {
      setActiveModal('add');
    };

    const handleSignUpClick = () => {
      setActiveModal('register')
    }

    const handleLogInClick = () => {
      setActiveModal('login')
    }

    const handleProfileChange = () => {
      setActiveModal('edit');
    }

    const closeActiveModal = () => {
      setActiveModal('');
    };

    const handleImageClick = (card) => {
      setActiveModal('preview')
      setSelectedCard(card)
    }

    const handleCardLike = ({ ID, isLiked }) => {
      (isLiked.length === 0) ? addCardLike(ID)
                 .then((updatedCard) => {
                  let updatedItems = clothingItems.map((item) => (item._id === ID ? updatedCard : item))
                  setClothingItems(updatedItems)
                 })
                 .catch((err) => {
                  console.error(err)
                 })
               : removeCardLike(ID)
               .then((updatedCard) => {
                let updatedItems = clothingItems.map((item) => (item._id === ID ? updatedCard : item))
                setClothingItems(updatedItems)
               })
               .catch((err) => {
                console.error(err)
               })
    }

    const onAddItemSubmit = (values) => {
      const newCard = {
        _id: Math.random(),
        name: values.name,
        weather: values.weather,
        imageUrl: values.imageUrl,
      }
      setItems(newCard)
      .then((res) => {
        setClothingItems([newCard, ...clothingItems]);
        console.log(res);
        closeActiveModal();
      }).catch(console.error);
      
    }

    const handleTempToggleChange = (e) => {
        if(currentTempUnit === 'C') {
          setToggleUnitSwitch('F')
      } else {
          setToggleUnitSwitch('C')
      }
    }

    const handleCardDelete = () => {
      console.log(selectedCard._id)
       deleteItems(selectedCard._id)
       .then((res) => {
        console.log(res);
        onScreenDelete(selectedCard._id);
        closeActiveModal();
       }).catch(console.error)
    }

    const onScreenDelete = (cardId) => {
      setClothingItems(clothingItems.filter(item => item._id !== cardId))
    }

    const onLogIn = ({ email, password }) => {
      signin({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser({_id: res.user._id, user: res.user.name, avatar: res.user.avatar});
        setActiveModal('')
        closeActiveModal();
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.error(err);
      })
    }

    const onRegister = ({ name, avatar, email, password }) => {
      signup({ name, avatar, email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser({user: res.name, avatar: res.avatar});
        setActiveModal('')
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      })
    }

    const signout = () => {
      localStorage.removeItem('jwt');
      setCurrentUser({user: '', avatar: ''});
      setIsLoggedIn(false);
    }

    const switchRegisterModal = () => {
      closeActiveModal();
      setActiveModal('login');
    }

    const switchLoginModal = () => {
      closeActiveModal();
      setActiveModal('register');
    }

    useEffect(() => {
     getItems()
     .then((data) => {
      setClothingItems(data)
     }).catch(console.error)
    }, []);

    useEffect(() => {
      getWeather(APIkey, latitude, longitude).then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      }).catch((res) => {
        console.error(res);
    })
    }, []);

    useEffect(() => {
      const token = localStorage.getItem('jwt')
      if (!token) {
        setActiveModal('login');
        return;
      }
      checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser({
          _id: res.id,
          user: res.name,
          avatar: res.avatar
        });
        setActiveModal('');
      })
      .catch((err) => {
        console.error(err)
      })
    }, []);

    return (
        <div className='page'>
          <CurrentTempUnitContext.Provider value={{currentTempUnit, handleTempToggleChange}}>
            <CurrentUserContext.Provider value={currentUser}>
            <div className='page__content'>
                <Header handleAddClick={handleAddClick} weatherData={weatherData} isLoggedIn={isLoggedIn} onSignUpClick={handleSignUpClick} onLogInClick={handleLogInClick} />
                
                <Routes>
                  <Route path='/' element={<Main weatherData={weatherData} handleImageClick={handleImageClick} clothingItems={clothingItems} onCardLike={handleCardLike} isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
                  <Route path='/profile' 
                    element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} anonymous >
                      <Profile handleImageClick={handleImageClick} handleAddClick={handleAddClick} clothingItems={clothingItems} handleProfileChange={handleProfileChange} handleLogout={signout} />
                    </ProtectedRoute>} />
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>

                <Footer />
            </div>
            {activeModal === 'add' && <AddItemModal handleModalClose={closeActiveModal} isOpen={activeModal === "add"} onAddItem={onAddItemSubmit} />}
            {activeModal === 'preview' &&  <ItemModal 
              isOpen={activeModal === 'preview'}
              handleModalClose={closeActiveModal}
              card={selectedCard}
              handleCardDelete={handleCardDelete}
            />}
            {activeModal === 'login' && <LoginModal handleModalClose={closeActiveModal} isOpen={activeModal === 'login'} onLogIn={onLogIn} switchActiveModal={switchLoginModal} />}
            {activeModal === 'register' && <RegisterModal handleModalClose={closeActiveModal} isOpen={activeModal === 'register'} onRegister={onRegister} switchActiveModal={switchRegisterModal} />}
            {activeModal === 'edit' && <EditProfileModal handleModalClose={closeActiveModal} isOpen={activeModal === 'edit'} switchActiveModal={switchRegisterModal} />}
            </CurrentUserContext.Provider>
          </CurrentTempUnitContext.Provider>
        </div>
    )
}

export default App
