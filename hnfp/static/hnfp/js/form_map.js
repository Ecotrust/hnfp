var initMap = function() {
  console.log('now');
  var watershedLayer = new ol.layer.Vector({
    title: 'Watersheds',
    source: new ol.source.Vector({
      url: "/static/hnfp/js/data/watersheds.geojson",
      format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ddd83d',
        width: 1.6
      }),
      text: new ol.style.Text({
        font: '8px function, serif',
        text: 'hello',
        fill: new ol.style.Fill({
          color: '#666'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 2
        })
      })
    })
  });

  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      watershedLayer
    ],
    target: 'map',
    view: new ol.View({
      center: [-135, 80],
      zoom: 10
    })
  });

  var layerSwitcher = new ol.control.LayerSwitcher({});
  map.addControl(layerSwitcher);

  var select = new ol.interaction.Select();
  map.addInteraction(select);

  var selectedFeatures = select.getFeatures();

  selectedFeatures.on(['add', 'remove'], function() {
    var names = selectedFeatures.getArray().map(function(feature) {
      return feature.get('name');
    });
    if (names.length > 0) {
      infoBox.innerHTML = names.join(', ');
    } else {
      infoBox.innerHTML = 'No countries selected';
    }
  });
};
