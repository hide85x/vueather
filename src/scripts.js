export default {
    name: "app",
    data() {
      return {
        api_key: "e6b251dc9dc48f3684a3d46dea1e7775",
        url_base: "http://api.openweathermap.org/data/2.5/",
        query: '',
        weather: {}
      };
    },
    methods:{
      async fetchWeather (e) {
      if (e.key == 'Enter') {
        console.log(this.api_key)
       let result= await fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=e6b251dc9dc48f3684a3d46dea1e7775`)
       let json=await result.json();
       this.weather= await json
       console.log(this.weather)
      }
     }
    //  date () {
    //    let date=Date.now();
    //         console.log(date)
    //   return date
    //  }
    }
  }