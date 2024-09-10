import { useState, useEffect } from 'react';

import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { APIkey, latitude, longitude } from '../../utils/constants';

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

    useEffect(() => {
      getWeather(APIkey, latitude, longitude).then((data) => {
        console.log(data);
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      }).catch((res) => {
        console.error(res);
    })
    }, []);

    return (
        <div className='page'>
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
                  id="hot"
                  type="radio" 
                  className="modal__radio-input" 
                /> Hot
            </label>
            <label htmlFor="warm" className="modal__label modal__label_type_radio">
                <input 
                  id="warm"
                  type="radio" 
                  className="modal__radio-input" 
                /> Warm
            </label>
            <label htmlFor="cold" className="modal__label modal__label_type_radio">
                <input
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
        </div>
    )
}

export default App
