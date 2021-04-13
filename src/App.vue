<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="search ..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>
      <div>
        <h1 v-if="typeof weather.main == 'undefined' " id="title">Welcome, type in the city and check the weather </h1>
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined' ">
        <div class="location-box">
          <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
          <div class="date">Saturday 4 March 2020</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{Math.round(weather.main.temp)}}°C</div>
          <div class="weather">{{weather.weather[0].main}}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios';
export default {
  name: "app",
  data() {
    return {
      api_key: "e6b251dc9dc48f3684a3d46dea1e7775",
      url_base: "http://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {}
    };
  },
  created(){
    console.log(navigator.geolocation.getCurrentPosition((coords)=> {
     const {latitude, longitude} =  coords.coords
     console.log(latitude, longitude)

     this.getAdressFromCoords(latitude, longitude)
    }))
  },
  methods: {
   
    async fetchWeather(e) {
      if (e.key == "Enter") {
        console.log(this.api_key);
        let result = await fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=e6b251dc9dc48f3684a3d46dea1e7775`
        );
        let json = await result.json();
        this.weather = await json;
        if(json === 'undefined') {
          alert("BOOM")
        }

       // console.log(this.weather.main);
      }
    },
    async getWeather(){
    let result= await axios.post( `${this.url_base}weather?q=${this.query}&units=metric&APPID=e6b251dc9dc48f3684a3d46dea1e7775`)
    console.log(result)
    }

  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap");
* {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "monstserrat", sans-serif;
  transition: 0.4s;
}
h1 {
  text-align: center;
  opacity: 1;
}
#title {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.274);

}
#app {
  background-image: url("./assets/cold-bg.jpg");
  background-size: contain;
  background-position: bottom;
  transition: 0.4s ease-in;
  /* transistion bgimage nie dziala na firefox */
}
@media (max-width: 700px) {
  #app {
    background-size: auto;
  }
}
#app.warm {
  background-image: url("./assets/warm-bg.jpg");
}

input {
  text-align: center;
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba(30, 143, 255, 0.445),
    rgba(0, 0, 255, 0.212)
  );
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  background-color: rgba(255, 255, 255, 0.25);

  transition: border-radius 0.3s ease-in-out, background-color 0.3s ease-in-out;
}
@media (min-width: 700px) {
  .search-box .search-bar {
    width: 50%;
    margin: auto;
  }
}

.search-box .search-bar:focus {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 0 16px 0 16px;
}

.location-box .location {
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.274);
}
.location-box .date {
  color: white;
  font-size: 20px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  margin: 30px 0;
  color: white;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.226);
  border-radius: 16px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.226);
}

.weather-box .weather {
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  color: white;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.205);
}
</style>
