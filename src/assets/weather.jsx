import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '90855e190d8921e0db834bb5086167bf'; // Replace with your OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5';

export default function WeatherDashboard() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    

    const fetchWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const weatherResponse = await axios.get(`${API_URL}/weather`, {
                params: { q: city, appid: API_KEY, units: 'metric' }
            });
            const forecastResponse = await axios.get(`${API_URL}/forecast`, {
                params: { q: city, appid: API_KEY, units: 'metric' }
            });

            setWeatherData(weatherResponse.data);
            setForecastData(forecastResponse.data.list.filter((_, index) => index % 8 === 0));
        } catch (err) {
            setError('City not found or API error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 display-4 text-primary">Weather Dashboard</h1>
            <div className="input-group mb-3 shadow rounded">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter city name..." 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-primary" onClick={fetchWeather}>Search</button>
            </div>

            {loading && <p className="text-center text-warning">Loading...</p>}
            {error && <p className="text-danger text-center fw-bold">{error}</p>}

            {weatherData && (
                <div className="card p-4 mb-4 shadow-lg rounded-3 bg-light border-0">
                    <h3 className="text-primary text-center">{weatherData.name}</h3>
                    <p className="text-center">🌡️ Temperature: {weatherData.main.temp}°C</p>
                    <p className="text-center">🌥️ Weather: {weatherData.weather[0].description}</p>
                    <p className="text-center">💨 Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p className="text-center">💧 Humidity: {weatherData.main.humidity}%</p>
                </div>
            )}

            {forecastData && (
                <div className="row">
                    {forecastData.map((forecast, index) => (
                        <div key={index} className="col-md-2 mb-3">
                            <div className="card text-center p-3 shadow rounded-3 bg-white border-0">
                                <p className="fw-bold">{new Date(forecast.dt_txt).toLocaleDateString()}</p>
                                <p>🌡️ {forecast.main.temp}°C</p>
                                <p>🌥️ {forecast.weather[0].description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
