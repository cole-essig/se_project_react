import './Main.css'
import WeatherCard from '../WeatherCard/WeatherCard'
import { defaultClothingItems } from '../../utils/constants';
import ItemCard from '../ItemCard/ItemCard';

function Main({ weatherData, handleImageClick }) {
    return (
        <main>
            <WeatherCard />
            <section className='Cards'>
                <p className='Cards__text'>
                    Today is 75 &deg; F/ You may want to wear:
                </p><ul className="cards__list">
                    {defaultClothingItems.filter((item) => {
                        return item.weather === weatherData.type;
                    }).map((item) => {
                      return <ItemCard key={item._id} item={item} onCardClick={handleImageClick} />;
                    })}
                </ul>

            </section>
        </main>
    )
}

export default Main;