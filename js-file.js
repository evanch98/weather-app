'use strict';

class WeatherApp {

    constructor(city) {
        this.city = city;
    }

    setCity(name) {
        this.city = name;
    }

    weatherData () {
        let data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=0ba4d921bd287fe583eff55b5acd394e`);
        return data;
    }
}

let weather = new WeatherApp("London");

let data = weather.weatherData().then(response => response.json());
console.log(data);

weather.setCity("Taipei");
data = weather.weatherData().then(response => response.json());
console.log(data);

