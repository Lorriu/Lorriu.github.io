
function formatDate(timestamp){
        let date = new Date(timestamp);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10){
        minutes = `0${minutes}`
        }
        if (hours < 10){
        hours = `0${hours}`
        }
        let days = [
            "Sunday", 
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday"];
        let day = days[date.getDay()];
        return `${day} ${hours}:${minutes}` 
        
}


function displayForecast(response) {
    //adding a console response so that i can see the data to know what to select
    console.log(response.data.daily)
    let forecastElement = document.querySelector("#forecast");

    //create a row here so it can be a grid
    let forecastHTML = `<div class="row">`;

    let days = ["Thurs", "Fri", "Sat", "Sun"];
    //create a function to assign forecast for each day in above array
    days.forEach(function(day){

    //this adds the data for forecast to the string
    forecastHTML = forecastHTML + `
                <div class="col-2">
                    <div class="weather-forecast-date">
                    ${day}
                    </div>
                    <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" 
                        alt="" 
                        width="42">               
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">
                        18°</span>
                        <span class="weather-forecast-temperature-min">
                        12°</span>
                    </div>
                </div>
            `;
        });

// closing the row with the end div
forecastHTML += `</div>`;
forecastElement.innerHTML = forecastHTML

}

// function to get the lat & lon, based on city, so can get API data for days of the week
function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "toa489c4b0297ba13abfd4fa2587c29d"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`
    console.log(apiUrl);

    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity")
    let feelElement = document.querySelector("#feel");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    
    celsiusTemperature = response.data.temperature.current
    temperatureElement.textContent = Math.round(celsiusTemperature);
    cityElement.textContent = response.data.city;
    descriptionElement.textContent = response.data.condition.description;
    humidityElement.textContent = Math.round(response.data.temperature.humidity);
    feelElement.textContent = Math.round(response.data.temperature.feels_like);
    windElement.textContent = Math.round(response.data.wind.speed);
    dateElement.textContent = formatDate(response.data.time * 1000)
    iconElement.setAttribute ("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute ("alt", response.data.condition.description);

    getForecast(response.data.coordinates);
}

function search(city){
let apiKey = "toa489c4b0297ba13abfd4fa2587c29d"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`


axios.get(apiUrl).then(displayTemperature)
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value)
}

function displayFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    // removing the properties that look like a link and adding it to the other
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
    temperatureElement.textContent = Math.round(fahrenheitTemperature)
}

function displayCelsius(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.textContent = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search("London");

