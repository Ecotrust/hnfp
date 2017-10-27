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
    url:'https://{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png?app_id=p5jWgIultJxoVtXb03Xl&app_code=Cpj_I6Yx3J3yhVFE7aD12Q',
    attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' + '<a href="https://developer.here.com">HERE</a>',
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
});

var hoonahRoads = new ol.layer.Vector({
  title: 'Roads',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_roads.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: function(feature, resolution) {
    let road = '';
    let properties = feature.getProperties();
    if (resolution < 16) {
      road = properties.RD_STATUS !== null ? properties.RD_STATUS : '';
    }
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ddd83d',
        width: 1.6
      }),
      text: new ol.style.Text({
        font: '11px monospace',
        text: road,
        fill: new ol.style.Fill({
          color: '#000000'
        }),
        stroke: new ol.style.Stroke({
          color: '#ffffff',
          width: 1.75
        })
      })
    })
  },
  opacity: .95,
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

var overlayGroup = new ol.layer.Group({
    title: 'Overlays',
    layers: [
      hoonahLandOwners,
      hoonahRoads
    ]
});

// Map Object
var map = new ol.Map({
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
    overlayGroup
  ],
  view: mapView,
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: true
    })
  }).extend([
    // new ol.control.MousePosition({
      // coordinateFormat: ol.coordinate.createStringXY(2),
      // projection: 'EPSG:4326',
    // }),
    new ol.control.FullScreen()
  ]),
  interactions: ol.interaction.defaults({
    mouseWheelZoom: paramsObsMap.allowTouch(),
    dragZoom: paramsObsMap.allowTouch()
  }).extend([
    new ol.interaction.DragRotateAndZoom()
  ])
});

var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);

// submission location point
// locLayer declared before vectorlayer for z-index on map
// ol zindexs in order of creation
// declare before vectorLayer so new creations show above locPoint
var locSource = new ol.source.Vector();
var locLayer = new ol.layer.Vector({
  source: locSource,
  map: map
});
var locPoint = new ol.Feature();
locPoint.setId(1);
locSource.addFeature(locPoint);
locPoint.setStyle(locStyle);

// initial data
var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  map: map
});

// user_observations is set in observation.html & is contextual from a views obj
if (typeof user_observations !== 'undefined') {
  for (var i = 0; i < user_observations.length; i++) {
    addObservationToMap(user_observations[i]);
  }
}

var popupNode = document.getElementById('popup');
var popup = new ol.Overlay({
  element: popupNode,
  positioning: 'top-center',
  offset: [0,6],
  autoPan: false,
  autoPanMargin: 40
});

// set popups to show on click
var popupClick = 'click';
(function mapAddPopup() {
  map.addEventListener(popupClick, function(event) {
    let feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
      return feature;
    }, {
      hitTolerance: 2
    });
    if (feature) {
      if (popupNode !== null) {
        map.addOverlay(popup);
        addOverlayPopup(feature);
      }
    } else {
      map.removeOverlay(popup);
    }
  })
})();

/**
 * @param {object} feature - Openlayers feature
 */
function addOverlayPopup(feature) {
  let coords = feature.getGeometry().getCoordinates();
  let featuresProps = feature.getProperties();
  let domElement = popup.getElement();
  /**
   * observations will always have an observation type
   */
  if (typeof(featuresProps.observation_type) !== 'undefined') {
    domElement.querySelector('.card-content').innerHTML = `
      <p class="center card-tally">${featuresProps.observation_tally} <img src="${featuresProps.icon}" class="activator icon-img" /></p>
      <span class="center card-title">${featuresProps.observation_type}</span>
      <p><em>${featuresProps.observation_date} ${featuresProps.observation_time}</em></p>
      <p>${featuresProps.comments}</p>
      <p><img src="${featuresProps.observation_photo}" /></p>
    `;
    domElement.querySelector('.card-action').innerHTML = `
      <a href="/observation/${featuresProps.id}/update/" class="disabled">Edit</a>
      <a href="/observation/${featuresProps.id}/delete/" class="disabled">Delete</a>
    `;
  } else if (typeof(featuresProps.alert_type) !== 'undefined') {
    domElement.querySelector('.card-content').innerHTML = `
      <p class="center"><strong>${featuresProps.alert_type}</strong></p>
      <p class="center">${featuresProps.alert_date}</p>
      <p class="center">${featuresProps.alert_time}</p>
      <p><span>${featuresProps.alert_comment}</span></p>
      <p><img src="${featuresProps.alert_photo}" /></p>
    `;
    /* domElement.querySelector('.card-action').innerHTML = `
      <!-- TODO make edit and delete available only to user who created alert and admin -->
      <a href="/landuse/${featuresProps.id}/update/" class="disabled">Edit</a>
      <a href="/landuse/${featuresProps.id}/delete/" class="disabled">Delete</a>
    `; */
  } else if (typeof(featuresProps.summary) !== 'undefined') {
    coords = feature.getGeometry().getExtent();
    domElement.querySelector('.card-content').innerHTML = `
      <p class="center card-tally">${featuresProps.category}</p>
      <span class="center card-title">${featuresProps.name}</span>
      <p>${featuresProps.summary}</p>
      <p><em>${featuresProps.start_date} - ${featuresProps.end_date}</em></p>
    `;
    domElement.querySelector('.card-action').innerHTML = `
      <a href="/landuse/${featuresProps.id}/update/" class="disabled">Edit</a>
      <a href="/landuse/${featuresProps.id}/delete/" class="disabled">Delete</a>
    `;
  }
  popup.setPosition(coords);
}

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
  alertAtMyLocation: function() {
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
  },
  styleAlert: function(a_id) {
    let width = 1,
        fillColor = '#d53f38';
    if (typeof a_id === 'undefined') {
      a_id = '';
      fillColor = '#f72122';
      width = 0;
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
}

var observationMap = {
  styleLocation: function() {
    locPoint.setStyle(locStyle);
  }
}

if (typeof all_alerts !== 'undefined') {
  for (var i = 0; i < all_alerts.length; i++) {
    addAlertsToMap(all_alerts[i]);
  }
  alertMap.selectAlert();
}

if (typeof user_alerts !== 'undefined') {
  for (var i = 0; i < user_alerts.length; i++) {
    addAlertsToMap(user_alerts[i]);
  }
  alertMap.selectAlert();
}

// geolocation tracker var
var geolocation;
function findLocation() {
  geolocation = new ol.Geolocation({
    projection: mapView.getProjection(),
    tracking: true
  });
  let changeCount = 0;
  geolocation.on('change', function(e) {
    if (changeCount < 1) {
      mapView.animate({
        center: geolocation.getPosition(),
        zoom: 18,
        duration: 4000
      });
      locPoint.setGeometry(new ol.geom.Point(geolocation.getPosition()));
      map.addInteraction(modify);
      geolocation.setTracking(false);
      changeCount++;
    }
  });
  geolocation.on('error', function(error) {
    geolocation.setTracking(false);
    Materialize.toast(`${error.message}`, 5000);
    var locationNextBtn = document.getElementById('loc-correct');
    let warning = document.createElement('div');
    warning.innerHTML = '<div class="right col s12"><p><strong>Location permission denied. To allow location change permission settings for your browser.</strong></p></div>';
    locationNextBtn.parentNode.prepend(warning);
  });
}

function getLocationPoint() {
  let loc = locPoint.getGeometry();
  return loc.getCoordinates();
}

// edit location marker
var modify = new ol.interaction.Modify({
  source: locSource
});

var locStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 9,
    fill: new ol.style.Fill({
      color: '#b82f35'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffffff',
      width: 5
    })
  }),
  zIndex: 0
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


function removeInterations() {
  map.removeInteraction(modify);
}

// Created new data
function addObservationToMap(feat) {
  // collect data needed
  let geo = JSON.parse(feat.observation_location),
      coords = geo.coordinates,
      catSplit = feat.category.split(' '),
      catStr = catSplit.join('_'),
      categoryLower = catStr.toLowerCase(),
      catURL = `/static/hnfp/img/icons/category/i_${categoryLower}.png`,
      point = new ol.Feature();
  // add new point to source and map
  vectorSource.addFeature(point);
  point.setGeometry(new ol.geom.Point(coords));
  point.setProperties({
    'id': feat.id,
    'icon': catURL,
    'category': feat.category,
    'customcategory': feat.customcategory,
    'comments': feat.comments,
    'observation_date': feat.observation_date,
    'observation_time': feat.observation_time,
    'observation_tally': feat.observation_tally,
    'observation_type': feat.observation_type,
    'observer_username': feat.observer_username,
    'observation_photo': feat.observation_photo,
  });
  point.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      src: catURL,
      scale: 0.5
    }),
    zIndex: 2
  }));
}

function addAlertsToMap(feat) {
  if (feat !== undefined) {
    let geo = JSON.parse(feat.alert_location),
        coords = geo.coordinates,
        a_id = feat['alert_id'];
        point = new ol.Feature(),
        style = alertMap.styleAlert(a_id),
    vectorSource.addFeature(point);
    point.setGeometry(new ol.geom.Point(coords));
    point.setStyle(style);
    point.setProperties({
      'id': a_id,
      'alert_type': feat.alert_type,
      'alert_date': feat.alert_date,
      'alert_time': feat.alert_time,
      'alert_comment': feat.alert_comment,
    });
  }
}

function hideLocation() {
  locLayer.setVisible(false);
}

function showLocation() {
  locLayer.setVisible(true);
}

var TrackingGeolocation;
function trackLocation() {
  let trackingSource = new ol.source.Vector();
  let trackingLayer = new ol.layer.Vector({
    source: trackingSource,
    map: map
  });
  let trackingFeature = new ol.Feature();
  trackingFeature.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      fill: new ol.style.Fill({
        color: '#b82f35'
      }),
      stroke: new ol.style.Stroke({
        color: '#ffa165',
        width: 4
      })
    })
  }));
  trackingSource.addFeature(trackingFeature);

  TrackingGeolocation = new ol.Geolocation({
    projection: mapView.getProjection(),
    tracking: true
  });

  TrackingGeolocation.on('change', function(e) {
    mapView.animate({
      center: TrackingGeolocation.getPosition(),
      zoom: 18,
      duration: 4000
    });
    trackingFeature.setGeometry(new ol.geom.Point(TrackingGeolocation.getPosition()));
  });

  TrackingGeolocation.on('error', function(error) {
    let info = document.getElementById('info');
    info.innerHTML = error.message;
    info.style.display = '';
  });
}

function stopTrackingLocation() {
  TrackingGeolocation.setTracking(false);
}
