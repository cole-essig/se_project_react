import { useState, useEffect } from 'react';

import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { APIkey, latitude, longitude } from '../../utils/constants';
import {CurrentTempUnitContext} from '../contexts/CurrentTempUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';

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
    }

    const handleTempToggleChange = (e) => {
        if(currentTempUnit === 'C') {
          setToggleUnitSwitch('F')
      } else {
          setToggleUnitSwitch('C')
      }
    }

    useEffect(() => {
      getWeather(APIkey, latitude, longitude).then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
        console.log(filterData.temp)
      }).catch((res) => {
        console.error(res);
    })
    }, []);

    return (
        <div className='page'>
          <CurrentTempUnitContext.Provider value={{currentTempUnit, handleTempToggleChange}}>
            <div className='page__content'>
                <Header handleAddClick={handleAddClick} weatherData={weatherData} />
                <Main weatherData={weatherData} handleImageClick={handleImageClick} />
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
