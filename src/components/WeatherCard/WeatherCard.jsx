import { useContext } from 'react';
import './WeatherCard.css'
import sunny from '../../assets/day/clear-day.svg'
import { weatherOptions, defaultWeatherOption } from '../../utils/constants';
import { CurrentTempUnitContext } from '../contexts/CurrentTempUnitContext';

function WeatherCard({ weatherData }) {
    const filteredWeatherCard = weatherOptions.filter((options) => {
      return (
        options.day === weatherData.isDay &&
        options.condition === weatherData.condition
      )
    });

    let bannerOptions;

    if (filteredWeatherCard.length === 0 && weatherData.isDay) {
       bannerOptions = defaultWeatherOption.day;  
    } else if (filteredWeatherCard.length === 0 && !weatherData.isDay) {
        bannerOptions = defaultWeatherOption.night;
    } else {
        bannerOptions = filteredWeatherCard[0];
    };
    
    const {currentTempUnit} = useContext(CurrentTempUnitContext);
    return <section className='weather-card'>
            <p className="weather-card__temp">{currentTempUnit === 'F' ? weatherData.temp.C : weatherData.temp.F} &deg; F</p>
            <img src={bannerOptions.url} alt={`Card showing ${bannerOptions.condition} weather`} className='weather-card__image' />
           </section>
}

export default WeatherCard;