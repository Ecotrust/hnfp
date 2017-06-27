// Generic function to make an AJAX call
var getJSON = function(dataURL, successCallback, errorCallback) {
    // Return the $.ajax promise
    return $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: dataURL,
      success: successCallback,
      error: errorCallback
    });
}

$(document).ready(function() {

  var position = navigator.geolocation.getCurrentPosition(geolocate),
      marineURL = 'https://api.darksky.net/forecast/5dee4e51a4b71918ffe3ad18e83db386/';

  function geolocate(pos) {
    console.log(pos);
    console.log(marineURL + pos.coords.latitude + ',' + pos.coords.longitude);
    return marineURL + pos.coords;
  }

  getJSON(position, loadMarine);

  function loadMarine(data) {
    console.log(data);
    $('#marineforecast').html(data.main.humidity);
  }
});

(function getWeather() {
  var weatherDOM = $('#openweathermap'),
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
})();
