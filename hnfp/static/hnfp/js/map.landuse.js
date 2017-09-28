$(document).ready(function() {
  var scaleLineControl = new ol.control.ScaleLine();
  map.addControl(scaleLineControl);
});

var allFeatures = [];

var drawPolygon,
    snapPolygon,
    polygonModify,
    projectSource = new ol.source.Vector(),
    projectVector = new ol.layer.Vector({
      source: projectSource,
      map: map,
      style: polygonStyle
    });

function drawProjectArea() {
  drawPolygon = new ol.interaction.Draw({
    source: projectSource,
    type: 'MultiPolygon'
  });
  map.addInteraction(drawPolygon);
  snapPolygon = new ol.interaction.Snap({source: projectSource});
  map.addInteraction(snapPolygon);
  polygonModify = new ol.interaction.Modify({source: projectSource});
  map.addInteraction(polygonModify);
};

function drawEnd() {
  drawPolygon.on('drawend', function(e,i) {
    let newFeature = e.feature.getGeometry().getCoordinates()[0];
  });
}

function addProjectToMap(data) {
  let geo = JSON.parse(data.area);
  let newPoly = new ol.Feature();
  vectorSource.addFeature(newPoly);
  newPoly.setGeometry(new ol.geom.Polygon(geo.coordinates));
  newPoly.setStyle(polygonStyle)
}


if (typeof all_projects !== 'undefined') {
  for (var i = 0; i < all_projects.length; i++) {
    let geo = JSON.parse(all_projects[i].area);
    let newPoly = new ol.Feature();
    vectorSource.addFeature(newPoly);
    newPoly.setGeometry(new ol.geom.Polygon(geo.coordinates));
    newPoly.setStyle(polygonStyle)
  }
  for (var i = 0; i < all_public_projects.length; i++) {
    addProjectToMap(all_public_projects[i]);
  }
}

var polygonStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.2)'
  }),
  stroke: new ol.style.Stroke({
    color: '#ffcc33',
    width: 2
  }),
  image: new ol.style.Circle({
    radius: 7,
    fill: new ol.style.Fill({
      color: '#ffcc33'
    })
  })
})
