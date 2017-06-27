(function getWeather() {
  var weatherDOM = $('#openweathermap'),
      marineDOM = $('#marineforecast'),
      metric = false;

  $.ajax({
    type: 'GET',
    url: '//api.openweathermap.org/data/2.5/weather?id=5847155&appid=9d7e64f21bfc706e679ffc6cd895b306',
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);

      if (metric === false) {
      	// define temperature as fahrenheit
      	var temperature = Math.round(((data.main.temp - 273.15) * 1.8) + 32) + '°F';
      	var minTemperature = Math.round(((data.main.temp_min - 273.15) * 1.8) + 32) + '°F';
      	var maxTemperature = Math.round(((data.main.temp_max - 273.15) * 1.8) + 32) + '°F';
      } else {
      	// define temperature as celsius
      	var temperature = Math.round(data.main.temp - 273.15) + '°C';
      	var minTemperature = Math.round(data.main.temp_min - 273.15) + '°C';
      	var maxTemperature = Math.round(data.main.temp_max - 273.15) + '°C';
      }
      // TODO apply KO bindings
      // set temperature
      weatherDOM.html(temperature);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.warn(jqXHR + textStatus);
      weatherDOM.html(errorThrown);
  	}
  });

  $.ajax({
    type: 'GET',
    url: 'https://api.darksky.net/forecast/5dee4e51a4b71918ffe3ad18e83db386/58.109190,-135.444947',
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      marineDOM.html(data.currently.summary);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.warn(jqXHR + textStatus);
      marineDOM.html(errorThrown);
  	}
  });
})();
