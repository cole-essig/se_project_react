import './Main.css'
import { useContext } from 'react';
import { CurrentTempUnitContext } from '../../utils/contexts/CurrentTempUnitContext';
import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard';

function Main({ weatherData, handleImageClick, clothingItems, onCardLike }) {
    const {currentTempUnit} = useContext(CurrentTempUnitContext);
    return (
        <main>
            <WeatherCard weatherData={weatherData} />
            <section className='cards'>
                <p className='cards__text'>
                    Today is {currentTempUnit === 'F' ? weatherData.temp.C : weatherData.temp.F} &deg; {currentTempUnit === 'F' ? 'C' : 'F'}/ You may want to wear:
                </p>
                <ul className="cards__list">
                    {clothingItems.filter((item) => {
                        return item.weather === weatherData.type;
                    }).map((item) => {
                      return <ItemCard key={item._id} item={item} onCardClick={handleImageClick} onCardLike={onCardLike} />;
                    })}
                </ul>

            </section>
        </main>
    )
}

export default Main;