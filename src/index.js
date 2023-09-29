
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




function displayTemperature(response){
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity")
    let feelElement = document.querySelector("#feel");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    temperatureElement.textContent = Math.round(response.data.temperature.current);
    console.log(response.data.temperature.feels_like);
    cityElement.textContent = response.data.city;
    descriptionElement.textContent = response.data.condition.description;
    humidityElement.textContent = Math.round(response.data.temperature.humidity);
    feelElement.textContent = Math.round(response.data.temperature.feels_like);
    windElement.textContent = Math.round(response.data.wind.speed);
    dateElement.textContent = formatDate(response.data.time * 1000)

}





function changeIcon(response){
    let iconElement = document.querySelector("#icon");
    iconElement.textContent = response.data.condition.icon_url;

}

let apiKey = "toa489c4b0297ba13abfd4fa2587c29d"
let city = "London"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`




axios.get(apiUrl).then(displayTemperature)