var mapView = new ol.View({
  center: ol.proj.fromLonLat([-135.44, 58.10]),
  zoom: 10
});

var paramsObsMap = {
  allowTouch: function() {
    if (ol.has.TOUCH) {
      return false;
    } else {
      return true;
    }
  }
}

// layers
var hereMap = new ol.layer.Tile({
  preload: Infinity,
  source: new ol.source.XYZ({
    url:'//{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png?app_id=p5jWgIultJxoVtXb03Xl&app_code=Cpj_I6Yx3J3yhVFE7aD12Q',
    attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' + '<a href="http://developer.here.com">HERE</a>',
  })
});

const map = new ol.Map({
  target: 'map',
  layers: [
    hereMap
  ],
  view: mapView,
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: true
    })
  }).extend([
    new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(2),
      projection: 'EPSG:4326',
    }),
    new ol.control.FullScreen()
  ]),
  interactions: ol.interaction.defaults({
    mouseWheelZoom: paramsObsMap.allowTouch()
  })
});

// initial data
var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  map: map
});

// user_observations is set in observation.html & is contextual from a views obj
if (typeof user_observations !== 'undefined') {
  for (var i = 0; i < user_observations.length; i++) {
    // collect data needed
    let geo = JSON.parse(user_observations[i].observation_location),
        coords = ol.proj.fromLonLat(geo.coordinates),
        catURL = `/static/hnfp/img/icons/category/i_${user_observations[i].category}.png`;
    // create points with icons
    let newP = new ol.Feature();
    vectorSource.addFeature(newP);
    newP.setGeometry(new ol.geom.Point(coords));
    newP.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        src: catURL,
        scale: 0.5,
      })
    }));
  }
}

var locSource = new ol.source.Vector();
var locLayer = new ol.layer.Vector({
  source: locSource,
  map: map
});
var locPoint = new ol.Feature();
locPoint.setId(1);
locSource.addFeature(locPoint);
locPoint.setStyle(locStyle);

// Interactions
var selectInteraction = new ol.interaction.Select({
  layers: [locLayer],
  style: selectStyle
});

var pointerInteraction = new ol.interaction.Pointer({
  handleDownEvent: false,
  handleDragEvent: false,
  handleEvent: false,
  handleMoveEvent: false,
});
map.addInteraction(pointerInteraction);


var draw;
function drawLocation() {
  locPoint.setGeometry(new ol.geom.Point(mapView.getCenter()));
  locPoint.setStyle(locStyle);
  map.addInteraction(selectInteraction);
  map.addInteraction(modify);
}

// geolocation tracker var
var geolocation;
function findLocation() {

  geolocation = new ol.Geolocation({
    projection: mapView.getProjection(),
    tracking: true
  });

  geolocation.on('change', function(e) {
    var coordinates = geolocation.getPosition();
    mapView.animate({
      center: coordinates,
      zoom: 18,
      duration: 4000
    });
    observations.hideSpinner();
    locPoint.setGeometry(new ol.geom.Point(coordinates));
    geolocation.setTracking(false);
    map.addInteraction(modify);
  });

  geolocation.on('error', function(error) {
    geolocation.setTracking(false);
    observations.hideSpinner();
    Materialize.toast('Location not found. You may have a privay setting that prevents location tracking. Try to find location on map or try geolocation again.', 6000);
  });
}

function getLocationPoint() {
  let loc = locPoint.getGeometry();
  return ol.proj.toLonLat(loc.getCoordinates())
}

// edit location marker
var modify = new ol.interaction.Modify({
  features: selectInteraction.getFeatures()
});

var locStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 8,
    fill: new ol.style.Fill({
      color: '#000000'
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
      color: '#000000'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffffff',
      width: 2
    })
  })
});

function removeInterations() {
  map.removeInteraction(modify);
}

// Created new data
function addToMap(data) {
  let l = data.length - 1,
      newDataCoords = JSON.parse(data[l].observation_location),
      cat = data[l].category,
      // type = newData[l].observation_type,
      // tally = newData[l].observation_tally,
      point = new ol.Feature();

  vectorSource.addFeature(point);
  let coords = ol.proj.fromLonLat(newDataCoords.coordinates),
      catURL = `/static/hnfp/img/icons/category/i_${cat}.png`;
  point.setGeometry(new ol.geom.Point(coords));
  point.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      src: catURL,
      scale: 0.5
    })
  }));
}
