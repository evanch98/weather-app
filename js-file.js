async function fetchData(city) {
  let fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ba4d921bd287fe583eff55b5acd394e&units=metric`, {mode: 'cors'});
  let json = await fetchData.json();
  return json;  
}

async function processData(city) {
  let data = await fetchData(city);
  let message = data.message;
  if (message === undefined) {
    let temp = data.main.temp;
    let temp_min = data.main.temp_min;
    let temp_max = data.main.temp_max;
    let feels = data.main.feels_like;
    let pressure = data.main.pressure;
    let humidity = data.main.humidity;
    let speed = data.wind.speed;
    let cityName = data.name;
    return {temp, temp_min, temp_max, feels, pressure, humidity, speed, cityName};
  } else {
    return {message};
  }
}

const btn = document.querySelector('button');
const search = document.querySelector('#search');

btn.addEventListener('click', () => {
  processData(search.value)
    .then (res => {
  		let temp = res.temp;
    	console.log(temp);
    });
});



