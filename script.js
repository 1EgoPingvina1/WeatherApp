const apiKey = "59b37930acd18c58855920e883c12294";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const weatherIconImg = document.querySelector(".weather-icon img");
weather.style.display = "none";
function getWeatherIcon(weatherStatus){
        
    if(weatherStatus === "Wind"){
        return "../images/weather-icons/windy.png";
    }
    else if(weatherStatus === "Clouds"){
        return "../images/weather-icons/cloudy.png";
    }
    else if(weatherStatus === "Clear"){
        return "../images/weather-icons/clear-sky.png";
    }
    else
    {
        return '';
    }
}

async function checkWeather(city)
{
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404)
    {
        error.style.display = "block";
        weather.style.display = "none";
    }
    const data = await response.json();

    const weatherStatus = data.weather[0].main;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector('.main').innerHTML = weatherStatus; 
    document.querySelector(".temp").innerHTML = data.main.temp + "&#176";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " км/ч";

    weatherIconImg.src = getWeatherIcon(weatherStatus);
    weather.style.display = "block";
}

searchButton.addEventListener("click", ()=> {
    checkWeather(searchInput.value);
    searchInput.value = "";
})
