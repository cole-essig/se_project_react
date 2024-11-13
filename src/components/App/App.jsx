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
import AddItemModal from '../AddItemModal/AddItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { APIkey, latitude, longitude } from '../../utils/constants';
import {CurrentTempUnitContext} from '../../utils/contexts/CurrentTempUnitContext';
import { getItems, setItems, deleteItems } from '../../utils/api';
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

    const handleAddClick = () => {
      setActiveModal('add');
    };

    const closeActiveModal = () => {
      setActiveModal('');
    };

    const handleImageClick = (card) => {
      setActiveModal('preview')
      setSelectedCard(card)
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
      console.log("HeyHey")
      signin({ email, password })
      .then((res) => {
        console.log(res);
        closeActiveModal();
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.error(err);
      })
    }

    const onRegister = ({ name, avatar, email, password }) => {
      console.log("HeyHeyHey")
      signup({ name, avatar, email, password })
      .then((res) => {
        console.log(res);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      })
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
      console.log(data);
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
        console.log(res);
        setIsLoggedIn(true);
        setActiveModal('')
      })
      
    }, []);

    return (
        <div className='page'>
          <CurrentTempUnitContext.Provider value={{currentTempUnit, handleTempToggleChange}}>
            <div className='page__content'>
                <Header handleAddClick={handleAddClick} weatherData={weatherData} />
                
                <Routes>
                  <Route path='/' element={<Main weatherData={weatherData} handleImageClick={handleImageClick} clothingItems={clothingItems} />} />
                  <Route path='/profile' 
                    element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} reload={setActiveModal}>
                      <Profile handleImageClick={handleImageClick} handleAddClick={handleAddClick} clothingItems={clothingItems} />
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
          </CurrentTempUnitContext.Provider>
        </div>
    )
}

export default App
