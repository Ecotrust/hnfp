(function getWeather() {
  var weatherDOM = $('#weatherforcast'),
      marineDOM = $('#marineforecast');

  $.ajax({
    type: 'GET',
    url: 'https://api.darksky.net/forecast/5dee4e51a4b71918ffe3ad18e83db386/58.1097,-135.4435',
    dataType: 'jsonp',
    success: function(data) {
      weatherDOM.html(data.minutely.summary);
      let current = data.currently;
      let marineData = {
        'nearest storm': current.nearestStormDistance,
        'storm bearing': current.nearestStormBearing,
        'wind speed': current.windSpeed,
        'wind gust': current.windGust,
        'wind bearing': current.windBearing,
        'visibility': current.visibility,
        'uv index': current.uvIndex
      };
      for (var prop in marineData) {
        if (marineData.hasOwnProperty(prop)) {
          console.log(prop + ': ' + marineData[prop]);
          if (marineData[prop] !== undefined) {
            marineDOM.append('<strong>' + prop + '</strong>: ' + marineData[prop] + '<br />').addClass('weather-block');
          }
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      marineDOM.html(errorThrown);
  	}
  });
})();

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  return [this.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('');
};

Date.prototype.daysInFuture = function(days) {
  if (days === undefined) {
    var days = 0;
  }
  return new Date( date.getFullYear(), date.getMonth(), date.getDate() + days );
};

var date = new Date();

var weather = {
  tidesDOM: function() {
    let tidesDOM = $('#tideforecast');
    return tidesDOM
  },
  getTides: function() {
    var date = new Date(),
        tmrw = new Date( date.getFullYear(), date.getMonth(), date.getDate() + 1 ),
        futureDate = date.daysInFuture(5).yyyymmdd(),
        today = date.yyyymmdd(),
        tmrw = tmrw.yyyymmdd();

    $.ajax({
      type: 'GET',
      url:'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=' + today + '&end_date=' + futureDate + '&datum=MLLW&station=9452438&time_zone=lst_ldt&units=english&interval=hilo&format=json',
      dataType: 'json',
      success: function(data) {
        JSON.parse(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.warn(jqXHR + textStatus);
    	}
    });
  }
};

$(document).ready( function() {
  weather.getTides();
});
