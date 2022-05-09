/**
 * This async function fetch the weather data from the openweathermap.org API. The function gives the weather data
 * associated with the provided city.
 * @param {string} city takes the city name.
 * @returns Promise that includes weather data.
 */
async function fetchData(city) {
  let fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ba4d921bd287fe583eff55b5acd394e&units=metric`, {mode: 'cors'});
  let json = await fetchData.json();
  return json;  
}

/**
 * This async function fetch the date, time, and timezone data from the ipgeolocation.io API. The function gives the
 * mentioned data associated with the provided city.
 * @param {string} city takes the city name.
 * @returns Promise that includes date, time, and timezone
 */
async function times(city) {
	let fetchTime = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=9b089f1ee6ee4afcac9ac1487e31a111&location=${city}`, {mode: 'cors'});
	let json = fetchTime.json();
	return json;
}

/**
 * This async function is to select the required data from the fetchData() and times() function.
 * @param {string} city takes the city name.
 * @returns The object if the appropriate city name is provided else set tge currentCity text content to
 *          "Invalid city name!"
 */
async function processData(city) {
  let data = await fetchData(city);
  let message = data.message;
	let time = await times(city);
	// If message is undefined, it means fetching data works appropriately.
  if (message === undefined) {
		// Retrieving data - START
		let hours = time.time_24;
		let date = time.date;
    let temp = data.main.temp;
    let temp_min = data.main.temp_min;
    let temp_max = data.main.temp_max;
    let feels = data.main.feels_like;
    let pressure = data.main.pressure;
    let humidity = data.main.humidity;
    let speed = data.wind.speed;
		let degree = data.wind.deg;
    let cityName = data.name;
		let visibility = data.visibility;
		let weather = data.weather[0].main;
		let description = data.weather[0].description;
		// Retrieving date - END
    return {temp, temp_min, temp_max, feels, pressure, humidity, speed, cityName, degree, visibility, weather, description, hours, date};
  } else {
		// There is an error fetching data from the openweathermap.org.
    currentCity.textContent = "Invalid city name!";
  }
}

/**
 * This function is to modify html text contents. The function will check the day and night of the city to change the background
 * appropriately.
 * @param {string} city takes the city name
 */
function editDOM(city) {
	processData(city).then (res => {
		// To get the hours part of the time.
		let hours = res.hours.split(':')[0];
		// To get the date.
		let date = res.date;
		const isDay = hours > 6 && hours < 18;	// Checking day or night
		// To change background accordingly.
		if (isDay) {
			body.style.cssText = "background-image: url(background/morning.jpg)";
		} else {
			body.style.cssText = "background-image: url(background/night.jpg)";
		}
		let city = res.cityName;	// City name
		let temp = res.temp;	// current temperature
		let temp_max = res.temp_max;	// max temperature
		let temp_min = res.temp_min;	// min temperature
		let feels = res.feels;	// temperature that actually feels like
		let humidity = res.humidity;	// humidity
		let speed = res.speed;	// wind speed
		let degree = res.degree;	// wind direction
		let pressure = res.pressure;	// atmospheric pressure
		let visibility = res.visibility;	// visibility
		let weather = res.weather;	// weather condition
		let description = res.description;	// weather description
		// Changing html contents - START
		temperature.textContent = `${parseInt(temp)}°`;
		currentCity.textContent = city;
		tempHigh.textContent = `High: ${parseInt(temp_max)}°`;
		tempLow.textContent = `Low: ${parseInt(temp_min)}°`;
		feelsLike.textContent = `Feels Like: ${parseInt(feels)}°`;
		humid.textContent = `Humidity: ${humidity}%`;
		wind.textContent = `Wind Speed: ${speed} m/s`;
		deg.textContent = `Degree: ${degree}°`;
		press.textContent = `Pressure: ${pressure} hPa`;
		visible.textContent = `Visibility: ${visibility} m`;
		dateTime.textContent = date;
		weather_.textContent = `Now: ${weather}`;
		cloud.textContent = description;
		// Changing html contents - END
	});
}

// Retrieving required html documents - START
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
const deg = document.querySelector('.degree');
const visible = document.querySelector('.visibility');
const body = document.querySelector('body');
const dateTime = document.querySelector('.date');
const weather_ = document.querySelector('.condition');
const cloud = document.querySelector('.cloud');
// Retrieving required html documents - END

// To load contents at the start of the page
editDOM("New York");

// While the user search the desired city
btn.addEventListener('click', () => {
  editDOM(search.value);
});



