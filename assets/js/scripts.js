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
    
    function timeConversion(time) {
      const [hours, minutes] = time.split(':');
      const period = hours < 12 ? 'AM' : 'PM';
      const convertedHours = hours % 12 || 12;
      const convertedTime = `${convertedHours}:${minutes} ${period}`;
  
      return convertedTime;
    }

    function searchEvents(apiKey, keyword, city) {
        const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
        const params = {
          apikey: ticketmasterApiKey,
          keyword: keyword,
          city: city
        };
        $("body").css("height","100%")
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
        
      eventDiv.innerHTML = '';
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
            <section class="section">
            <div class="container">
             <div class="columns mt-5 is-8 is-variable is-centered">
              
             <div class="column is-4-tablet is-10-desktop">
               <div class="card">
                 <div class="card-image has-text-centered px-6">
                  <img src="${itemImage}" alt="${item.name}">
                 </div>
     
                 <div class="card-content">
                   <p class="title is-size-5 has-text-centered">${item.name}</p>
                   <p>Start Date: ${startDate} ${endDate ? endDate : ""}</p>
                 </div>
     
                 <footer class="card-footer has-background-warning">
                 <p class="card-footer-item">
                 <a href="${item.url}" class="card-footer-item has-text-black">Buy Tickets</a>
                 </p>
                 </footer>
               </div>
             </div>
     
             </div>
            </div>
           </section>
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
        <section class="section">
        <div class="container">
         <div class="columns is-variable is-centered is-5">
          
         <div class="column">
           <div class="card">
             <div class="card-image ">
              <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}">
             </div>
 
             <div class="card-content">
               <p class="title is-size-6 has-text-centered">${new Date(dt*1000).toLocaleDateString()}</p>
               <p>Temp: ${temp}°F</p>
               <p>Humidity: ${humidity}%</p>
               <p>Wind Speed: ${speed} MPH</p>
             </div>
           </div>
         </div>
 
         </div>
        </div>
       </section>
        `;
    }
    // console.log(list);


};

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

  $('body', 'html').css({
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

setInterval(updateGradient, 30);

// Update the time every minute
setInterval(updateTime, 60000);