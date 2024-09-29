import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Profile from '../Profile/Profile';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { APIkey, defaultClothingItems, latitude, longitude } from '../../utils/constants';
import {CurrentTempUnitContext} from '../contexts/CurrentTempUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';
import { getItems } from '../../utils/api';

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
      console.log(values)
      setClothingItems([values, ...defaultClothingItems]);
      console.log(defaultClothingItems);
      setActiveModal('');
    }

    const handleTempToggleChange = (e) => {
        if(currentTempUnit === 'C') {
          setToggleUnitSwitch('F')
      } else {
          setToggleUnitSwitch('C')
      }
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
                  <Route path='/profile' element={<Profile weatherData={weatherData} handleImageClick={handleImageClick} handleAddClick={handleAddClick} clothingItems={clothingItems} />} />
                </Routes>

                <Footer />
            </div>
            {activeModal === 'add' && <AddItemModal handleModalClose={closeActiveModal} isOpen={activeModal === "add"} onAddItem={onAddItemSubmit} />}
            {activeModal === 'preview' &&  <ItemModal 
              isOpen={activeModal === 'preview'}
              handleModalClose={closeActiveModal}
              card={selectedCard}
            />}
          </CurrentTempUnitContext.Provider>
        </div>
    )
}

export default App
