const API_KEY = 'ad4acdc3debef01889ee157a6e592b80';

// ── Grab elements ──
let input       = document.getElementById("input");
let search      = document.getElementById("searchIcn");
let weather     = document.getElementById("weatherIcon");
let description = document.getElementById("description");
let temp        = document.getElementById("temp");
let name        = document.getElementById("name");
let wind        = document.getElementById("wind");
let humidity    = document.getElementById("humidity");
let humidityImg = document.getElementById("humidityImg");
let speedImg    = document.getElementById("speedImg");

// ── Hide elements on load ──
weather.style.display     = "none";
humidityImg.style.display = "none";
speedImg.style.display    = "none";

// ── Search on click ──
search.addEventListener("click", () => {
    let location = input.value.trim();
    if (!location) return;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // Fill in data
            name.textContent        = location;
            description.textContent = data.weather[0].main;
            temp.textContent        = Math.round(data.main.temp) + " °C";
            wind.textContent        = data.wind.speed + " km/h";
            humidity.textContent    = data.main.humidity + "%";

            // Show hidden elements
            weather.style.display     = "block";
            humidityImg.style.display = "inline";
            speedImg.style.display    = "inline";

            // Set weather icon
            if (data.weather[0].main === "Clouds") {
                weather.src = "icons/cloudy.png";
            } else if (data.weather[0].main === "Clear") {
                weather.src = "icons/sun.png";
            } else if (data.weather[0].main === "Rain") {
                weather.src = "icons/rainy.png";
            }
        });
});