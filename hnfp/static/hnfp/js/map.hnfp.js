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

var topoLayer = new ol.layer.Tile({
  title: 'Topo',
  visible: false
});

var footpathLayer = new ol.layer.Image({
  title: 'Footpaths',
  source: new ol.source.ImageWMS({
      url: 'https://seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC_Footprints/MapServer/0',
      crossOrigin: 'anonymous'
  }),
  visible: false
})

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
      if (properties.RD_NAME_PR === null || properties.RD_NAME_PR === 'other') {
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

// Map Object
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
    newP.setProperties({
      'id': user_observations[i].id,
      'icon': catURL,
      'category': user_observations[i].category,
      'customcategory': user_observations[i].customcategory,
      'comments': user_observations[i].comments,
      'observation_date': user_observations[i].observation_date,
      'observation_time': user_observations[i].observation_time,
      'observation_location': user_observations[i].observation_location,
      'observation_tally': user_observations[i].observation_tally,
      'observation_type': user_observations[i].observation_type,
      'observer_username': user_observations[i].observer_username,
    });
    newP.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        src: catURL,
        scale: 0.5,
      })
    }));
  }
  let popupNode = document.getElementById('popup');
  let popup = new ol.Overlay({
    element: popupNode,
    positioning: 'top-center',
    offset: [0,6],
    autoPan: true,
    autoPanMargin: 40
  });
  map.addOverlay(popup);
  map.on('singleclick', function(event) {
    let feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
      return feature;
    }, {
      hitTolerance: 2
    });
    if (feature) {
      let coords = feature.getGeometry().getCoordinates();
      let featuresProps = feature.getProperties();
      let domElement = popup.getElement();
      domElement.querySelector('.card-content').innerHTML = `
        <p class="center card-tally">${featuresProps.observation_tally} <img src="${featuresProps.icon}" class="activator icon-img" /></p>
        <span class="center card-title">${featuresProps.observation_type}</span>
        <p><em>${featuresProps.observation_date} ${featuresProps.observation_time}</em></p>
        <p>${featuresProps.comments}</p>
      `;
      domElement.querySelector('.card-action').innerHTML = `
        <a href="/observation/edit/${featuresProps.id}" class="disabled">Edit</a>
        <a href="/observation/delete/${featuresProps.id}" class="disabled">Delete</a>
      `;
      popup.setPosition(coords);
    }
  });
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
    newA.setStyle(style);
    newA.setProperties(all_alerts[i]);
  }
  alertMap.selectAlert();
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

var draw;
function drawLocation(style) {
  locPoint.setGeometry(new ol.geom.Point(mapView.getCenter()));
  if (typeof style === 'undefined') {
    style = locStyle;
  }
  locPoint.setStyle(style);
  map.addInteraction(modify);
}

var alertMap = {
  findLocation: function() {
    findLocation();
    let style = alertMap.styleAlert();
    locPoint.setStyle(style);
  },
  drawLocation: function() {
    let style = alertMap.styleAlert();
    drawLocation(style);
  },
  selectAlert: function() {
    let selectClick = new ol.interaction.Select({
      condition: ol.events.condition.click
    });
    map.addInteraction(selectClick);
    selectClick.on('select', function(e) {
      let feats = e.target.getFeatures();
      feats.forEach(function(f,i) {
        let aid = f.getProperties().alert_id;
        alerts.scrollToAlert(aid);
      });
    })
  }
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
  source: locSource,
  style: selectStyle
});

var locStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 11,
    fill: new ol.style.Fill({
      color: '#ffffff'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffef00',
      width: 9
    })
  })
});

var selectStyle = new ol.style.Style({
  fill: new ol.style.Circle({
    radius: 8,
    fill: new ol.style.Fill({
      color: '#57a6a2'
    })
  }),
  fill: new ol.style.Fill({
    color: '#57a6a2'
  })
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

function styleAlert(a_id) {
  let width = 1,
      fillColor = '#d53f38';
  if (typeof a_id === 'undefined') {
    a_id = '';
    fillColor = '#ffea30';
    width = 2.5;
  } else {
    a_id = a_id.toString();
  }
  return new ol.style.Style({
    image: new ol.style.RegularShape({
      points: 3,
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: '#dfeceb',
        width: width,
      }),
      radius: 19
    }),
    text: new ol.style.Text({
      font: '11px "function_bold"',
      text: a_id,
      align: 'center',
      fill: new ol.style.Fill({
        color: '#fff'
      })
    }),
    zIndex: 9
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
  point.setProperties(data[l]);
  var selectClick = new ol.interaction.Select({
    condition: ol.events.condition.click
  });
  map.addInteraction(selectClick);
  selectClick.on('select', function(e) {
    console.log(e.target.getFeatures());
  })
}

function hideLocation() {
  locLayer.setVisible(false);
}

function showLocation() {
  locLayer.setVisible(true);
}
