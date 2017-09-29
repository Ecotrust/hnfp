$(document).ready( function() {
  weather.getWeather();
  weather.getTides();
});

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
  getWeather: function() {
    var weatherDOM = $('#weatherforcast'),
        marineDOM = $('#marineforecast');

    $.ajax({
      type: 'GET',
      url: 'https://api.darksky.net/forecast/5dee4e51a4b71918ffe3ad18e83db386/58.1097,-135.4435',
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        let current = data.currently;
        let daily = data.daily,
            dailyChart = [];

        let weatherData = {
          'summary': data.hourly.summary,
          // 'icon': current.icon,
          'temperature': current.temperature.toFixed(),
          'precipitation type': current.precipType,
          'precipitation probability (%)': current.precipProbability * 100,
          'pressure (hPa)': current.pressure,
          'dew point (f)': current.dewPoint,
          'humidity (%)': current.humidity * 100,
          'wind speed (m/s)': current.windSpeed,
          'wind gust (m/s)': current.windGust,
        }
        for (let prop in weatherData) {
          if (weatherData.hasOwnProperty(prop)) {
            let wp = weatherData[prop];
            if (wp != undefined && prop != 'summary') {
              weatherDOM.append('<tr><td><strong>' + prop + '</strong></td><td>' + wp + '</td></tr>').addClass('weather-block');
            } else if (prop == 'summary') {
              $('#forecast-summary').append(wp);
            }
          }
        }
        let marineData = {
          'Wind speeds of (mph)': current.windSpeed,
          'Wind bearing (°N)': current.windBearing,
          'Gusts of': current.windGust,
          'Distance to nearest storm': current.nearestStormDistance,
          'Visibility of (mi)': current.visibility
        };
        for (let prop in marineData) {
          if (marineData.hasOwnProperty(prop)) {
            if ([prop] == 'summary') {
              marineDOM.append('<div>' + marineData[prop] + '</div>');
            }
            if (marineData[prop] != undefined) {
              marineDOM.append('<tr><td><strong>' + prop + '</strong></td><td>' + marineData[prop] + '</td></tr>');
            }
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        marineDOM.html(errorThrown);
    	}
    })
  },
  getTides: function() {
    let date = new Date(),
        tmrw = weather.yyyymmdd(date, 1),
        today = weather.yyyymmdd(date);

    $.ajax({
      type: 'GET',
      url:'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&date=today&datum=MLLW&station=9452438&time_zone=lst_ldt&units=english&interval=hilo&format=json',
      dataType: 'json',
      success: function(data) {
        data.predictions.forEach(function(el, i, arr) {
          var tideDOM = $('#tideforecast');
          let datetime = el.t,
              year = datetime.substring(0, 4),
              day = datetime.substring(8,10),
              month = datetime.substring(5,7),
              time = datetime.substring(11),
              v = parseFloat(el.v),
              type = el.type;
          let waterlevel = v.toFixed(2);
          tideDOM.append('<tr><td>' + month + '.' + day + '</td><td>' + type + '</td><td>' + waterlevel + '</td><td>' + time + '</td></tr>');
        })
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.warn(jqXHR + textStatus);
    	}
    });
  }
};
