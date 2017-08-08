$(document).ready( function() {
  weather.getTides();
  initmap();
});

(function getWeather() {
  var weatherDOM = $('#weatherforcast'),
      marineDOM = $('#marineforecast');

  $.ajax({
    type: 'GET',
    url: 'https://api.darksky.net/forecast/5dee4e51a4b71918ffe3ad18e83db386/58.1097,-135.4435',
    dataType: 'jsonp',
    success: function(data) {
      let current = data.currently;
      let weatherData = {
        'summary': current.currently,
        // 'icon': current.icon,
        'temperature (f)': current.temperature,
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
          if (weatherData[prop] != undefined) {
            weatherDOM.append('<div class="col s12"><div class="col s8"><strong>' + prop + '</strong></div><div class="col s4 right-align">' + weatherData[prop] + '</div></div>').addClass('weather-block');
          }
        }
      }
      let marineData = {
        'nearest storm (mi)': current.nearestStormDistance,
        'storm bearing (°N)': current.nearestStormBearing,
        'wind speed (mph)': current.windSpeed,
        'wind gust (mph)': current.windGust,
        'wind bearing (°N)': current.windBearing,
        'visibility (mi)': current.visibility,
        'uv index': current.uvIndex
      };
      for (let prop in marineData) {
        if (marineData.hasOwnProperty(prop)) {
          if (marineData[prop] != undefined) {
            marineDOM.append('<div class="col s12"><div class="col s8"><strong>' + prop + '</strong></div><div class="col s4 right-align">' + marineData[prop] + '</div></div>').addClass('weather-block');
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
          console.log(waterlevel);
          tideDOM.append('<tr><td>' + month + '.' + day + '</td><td>' + time + '</td><td>' + waterlevel + '</td><td>' + type + '</td></tr>').addClass('tide-block');
        })
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.warn(jqXHR + textStatus);
    	}
    });
  }
};

var initmap = function() {

  var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
  });

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          preload: Infinity,
          url:'//{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png?app_id=p5jWgIultJxoVtXb03Xl&app_code=Cpj_I6Yx3J3yhVFE7aD12Q',
          attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' +
              '<a href="http://developer.here.com">HERE</a>',
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-135.44, 58.10]),
      zoom: 10
    }),
    controls: ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        collapsible: false
      })
    }).extend([mousePositionControl]),
  });
}
