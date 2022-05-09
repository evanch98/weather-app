async function getData(city) {
    let fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ba4d921bd287fe583eff55b5acd394e&units=metric`, {mode: 'cors'});
    let json = await fetchData.json();
    console.log(json);
}

getData("London");

