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
  title: 'Satellite',
  preload: Infinity,
  source: new ol.source.XYZ({
    url:'//{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png?app_id=p5jWgIultJxoVtXb03Xl&app_code=Cpj_I6Yx3J3yhVFE7aD12Q',
    attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' + '<a href="http://developer.here.com">HERE</a>',
  })
});

var osm = new ol.layer.Tile({
  title: 'Street',
  source: new ol.source.OSM(),
  visible: false
});

var wmtsParser = new ol.format.WMTSCapabilities();

var topoURLCapabilities = fetch('https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer/WMTS/1.0.0/WMTSCapabilities.xml')
  .then(function(response) {
    return response.text();
  }).then(function(text) {
    let result = wmtsParser.read(text);
    let topoSource = ol.source.WMTS.optionsFromCapabilities(result, {
      layer: 'USA_Topo_Maps',
      matrixSet: 'EPSG:3857'
    });
    topoLayer.setSource(new ol.source.WMTS((topoSource)))
  });

let topoLayer = new ol.layer.Tile({
  title: 'Topo',
  visible: false
});


var hoonahRoads = new ol.layer.Vector({
  title: 'Roads',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_roads.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: function(feature, resolution) {
    let road = '',
        properties = feature.getProperties();
    if (resolution < 16) {
      if (properties.RD_NAME_PR === null) {
        properties.RD_NAME_PR = '';
      }
      road = properties.RD_NAME_PR + '\n' + properties.RD_OWNER;
    }
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ddd83d',
        width: 1.6
      }),
      text: new ol.style.Text({
        font: '8px function, serif',
        text: road,
        fill: new ol.style.Fill({
          color: '#666'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 2
        })
      })
    })
  },
  opacity: .9,
  visible: false
});

var hoonahLandOwners = new ol.layer.Vector({
  title: 'Land Owner',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_landownership.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: function(feature, resolution) {
    let color = feature.getProperties().color;
    let lowner = '';
    if (resolution < 75) {
      lowner = feature.getProperties().LSNOTES;
    }
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: color
      }),
      text: new ol.style.Text({
        text: lowner,
        align: 'center',
        fill: new ol.style.Fill({
          color: '#000'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 3
        })
      })
    })
  },
  opacity: .6,
  visible: false
});

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Group({
      title: 'Basemaps',
      layers: [
        hereMap,
        osm,
        topoLayer
      ]
    }),
    new ol.layer.Group({
      title: 'Overlays',
      layers: [
        hoonahLandOwners,
        hoonahRoads
      ]
    })
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

var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);

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

if (typeof all_alerts !== 'undefined') {
  for (var i = 0; i < all_alerts.length; i++) {
    let geo = JSON.parse(all_alerts[i].alert_location),
        coords = ol.proj.fromLonLat(geo.coordinates),
        a_id = all_alerts[i]['alert_id'];
        style = styleAlert(a_id);
    let newA = new ol.Feature();
    vectorSource.addFeature(newA);
    newA.setGeometry(new ol.geom.Point(coords));
    newA.setStyle(style)
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
    Materialize.toast(`Location not found.
      Privacy settings may be preventing location tracking.
      Find location on the map or try again.`, 9000);
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

function styleAlert(a_id) {
  return new ol.style.Style({
    image: new ol.style.RegularShape({
      points: 6,
      fill: new ol.style.Fill({
        color: 'red'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 2
      }),
      radius: 10,
    }),
    text: new ol.style.Text({
      text: a_id.toString(),
      align: 'center',
      fill: new ol.style.Fill({
        color: '#fff'
      }),
    })
  })
}

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

function addAlertsToMap(data) {
  let l = data.length - 1,
      newDataCoords = JSON.parse(data[l].alert_location),
      type = data[l].alert_type,
      point = new ol.Feature(),
      a_id = data[l]['alert_id'];;
      style = styleAlert(a_id);
  vectorSource.addFeature(point);
  let coords = ol.proj.fromLonLat(newDataCoords.coordinates);
  point.setGeometry(new ol.geom.Point(coords));
  point.setStyle(style);
}
