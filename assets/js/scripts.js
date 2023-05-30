let store;
<<<<<<< HEAD
let historyElement = document.querySelector('#history');

const apiKey = '23d68278b5b786d3d93337f17d67f78a';
const current = document.querySelector('#current');
const forecast = document.querySelector('#forecast');

// const getHistory = () => {
//     store = localStorage.history ? JSON.parse(localStorage.history) : [];

//     store.forEach(city => {
//         historyElement.innerHTML += `<button onclick="searchHistory('${city}')">${city}</button>`;
//     });
// };

// getHistory();
=======
let history = document.querySelector('#history');
const weatherApiKey = "acacc251ac1d55c10b6b1ca615625847";
const ticketmasterApiKey = "X4xZbqdMjNE0sYFaaNPjrEKwBGjGkd96";

// const axios = require('axios');


// Example usage
const apiKey = 'X4xZbqdMjNE0sYFaaNPjrEKwBGjGkd96';
let keyword = 'music';
let city = 'New York';



// const getEvents = () => {
//    let eventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}`
//    console.log("eventUrl:", eventUrl)
// };

// getEvents();
 
const getHistory = () => {
    store = localStorage.history ? JSON.parse(localStorage.history) : [];

    store.forEach(city => {
        history.innerHTML += `<button onclick="searchHistory('${city}')">${city}</button>`;
    });
};

getHistory();
>>>>>>> c33669d7e1d95595529603346ec64bc56322e4f0

const searchHistory = city => {
    document.querySelector('input').value = city;
    searchCity();
};

const searchCity = async () => {
    let city = document.querySelector('input').value;

<<<<<<< HEAD
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
=======
    if(!city) return;


    function searchEvents(apiKey, keyword, city) {
        const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
        const params = {
          apikey: ticketmasterApiKey,
          keyword: keyword,
          city: city
        };
      
        return axios
          .get(baseURL, { params })
          .then(response => {
            return response.data._embedded.events;
          })
          .catch(error => {
            console.log("error:", error);
            return null;
          });
      }

    searchEvents(apiKey, keyword, city)
  .then(events => {
    console.log(events);
    let eventDiv = document.getElementById("events")
    if (events) {
        
        events.forEach(item => {
            console.log("item:", item)
            let endObj = item.dates.end ? item.dates.end : ''
            let startObj = item.dates.start ? item.dates.start : ''
          let endDate, startDate, startTime, endTime, convertedStartTime, convertedEndTime, startTimeDisplay, endTimeDisplay = ''
            if (startObj) {
             startDate = item.dates.start.localDate ? item.dates.start.localDate : ''
             startTime = item.dates.start.localTime ? item.dates.start.localTime : ''
             convertedStartTime = startTime ? timeConversion(startTime) : ''
             startTimeDisplay = startTime ? `<h5>Start Time: ${convertedStartTime}</h5>` : "";
            }
            if (endObj) {
              endDate = endObj ? `<h5>End Date: ${item.dates.end.localDate}</h5>` : "";
             endTime = item.dates.end.localTime ? item.dates.end.localTime : ''
             convertedEndTime = endTime ? timeConversion(endTime) : ''
             endTimeDisplay = endTime ? `<h5>End Time: ${convertedEndTime}</h5>` : "";
            }
            let itemImage = item.images[0] ? item.images[0].url : ''
            let itemURL = item.url ? item.url : ''
        
            eventDiv.innerHTML += `
            <div class="card" style="padding: 0 4%;">
                <h3>${item.name}</h3>
                <h5>Start Date: ${startDate}</h5>        
                ${endDate ? endDate : ""}
                <div style="display:flex;">
                ${startTimeDisplay}      
                ${endTimeDisplay}  
                </div>
                <img src="${itemImage}" alt="${item.name}" height="150" width="100%" style="object-fit: cover;">
                <a href=${item.url} target="_blank" style="background-color:gold;padding:8px;border-radius:12px;color:#fff;text-decoration:none;margin:1rem 0;">Buy Tickets</a>
            </div>
        `
        });
    }
  
  })
  .catch(error => {
    console.log(error);
  });


    let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}&units=imperial&q=${city}`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${weatherApiKey}&units=imperial&q=${city}`;

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
>>>>>>> c33669d7e1d95595529603346ec64bc56322e4f0
        let { dt, main: { temp, humidity }, weather: [{ icon }] } = list[i];

        forecast.innerHTML += `
            <div class="card">
<<<<<<< HEAD
                <h3>${new Date(dt * 1000).toLocaleDateString()}</h3>
=======
                <h3>${new Date(dt*1000).toLocaleDateString()}</h3>
>>>>>>> c33669d7e1d95595529603346ec64bc56322e4f0
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}">
                <h5>Temp: ${temp}°F</h5>
                <h5>Humidity: ${humidity}%</h5>
                <h5>Wind Speed: ${speed} MPH</h5>        
            </div>
        `;
    }
<<<<<<< HEAD
};

function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var currentTime = hours + ':' + minutes + ' ' + amPm;
    return currentTime;
}

var colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

var step = 0;
var colorIndices = [0, 1, 2, 3];
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

function updateTime() {
    const currentTimeElement = document.querySelector('#current-time');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    currentTimeElement.textContent = `Current Time: ${formattedTime}`;
}

updateTime();

// Update the time every second
setInterval(updateTime, 1000);
=======
    // console.log(list);


};
>>>>>>> c33669d7e1d95595529603346ec64bc56322e4f0
