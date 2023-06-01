                                                                /* ================= GLOBAL VARIABLES ================= */
let  store;                                                     /* Stores local search history                          */
let  history  =  document.querySelector('#history');            /* Reference to element containing search history       */


getHistory();                                                   /* Get history from local storage                       */

async function searchCity(cityName) 
{ 
                                                                /* OpenWeather API Key                                  */
  const  weatherApiKey  =  "acacc251ac1d55c10b6b1ca615625847";
  
                                                                /* API Request URLs                                     */
  let  url1  =  `https://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}&units=imperial&q=${cityName}`;
  let  url2  =  `https://api.openweathermap.org/data/2.5/forecast?appid=${weatherApiKey}&units=imperial&q=${cityName}`;

  if (!cityName)
  {
    return;                                                     /* Return if user did not provide input                 */
  }

  searchEvents(cityName)
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
            </section>`
        });
      }

    })
    .catch(error => {
      console.log(error);
    });

  if (!store.includes(cityName)) {
    store.push(cityName);
    localStorage.history = JSON.stringify(store);
    history.innerHTML += `<button onclick="searchCity('${cityName}')">${cityName}</button>`;
  };

  let { name, dt, main: { temp, humidity }, wind: { speed }, weather: [{ icon }] } = await (await fetch(url1)).json();

  current.innerHTML = `
        <h1>${name} (${new Date(dt * 1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png" alt="${icon}"></h1>
        <h3>Temperature: ${temp}°F</h3>
        <h3>Humidity: ${humidity}%</h3>
        <h3>Wind Speed: ${speed} MPH</h3>
    `;

  let { list } = await (await fetch(url2)).json();

  forecast.innerHTML = '';
  for (let i = 0; i < list.length; i = i + 8) {
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
                    <p class="title is-size-6 has-text-centered">${new Date(dt * 1000).toLocaleDateString()}</p>
                    <p>Temp: ${temp}°F</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${speed} MPH</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>`;
  }
};


                                                                /* ================= GLOBAL FUNCTIONS ================= */

/**
 * Gets search history from local storage.
 * 
 */
function getHistory () 
{
                                                                /*  */
  store = localStorage.history ? JSON.parse(localStorage.history) : [];

  store.forEach(city => {
    history.innerHTML += `<button class="button is-secondary" onclick="searchCity('${city}')">${city}</button>`;
  });
};


/**
 * Search for events based on given city.
 * 
 * @param {*} city city in which to search for events
 * 
 * @returns list of events returned from reponse or "null" 
 * if error occurs
 */
function searchEvents(city) 
{
  let  keyword  =  'music';                                     /* Default event type                                   */

                                                                /* Ticketmaster API Key                                 */
  const  ticketmasterApiKey  =  "X4xZbqdMjNE0sYFaaNPjrEKwBGjGkd96";

                                                                /* Ticketmaster API base URL                            */
  const  baseURL  =  'https://app.ticketmaster.com/discovery/v2/events.json';

                                                                /* Set the parameters for request                       */
  const params = {
    apikey: ticketmasterApiKey,
    keyword: keyword,
    city: city
  };

                                                                /* Request and return events from Ticketmaster API      */
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


/**
 * Converts time to human-readable format.
 * 
 * @param {*} time time to convert
 * 
 * @returns converted time
 */
function timeConversion(time) 
{
  const [hours, minutes] = time.split(':');
  const period = hours < 12 ? 'AM' : 'PM';
  const convertedHours = hours % 12 || 12;
  const convertedTime = `${convertedHours}:${minutes} ${period}`;

  return convertedTime;
}
