'use strict';

class WeatherApp {

    constructor(city) {
        this.city = city;
    }

    setCity(name) {
        this.city = name;
    }

    #weatherData () {
        let data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=0ba4d921bd287fe583eff55b5acd394e`);
        return data;
    }

    async processData() {
        let dataPromise = await this.#weatherData();
        let dataJson = await dataPromise.json();
        let timezone = dataJson.base;
        return timezone;
    }

}

let weather = new WeatherApp("London");

let data = weather.processData();
data.then((res) => {
    console.log(res);
})

