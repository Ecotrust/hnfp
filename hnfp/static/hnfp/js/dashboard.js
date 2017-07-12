(function getWeather() {
  var weatherDOM = $('#weatherforcast'),
      marineDOM = $('#marineforecast');

  $.ajax({
    type: 'GET',
    url: 'https://api.darksky.net/forecast/5dee4e51a4b71918ffe3ad18e83db386/58.1097,-135.4435',
    dataType: 'jsonp',
    success: function(data) {
      weatherDOM.html('<p>' + data.hourly.summary + '</p>');
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
          if (marineData[prop] !== undefined) {
            marineDOM.append('<div class="col s6"><div class="col s8 right-align"><strong>' + prop + '</strong>:</div><div class="col s4 left-align">' + marineData[prop] + '</div></div>').addClass('weather-block');
          }
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      marineDOM.html(errorThrown);
  	}
  });
})();

var weather = {
  yyyymmdd: function(date, daysInFuture) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    if (daysInFuture > 0) {
      var dd = date.getDate() + daysInFuture;
    } else {
      var dd = date.getDate();
    }
    return [date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('');
  },
  daysInFuture: function(days) {
    if (days === undefined) {
      var days = 0;
    }
    return new Date( date.getFullYear(), date.getMonth(), date.getDate() + days );
  },
  getTides: function() {
    let date = new Date(),
        tmrw = weather.yyyymmdd(date, 1),
        today = weather.yyyymmdd(date);

    $.ajax({
      type: 'GET',
      url:'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=' + today + '&end_date=' + today + '&datum=MLLW&station=9452438&time_zone=lst_ldt&units=english&interval=hilo&format=json',
      dataType: 'json',
      success: function(data) {
        data.predictions.forEach(function(el, i, arr) {
          var tideDOM = $('#tideforecast');
          let time = el.t,
              v = el.v,
              type = el.type;
          tideDOM.append('<div class="col s3 center"><p><strong>' + type + '</strong></p><p>' + time + '</p><p><em>' + v + '</em></p></div>').addClass('tide-block');
        })
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
