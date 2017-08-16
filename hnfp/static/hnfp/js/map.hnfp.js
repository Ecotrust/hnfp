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
  zoom: 10
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.XYZ({
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
  map: map
});
var locPoint = new ol.Feature();
locPoint.setId(1);
locObs.addFeature(locPoint);
locPoint.setStyle(locStyle);

var draw;
function drawLocation() {
  locPoint.setGeometry(new ol.geom.Point(mapView.getCenter()));
  locPoint.setStyle(locStyle);

  // remove select and add draw
  // map.removeInteraction(selectInteraction);
  /* draw = new ol.interaction.Draw({
    source: locObs,
    type: 'Point',
    style: drawStyle
  }); */

  //draw.on('drawend', function(evt) {
    // remove draw and add select
    // map.removeInteraction(draw);
    map.addInteraction(selectInteraction);
    editLocPoint();
  //}, this);

  // map.addInteraction(draw);
}

var selectInteraction = new ol.interaction.Select({
  style: selectStyle
});

// geolocation tracker var
var geolocation;
function findLocation(stop) {

  geolocation = new ol.Geolocation({
    projection: mapView.getProjection(),
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
      center: coordinates,
      zoom: 18,
      duration: 6000
    });
    observations.hideSpinner();
    locPoint.setGeometry(new ol.geom.Point(coordinates));
    geolocation.setTracking(false);
    map.addInteraction(selectInteraction);
    editLocPoint();
  });

  geolocation.on('error', function(error) {
    geolocation.setTracking(false);
    observations.hideSpinner();
    Materialize.toast('Location not found. Use map instead.', 6000);
  });
}

function getLocationPoint() {
  let loc = locPoint.getGeometry();
  return ol.proj.toLonLat(loc.getCoordinates())
}

// edit location marker
var modify;
function editLocPoint() {
  modify = new ol.interaction.Modify({
    features: selectInteraction.getFeatures()
  });
  map.addInteraction(modify);
}

var locStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 8,
    fill: new ol.style.Fill({
      color: '#00ffff'
    }),
    stroke: new ol.style.Stroke({
      color: '#000000',
      width: 2
    })
  })
});

var selectStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 8,
    fill: new ol.style.Fill({
      color: '#ffff00'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffffff',
      width: 2
    })
  })
});
