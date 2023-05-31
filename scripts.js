let store;
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
        history.innerHTML += `<button class="button is-secondary" onclick="searchHistory('${city}')">${city}</button>`;
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
    // console.log(list);


};
