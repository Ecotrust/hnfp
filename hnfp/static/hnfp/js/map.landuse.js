$(document).ready(function() {
  var scaleLineControl = new ol.control.ScaleLine();
  map.addControl(scaleLineControl);
});

var allFeatures = [];
var landuseMap = {
  removePopup: function() {
    map.removeEventListener('click')
  }
}

var snapPolygon,
    polygonModify,
    projectSource = new ol.source.Vector(),
    projectVector = new ol.layer.Vector({
      source: projectSource,
      map: map,
      style: polygonStyle
    }),
    drawPolygon = new ol.interaction.Draw({
      source: projectSource,
      type: 'Polygon'
    });

function drawProjectArea() {
  snapPolygon = new ol.interaction.Snap({source: projectSource});
  polygonModify = new ol.interaction.Modify({source: projectSource});
  addProjectInteractions();
};

projectSource.on('addfeature', function() {
  let format = new ol.format["GeoJSON"]();
  let formated = format.writeFeatures( projectSource.getFeatures() );
  landuseProject.addProjArea(formated);
  removeProjectInteractions();
});

function addProjectInteractions() {
  map.addInteraction(drawPolygon);
  map.addInteraction(snapPolygon);
  map.addInteraction(polygonModify);
}

function removeProjectInteractions() {
  map.removeInteraction(drawPolygon);
  map.removeInteraction(snapPolygon);
  map.removeInteraction(polygonModify);
  mapAddPopup();
}

function addProjectToMap(data) {
  let geo = JSON.parse(data['area']);
  let newPoly = new ol.Feature();
  vectorSource.addFeature(newPoly);
  newPoly.setGeometry(new ol.geom.Polygon(geo.coordinates));
  newPoly.setStyle(polygonStyle)
  if (typeof(all_projects[i]) !== 'undefined') {
    newPoly.setProperties({
      'id': all_projects[i].id,
      'area': all_projects[i].area,
      'name': all_projects[i].name,
      'category': all_projects[i].category,
      'summary': all_projects[i].summary,
      'start_date': all_projects[i].start_date,
      'end_date': all_projects[i].end_date,
    });
  }
}


if (typeof all_projects !== 'undefined') {
  for (var i = 0; i < all_projects.length; i++) {
    addProjectToMap(all_projects[i]);
  }
  for (var i = 0; i < all_public_projects.length; i++) {
    addProjectToMap(all_public_projects[i]);
  }
}

var polygonStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.1)'
  }),
  stroke: new ol.style.Stroke({
    color: '#ffcc33',
    width: 3
  })
});

function stylePolygon(fillColor) {
  return function(feature, resolution) {
    let strokeWidth = 1;
    if (resolution < 4) {
      strokeWidth = 3;
    } else if (resolution < 15) {
      strokeWidth = 2;
    } else if (resolution < 25) {
      strokeWidth = 1.5;
    }
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: fillColor / 1.5,
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

var projectGroup = new ol.layer.Group({
  title: 'Data',
  layers: [
    hoonahStreams,
    salmonStreams,
    areaHarvested,
    hoonahCabins,
    harvestTreatment,
    hoonahLogTransfer,
    hoonahPlaceNamesEng,
    hoonahProjectBoundary,
    hoonahTowns,
    watersheds,
  ]
});
// Add a layer to a pre-exiting ol.layer.Group after the LayerSwitcher has
// been added to the map. The layer will appear in the list the next time
// the LayerSwitcher is shown or LayerSwitcher#renderPanel is called.
map.getLayers().push(projectGroup);

var switcher = new ol.control.LayerSwitcher({
  target: $("#visible-themes").get(0),
	show_progress: true,
	extent: true,
	trash: true,
	oninfo: function (l) {
    alert(l.get("title"));
  }
});
map.addControl(switcher);
