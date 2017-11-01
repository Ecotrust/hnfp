$(document).ready(function() {
  var scaleLineControl = new ol.control.ScaleLine();
  map.addControl(scaleLineControl);
  landuseMap.hideAlerts();
  landuseMap.hideObservations();
});

var allFeatures = [];
var landuseMap = {
  removePopup: function() {
    map.removeEventListener('click')
  },
  showAlerts: function() {
    vectorLayer.setVisible(true);
  },
  hideAlerts: function() {
    vectorLayer.setVisible(false);
  },
  showObservations: function() {
    observationLayer.setVisible(true);
  },
  hideObservations: function() {
    observationLayer.setVisible(false);
  }
}

var snapPolygon,
    polygonModify,
    projectSource = new ol.source.Vector(),
    projectLayer = new ol.layer.Vector({
      title: 'Projects',
      source: projectSource,
      map: map,
      style: stylePolygon('rgba(87, 166, 162, 0.4)')
    });

var newProjectSource = new ol.source.Vector(),
    newProjectLayer = new ol.layer.Vector({
      source: newProjectSource,
      map: map
    }),
    drawPolygon = new ol.interaction.Draw({
      source: newProjectSource,
      type: 'Polygon'
    });

function visibleProjectLayer(bool) {
  if (bool != 'undefined') {
    newProjectLayer.setVisible(bool);
  } else {
    newProjectLayer.setVisible(true);
  }
}

function removeNewProjectSourceFeatures() {
  let features = newProjectSource.getFeatures();
  for (var i = 0; i < features.length; i++) {
    newProjectSource.removeFeature(features[i]);
  }
}

function drawProjectArea() {
  snapPolygon = new ol.interaction.Snap({source: newProjectSource});
  polygonModify = new ol.interaction.Modify({source: newProjectSource});
  addProjectInteractions();
};

function addProjectInteractions() {
  map.addInteraction(drawPolygon);
  map.addInteraction(snapPolygon);
  map.addInteraction(polygonModify);
}

function removeProjectInteractions() {
  map.removeInteraction(drawPolygon);
  map.removeInteraction(snapPolygon);
  map.removeInteraction(polygonModify);
}

function drawEndListener() {
  drawPolygon.on('drawend', function() {
    map.removeInteraction(drawPolygon);
  });
}

function convertProjToWKT() {
  let format = new ol.format.WKT(),
      newFeat = newProjectSource.getFeatures()[0],
      wktFeat = format.writeFeature(newFeat);
  landuseProject.addAreaToForm(wktFeat);
}

function addProjectToMap(data) {
  let geo = JSON.parse(data['area']);
  let newPoly = new ol.Feature();
  projectSource.addFeature(newPoly);
  newPoly.setGeometry(new ol.geom.Polygon(geo.coordinates));
  if (typeof(data.category) !== 'undefined') {
    if (data.category === 'forest') {
      newPoly.setStyle(stylePolygon('rgba(87, 166, 162, 0.35)'));
    } else if (data.category === 'road') {
      newPoly.setStyle(stylePolygon('rgba(213, 63, 56, 0.35)'));
    } else if (data.category === 'stream') {
      newPoly.setStyle(stylePolygon('rgba(43, 56, 74, 0.35)'));
    } else {
      newPoly.setStyle(stylePolygon('rgba(140, 140, 140, 0.35)'));
    }
    newPoly.setProperties({
      'id': data.id,
      'area': data.area,
      'name': data.name,
      'category': data.category,
      'summary': data.summary,
      'start_date': data.start_date,
      'completion_date': data.completion_date,
    });
  }
  mapAddPopup();
}


if (typeof all_projects !== 'undefined') {
  for (var i = 0; i < all_projects.length; i++) {
    addProjectToMap(all_projects[i]);
  }
}
if (typeof all_public_projects !== 'undefined') {
  for (var i = 0; i < all_public_projects.length; i++) {
    addProjectToMap(all_public_projects[i]);
  }
}

function stylePolygon(fillColor) {
  return function(feature, resolution) {
    let strokeWidth = .5;
    if (resolution < 4) {
      strokeWidth = 3;
    } else if (resolution < 15) {
      strokeWidth = 2;
    } else if (resolution < 25) {
      strokeWidth = 1;
    }
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: fillColor / 1.25,
        width: strokeWidth
      })
    });
  };
}

function styleLine(lineColor) {
  return function(feature, resolution) {
    let strokeWidth = 1.5;
    if (resolution < 4) {
      strokeWidth = 4;
    } else if (resolution < 15) {
      strokeWidth = 3;
    } else if (resolution < 25) {
      strokeWidth = 2;
    }
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: lineColor,
        width: strokeWidth
      })
    });
  };
}

function stylePoint(pointColor) {
  return new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      fill: new ol.style.Fill({
        color: pointColor
      }),
      stroke: new ol.style.Stroke({
        color: '#ffffff',
        width: 2
      })
    })
  });
}

let hoonahCabins = new ol.layer.Vector({
  title: 'Cabins',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_cabins.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#decbe4'),
  opacity: .95,
  visible: false
});

let areaHarvested = new ol.layer.Vector({
  title: 'Area Harvested',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_harvest_stand_age.geojson',
    format: new ol.format.GeoJSON({
      defaultDataProjection: 'EPSG:3857',
    })
  }),
  style: stylePolygon('#fe9929'),
  opacity: .6,
  visible: false
});

let harvestTreatment = new ol.layer.Vector({
  title: 'Harvest Treatment',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_harvest_treatment.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#ec7014'),
  opacity: .6,
  visible: false
});

let hoonahLogTransfer = new ol.layer.Vector({
  title: 'Log Transfer Facilities',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_log_transfer_fac.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#993404'),
  opacity: .95,
  visible: false
});

let hoonahPlaceNamesEng = new ol.layer.Vector({
  title: 'Points of Interest',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_place_names_eng.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#fddaec'),
  opacity: .95,
  visible: false
});

let hoonahProjectBoundary = new ol.layer.Vector({
  title: 'Project Boundary',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_project_boundary.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#f2f2f2'),
  opacity: .5,
  visible: false
});

let hoonahTowns = new ol.layer.Vector({
  title: 'Towns',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_towns.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#dd3497'),
  opacity: .95,
  visible: false
});


let watersheds = new ol.layer.Vector({
  title: 'Watersheds',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/watersheds.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#6baed6'),
  opacity: .6,
  visible: false
});

let hoonahStreams = new ol.layer.Vector({
  title: 'Streams',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_streams_30.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: styleLine('#c6dbef'),
  opacity: .85,
  visible: false
});

let salmonStreams = new ol.layer.Vector({
  title: 'Salmon Streams',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_salmon_streams.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: styleLine('#08519c'),
  opacity: .85,
  visible: false
});

var timberGroup = new ol.layer.Group({
  title: 'Logging',
  layers: [
    areaHarvested,
    harvestTreatment,
    hoonahLogTransfer,
  ]
});

var hydroGroup = new ol.layer.Group({
  title: 'Hydrography',
  layers: [
    watersheds,
    hoonahStreams,
    salmonStreams,
  ]
})

var featuresGroup = new ol.layer.Group({
  title: 'Features',
  layers: [
    hoonahTowns,
    hoonahCabins,
    hoonahPlaceNamesEng,
    hoonahProjectBoundary,
  ]
});

var stewardInputGroup = new ol.layer.Group({
  title: 'Stewards Input',
  layers: [
    vectorLayer,
    observationLayer,
  ]
});

var projectsGroup = new ol.layer.Group({
  title: 'Land Use Projects',
  layers: [
    projectLayer
  ]
});

// add layers to need to be in switcher menu
// add layers to switcher
// then add the layers that dont need to be in switcher menu
map.getLayers().push(hydroGroup);
map.getLayers().push(timberGroup);
map.getLayers().push(featuresGroup);

var switcher = new ol.control.LayerSwitcher({
  target: $("#visible-themes").get(0),
	show_progress: true,
	extent: false,
	trash: true,
	oninfo: function (l) {
    alert(l.get("title"));
  }
});
map.addControl(switcher);

// Add a layer to a pre-exiting ol.layer.Group after the LayerSwitcher has
// been added to the map. The layer will appear in the list the next time
// the LayerSwitcher is shown or LayerSwitcher#renderPanel is called.
map.getLayers().push(stewardInputGroup);
map.getLayers().push(projectsGroup);
