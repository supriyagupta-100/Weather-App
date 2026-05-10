const apiKey ='5ebb6e808cc1100f002311fd05f7c8de';
const indianCities = ["Patna", "Mumbai", "Pune", "Banglore", "Hyderabad", "Ahmadabad", "Surat", "kolkata", "Jaipur", "Nagpur", "Indore", "Thane"];

const cityList = document.getElementById('indian-cities');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');


function loadCities() {
    indianCities.forEach(city => {
        let option = document.createElement('option');
        option.value = city;
        cityList.appendChild(option);
    });
}

//Run the function immediately
loadCities();

//Your existing Weather search logic
searchBtn.addEventListener('click', ()=> {
    const selectedCity = cityInput.value;
    if(selectedCity) {
        checkWeather(selectedCity);
    } else {
        alert("Please enter a city name!");
    }
});

 //Get weather data
 async function checkWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(url);
        const data = await response.json();

        if(response.ok) {
            //Update the UI
            document.getElementById("cityNameDisplay").innerText=data.name;
            document.getElementById("tempDisplay").innerText=Math.round(data.main.temp);
            document.getElementById("descDisplay").innerText=data.weather[0].description;
            document.getElementById("humidityDisplay").innerText=data.main.humidity + "%";
            document.getElementById("windDisplay").innerText=data.wind.speed +"km/h";
        } else {
            alert("City not found in Weather Database!");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

