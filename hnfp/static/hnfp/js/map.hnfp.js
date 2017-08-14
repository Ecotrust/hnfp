var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

if (ol.has.TOUCH) {
  var allowMouseZoom = false;
} else {
  var allowMouseZoom = true;
}

var mapView = new ol.View({
  center: ol.proj.fromLonLat([-135.44, 58.10]),
  zoom: 10,
  loadTilesWhileAnimating: true
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        preload: Infinity,
        url:'//{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png?app_id=p5jWgIultJxoVtXb03Xl&app_code=Cpj_I6Yx3J3yhVFE7aD12Q',
        attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' + '<a href="http://developer.here.com">HERE</a>',
      })
    })
  ],
  view: mapView,
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: true
    })
  }).extend([mousePositionControl]),
  interactions: ol.interaction.defaults({
    mouseWheelZoom: allowMouseZoom
  })
});

var locObs = new ol.source.Vector();
var locObsLayer = new ol.layer.Vector({
  source: locObs,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1.25
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({
        color: '#ffcc11'
      })
    })
  })
});
locObsLayer.setMap(map);

var modify = new ol.interaction.Modify({source: locObs});
map.addInteraction(modify);
function addInteraction() {
  draw = new ol.interaction.Draw({
    features: locObs,
    type: 'Point',
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#d53f38'
        }),
        stroke: new ol.style.Stroke({
          color: '#ffffff',
          width: 1.5
        })
      })
    })
  });

  map.addInteraction(draw);
  map.getInteractions().extend([selectInteraction]);
  draw.set('selectable', true);
}

var selectInteraction = new ol.interaction.Select({
  condition: ol.events.condition.singleClick,
  toggleCondition: ol.events.condition.shiftKeyOnly,
  layers: function (layer) {
    return layer.get('selectable') == true;
  },
  style: new ol.style.Style({
      stroke: new ol.style.Stroke({
      color: '#ff0000',
      width: 2
    })
  })
});

// geolocation tracker var
var geolocation;
function findLocation(stop) {

  geolocation = new ol.Geolocation({
    tracking: true
  });

  if (stop) {
    geolocation.setTracking(false);
    observations.hideSpinner();
  } else {
    observations.showSpinner();
  }

  geolocation.on('change', function(e) {
    var coordinates = geolocation.getPosition();
    mapView.animate({
      center: ol.proj.fromLonLat(coordinates),
      zoom: 18,
      duration: 6000
    });
    observations.hideSpinner();
    positionFeature.setGeometry(ol.proj.fromLonLat(coordinates) ? new ol.geom.Point(ol.proj.fromLonLat(coordinates)) : null);
  });

  geolocation.on('error', function(error) {
    geolocation.setTracking(false);
    observations.hideSpinner();
    Materialize.toast('Location not found. Use map instead.', 6000);
  });
  let locPoint = new ol.geom.Point(ol.proj.transform(geolocation.getPosition()));
  return locObs.addFeature( new ol.Feature(locPoint) );
}
