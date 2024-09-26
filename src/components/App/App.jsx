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
            <ModalWithForm 
              buttonText={'Add garment'} 
              title={'New garmet'} 
              activeModal={activeModal}
              handleModalClose={closeActiveModal}
              isOpen={activeModal === "add"}
            >
              <label htmlFor='name' className='modal__label'>
              Name{" "}
                <input 
                  type='text'
                  className='modal__input'
                  id='name'
                  placeholder='Name'
                />
              </label>
              <label htmlFor='imageURL' className='modal__label'>
                  Image{" "}
                  <input 
                    type='url'
                    className='modal__input'
                    id='imageURL'
                    placeholder='Image URL'
                  />
              </label>
              <fieldset className="modal__radio-buttons">
                  <legend className='modal__legend'>Select the weather type:</legend>
                  <label htmlFor="hot" className="modal__label modal__label_type_radio">
                      <input
                      name='weather' 
                        id="hot"
                        type="radio" 
                        className="modal__radio-input" 
                      /> Hot
                  </label>
                  <label htmlFor="warm" className="modal__label modal__label_type_radio">
                      <input
                        name='weather' 
                        id="warm"
                        type="radio" 
                        className="modal__radio-input" 
                      /> Warm
                  </label>
                  <label htmlFor="cold" className="modal__label modal__label_type_radio">
                      <input
                        name='weather'
                        id='cold' 
                        type="radio" 
                        className="modal__radio-input" 
                      /> Cold
                  </label>
              </fieldset>
            </ModalWithForm>
            <ItemModal 
              activeModal={activeModal}
              handleModalClose={closeActiveModal}
              card={selectedCard}
            />
          </CurrentTempUnitContext.Provider>
        </div>
    )
}

export default App
