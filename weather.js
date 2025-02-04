// Select DOM elements
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

// API key and base URL
const apiKey = '9c886f633951a487abb65b07d99988c4';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// Function to fetch weather data
async function checkWeather(cityName) {
    try {
        const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Update DOM with weather data
        city.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} km/h`;

        // Update weather icon based on weather condition
        const weatherCondition = data.weather[0].main;
        switch (weatherCondition) {
            case 'Clouds':
                weatherIcon.src = 'images/clouds.png';
                break;
            case 'Clear':
                weatherIcon.src = 'images/clear.png';
                break;
            case 'Rain':
                weatherIcon.src = 'images/rain.png';
                break;
            case 'Drizzle':
                weatherIcon.src = 'images/drizzle.png';
                break;
            case 'Mist':
                weatherIcon.src = 'images/mist.png';
                break;
            case 'Snow':
                weatherIcon.src = 'images/snow.png';
                break;
            default:
                weatherIcon.src = 'images/clouds.png';
        }
    } catch (error) {
        alert('City not found. Please try again.');
        console.error(error);
    }
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

// Optional: Fetch weather for a default city on page load
window.addEventListener('load', () => {
    checkWeather('Ljubljana'); 
});