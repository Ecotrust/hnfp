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
  initmap();
});

var initmap = function() {

  var map = new OpenLayers.Map('map', {
      displayProjection: new OpenLayers.Projection("EPSG:4326"),
      projection: "EPSG:3857"
  });

  map.addControl(new P97.Controls.LayerLoadProgress({
      map: map,
      element: null,
      onStartLoading: function() {
          this.element.show();
      },
      onLoading: function(num, max, percentStr) {
          this.element.text(percentStr);
      },
      onFinishLoading: function() {
          this.element.hide();
      }
  }));

  googleStreet = new OpenLayers.Layer.Google("Streets", {
      sphericalMercator: true,
      isBaseLayer: true,
      visibility: false,
      numZoomLevels: 18,
      MAX_ZOOM_LEVEL: 17,
  });


  map.addLayers([googleStreet]);


  //enables zooming to a given extent on the map by holding down shift key while dragging the mouse
  map.zoomBox = new OpenLayers.Control.ZoomBox({});

  map.addControl(map.zoomBox);

  map.setCenter(new OpenLayers.LonLat(-135.44, 58.10)
      .transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")), 11);
}
