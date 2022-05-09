async function fetchData(city) {
  let fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ba4d921bd287fe583eff55b5acd394e&units=metric`, {mode: 'cors'});
  let json = await fetchData.json();
  return json;  
}

async function times(city) {
	let fetchTime = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=9b089f1ee6ee4afcac9ac1487e31a111&location=${city}`, {mode: 'cors'});
	let json = fetchTime.json();
	return json;
}

async function processCurrent() {
	let data = await fetchPosition();
  let temp = data.main.temp;
  let temp_min = data.main.temp_min;
  let temp_max = data.main.temp_max;
  let feels = data.main.feels_like;
  let pressure = data.main.pressure;
  let humidity = data.main.humidity;
  let speed = data.wind.speed;
  let cityName = data.name;
  return {temp, temp_min, temp_max, feels, pressure, humidity, speed, cityName, hours};
}

async function processData(city) {
  let data = await fetchData(city);
  let message = data.message;
	let time = await times(city);
  if (message === undefined) {
		let hours = time.time_24;
    let temp = data.main.temp;
    let temp_min = data.main.temp_min;
    let temp_max = data.main.temp_max;
    let feels = data.main.feels_like;
    let pressure = data.main.pressure;
    let humidity = data.main.humidity;
    let speed = data.wind.speed;
    let cityName = data.name;
    return {temp, temp_min, temp_max, feels, pressure, humidity, speed, cityName, hours};
  } else {
    return {message};
  }
}

const btn = document.querySelector('button');
const search = document.querySelector('#search');
const temperature = document.querySelector('.temp');
const currentCity = document.querySelector('.city');
const tempHigh = document.querySelector('.tempMax');
const tempLow = document.querySelector('.tempMin');
const feelsLike = document.querySelector('.feels');
const humid = document.querySelector('.humid');
const wind = document.querySelector('.speed');
const press = document.querySelector('.pressure');
const body = document.querySelector('body');

processData("New York").then (res => {
	let hours = res.hours.split(':')[0];
	const isDay = hours > 6 && hours < 18;
	if (isDay) {
		body.style.cssText = "background-image: url(background/morning.jpg)";
	} else {
		body.style.cssText = "background-image: url(background/night.jpg)";
	}
	let city = res.cityName;
  let temp = res.temp;
	let temp_max = res.temp_max;
	let temp_min = res.temp_min;
	let feels = res.feels;
	let humidity = res.humidity;
	let speed = res.speed;
	let pressure = res.pressure;
	temperature.textContent = `${parseInt(temp)}°`;
	currentCity.textContent = city;
	tempHigh.textContent = `High: ${parseInt(temp_max)}°`;
	tempLow.textContent = `Low: ${parseInt(temp_min)}°`;
	feelsLike.textContent = `Feels Like: ${parseInt(feels)}°`;
	humid.textContent = `Humidity: ${humidity}%`;
	wind.textContent = `Wind Speed: ${speed} m/s`;
	press.textContent = `Pressure: ${pressure} hPa`;
});

btn.addEventListener('click', () => {
  processData(search.value)
    .then (res => {
			let hours = res.hours.split(':')[0];
			const isDay = hours > 6 && hours < 18;
			if (isDay) {
				body.style.cssText = "background-image: url(background/morning.jpg)";
			} else {
				body.style.cssText = "background-image: url(background/night.jpg)";
			}
			let city = res.cityName;
  		let temp = res.temp;
			let temp_max = res.temp_max;
			let temp_min = res.temp_min;
			let feels = res.feels;
			let humidity = res.humidity;
			let speed = res.speed;
			let pressure = res.pressure;
			temperature.textContent = `${parseInt(temp)}°`;
			currentCity.textContent = city;
			tempHigh.textContent = `High: ${parseInt(temp_max)}°`;
			tempLow.textContent = `Low: ${parseInt(temp_min)}°`;
			feelsLike.textContent = `Feels Like: ${parseInt(feels)}°`;
			humid.textContent = `Humidity: ${humidity}%`;
			wind.textContent = `Wind Speed: ${speed} m/s`;
			press.textContent = `Pressure: ${pressure} hPa`;
    });
});



