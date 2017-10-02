var initMap = function() {
  var watershedLayer = new ol.layer.Vector({
    title: 'Watersheds',
    source: new ol.source.Vector({
      url: "/static/hnfp/js/data/watersheds.geojson",
      format: new ol.format.GeoJSON()
    }),
    style: function(feature, resolution) {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#666',
          width: 1.75
        }),
        text: new ol.style.Text({
          font: '9px function, serif',
          text: feature.getProperties().NAME,
          fill: new ol.style.Fill({
            color: '#666'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 1
          })
        })
      })
    }
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
      center: ol.proj.fromLonLat([-135.44, 58.10]),
      zoom: 10
    })
  });

  var layerSwitcher = new ol.control.LayerSwitcher({});
  map.addControl(layerSwitcher);

  var popupNode = document.getElementById('popup');
  var popup = new ol.Overlay({
    element: popupNode,
  });

  var select = new ol.interaction.Select();
  map.addInteraction(select);

  var selectedFeatures = select.getFeatures();

  selectedFeatures.on('add', function(event) {
    let feature = selectedFeatures.getArray().map(function(feature) {
      return feature;
    });
    map.addOverlay(popup);
    addOverlayPopup(feature);
    $('#region-name').text(feature);
    $('#region').val(feature);
  });

  function addOverlayPopup(feature) {
    console.log(feature);
    let coords = feature.getGeometry().getExtent();
    let featuresProps = feature.getProperties();
    let domElement = popup.getElement();
    domElement.querySelector('.card-content').innerHTML = `
      <span class="center card-title">${featuresProps.NAME}</span>
      <input type="number" id="regiontally" name="regiontally" />
    `;
    domElement.querySelector('.card-action').innerHTML = `

    `;
    popup.setPosition(coords);
  }
};
