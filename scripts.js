let store;
let history = document.querySelector('#history');

const getHistory = () => {
    store = localStorage.history ? JSON.parse(localStorage.history) : [];

    store.forEach(city => {
        history.innerHTML += `<button onclick="searchHistory('${city}')">${city}</button>`;
    });
};

getHistory();

const searchHistory = city => {
    document.querySelector('input').value = city;
    searchCity();
};

const searchCity = async () => {
    let city = document.querySelector('input').value;

    if(!city) return;

    let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

    if(!store.includes(city)) {
        store.push(city);
        localStorage.history = JSON.stringify(store);
        history.innerHTML += `<button onclick="searchHistory('${city}')">${city}</button>`;
    };

    let {name,dt,main:{temp,humidity},wind:{speed},weather:[{icon}]} = await (await fetch(url1)).json();

    current.innerHTML = `
        <h1>${name} (${new Date(dt*1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}"></h1>
        <h3>Temperature: ${temp}°F</h3>
        <h3>Humidity: ${humidity}%</h3>
        <h3>Wind Speed: ${speed} MPH</h3>
    `;

    let {list} = await (await fetch(url2)).json();

    forecast.innerHTML = '';
    for (let i = 0; i < list.length; i=i+8) {
        let { dt, main: { temp, humidity }, weather: [{ icon }] } = list[i];

        forecast.innerHTML += `
            <div class="card">
                <h3>${new Date(dt*1000).toLocaleDateString()}</h3>
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}">
                <h5>Temp: ${temp}°F</h5>
                <h5>Humidity: ${humidity}%</h5>
                <h5>Wind Speed: ${speed} MPH</h5>        
            </div>
        `;
    }
    console.log(list);
};