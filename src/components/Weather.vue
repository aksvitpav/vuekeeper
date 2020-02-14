<template>
  <mdb-card>
    <mdb-card-body class="p-3">
        <h5>Краматорск <img v-bind:src='icon'> {{temp}}&deg;C (ощущается как: {{tempFeel}}&deg;C)</h5>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Weather",
  data() {
    return {
      infoWeather: null,
      town: "",
      description: "",
      icon: "",
      temp: "",
      tempFeel: ""
    };
  },
  mounted() {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=Kramatorsk&appid=4b93deb51f624f0232839fd0eac9ffc0')
      .then(response => (
        this.infoWeather = response, 
        this.town = response.data.name, 
        this.description = response.data.weather[0].description,
        this.icon = 'http://openweathermap.org/img/wn/'+response.data.weather[0].icon+'.png',
        this.temp = Math.ceil(response.data.main.temp - 273.15),
        this.tempFeel = Math.ceil(response.data.main.feels_like - 273.15)
      ));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>