import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Profile from '../Profile/Profile';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { APIkey, latitude, longitude } from '../../utils/constants';
import {CurrentTempUnitContext} from '../../utils/contexts/CurrentTempUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';
import { getItems, setItems, deleteItems } from '../../utils/api';

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
    const [clothingItems, setClothingItems] = useState([])

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

    return (
        <div className='page'>
          <CurrentTempUnitContext.Provider value={{currentTempUnit, handleTempToggleChange}}>
            <div className='page__content'>
                <Header handleAddClick={handleAddClick} weatherData={weatherData} />
                
                <Routes>
                  <Route path='/' element={<Main weatherData={weatherData} handleImageClick={handleImageClick} clothingItems={clothingItems} />} />
                  <Route path='/profile' element={<Profile handleImageClick={handleImageClick} handleAddClick={handleAddClick} clothingItems={clothingItems} />} />
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
          </CurrentTempUnitContext.Provider>
        </div>
    )
}

export default App
