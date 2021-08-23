const localStorage = window.localStorage
const savedSearch = (localStorage.getItem('savedSearch')) || ''
let locationSearch = ''


const searchForWeather = () => {
  console.log(locationSearch)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationSearch}&appid=60d3b4e93191d274ec00b8f39c12549e&units=imperial`)
    .then(res => {
      const location = res.data
      console.log(location)
      const weatherElem = document.createElement('div')
      weatherElem.classList = 'card'
      weatherElem.style = "width:100%; border: 1px solid blue;"
      weatherElem.innerHTML = `
          <div id="${location.name}" class="card-body">
            <img src="http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png" alt="${location.weather[0].main}">
            <h4 class="card-title">${location.name}</h4>
            <h5 class="card-subtitle mb-2">${location.weather[0].main}</h5>
            <h6 class="card-text">Temperature: ${location.main.temp}°</h6>
            <h6 class="card-text">Feels Like: ${location.main.feels_like}°</h6>
            <h6 class="card-text">Humidity: ${location.main.humidity}</h6>
            <h6 class="card-text">High: ${location.main.temp_max}°</h6>
            <h6 class="card-text">Low: ${location.main.temp_min}°</h6>
            <h6 class="card-text">Wind Speed: ${location.wind.speed}</h6>
            <button type="submit" id="getFutureWeather" class="btn btn-primary futureWeather">Week Forecast</button>
          </div>
          `
      document.getElementById('resultsHere').append(weatherElem)
    })
    .catch(err => console.error(err))
}

const fiveDayForecast = () => {
  console.log(locationSearch)
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${locationSearch}&appid=60d3b4e93191d274ec00b8f39c12549e&units=imperial`)
    .then(res => {
      const location = res.data
      console.log(location)
      for (let i = 1; i < 41; i = i + 8) {
        const forecastElem = document.createElement('div')
        forecastElem.innerHTML = `
          <div class="card" style="width:100%; border: 1px solid blue;">
            <div class="card-body">
              <img src="http://openweathermap.org/img/wn/${location.list[i].weather[0].icon}@2x.png">
              <h4 class="card-title">${location.list[i].dt_txt}</h4>
            <h5 class="card-subtitle mb-2">${location.list[i].weather[0].main}</h5>
            <h6 class="card-text">Temperature: ${location.list[i].main.temp}°</h6>
            <h6 class="card-text">Feels Like: ${location.list[i].main.feels_like}°</h6>
            <h6 class="card-text">Humidity: ${location.list[i].main.humidity}</h6>
            <h6 class="card-text">High: ${location.list[i].main.temp_max}°</h6>
            <h6 class="card-text">Low: ${location.list[i].main.temp_min}°</h6>
            <h6 class="card-text">Wind Speed: ${location.list[i].wind.speed}</h6>
            </div>
          </div
            `
        document.getElementById('resultsHere').append(forecastElem)
      }
    })
}

let history = JSON.parse(localStorage.getItem('history')) || []