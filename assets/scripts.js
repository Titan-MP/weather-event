let store;
let historyElement = document.querySelector('#history');

const apiKey = '23d68278b5b786d3d93337f17d67f78a';
const current = document.querySelector('#current');
const forecast = document.querySelector('#forecast');

const getHistory = () => {
    store = localStorage.history ? JSON.parse(localStorage.history) : [];

    store.forEach(city => {
        historyElement.innerHTML += `<button onclick="searchHistory('${city}')">${city}</button>`;
    });
};

getHistory();

const searchHistory = city => {
    document.querySelector('input').value = city;
    searchCity();
};

const searchCity = async () => {
    let city = document.querySelector('input').value;

    if (!city) return;

    let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;

    if (!store.includes(city)) {
        store.push(city);
        localStorage.history = JSON.stringify(store);
        historyElement.innerHTML += `<button onclick="searchHistory('${city}')">${city}</button>`;
    }

    let { name, dt, main: { temp, humidity }, wind: { speed }, weather: [{ icon }] } = await (await fetch(url1)).json();

    current.innerHTML = `
        <h1>${name} (${new Date(dt * 1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}"></h1>
        <h3>Temperature: ${temp}°F</h3>
        <h3>Humidity: ${humidity}%</h3>
        <h3>Wind Speed: ${speed} MPH</h3>
        <h3>Current Time: ${getCurrentTime()}</h3>
    `;

    let { list } = await (await fetch(url2)).json();

    forecast.innerHTML = '';
    for (let i = 0; i < list.length; i = i + 8) {
        let { dt, main: { temp, humidity }, weather: [{ icon }] } = list[i];

        forecast.innerHTML += `
            <div class="card">
                <h3>${new Date(dt * 1000).toLocaleDateString()}</h3>
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}">
                <h5>Temp: ${temp}°F</h5>
                <h5>Humidity: ${humidity}%</h5>
                <h5>Wind Speed: ${speed} MPH</h5>        
            </div>
        `;
    }
};

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = hours % 12 || 12;
    const formattedTime = `${twelveHourFormat.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    return formattedTime;
}


var colors = [
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]
];

var step = 0;
var colorIndices = [0,1,2,3];
var gradientSpeed = 0.002;

function updateGradient() {
    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $('#gradient').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
}

setInterval(updateGradient, 10);

// Update the time every minute
setInterval(updateTime, 60000);
