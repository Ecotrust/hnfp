var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        preload: Infinity,
        url:'//{1-4}.aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png?app_id=p5jWgIultJxoVtXb03Xl&app_code=Cpj_I6Yx3J3yhVFE7aD12Q',
        attributions: 'Map Tiles &copy; ' + new Date().getFullYear() + ' ' + '<a href="http://developer.here.com">HERE</a>',
      })
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-135.44, 58.10]),
    zoom: 10
  }),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }).extend([mousePositionControl]),
});

var features = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
  source: new ol.source.Vector({features: features}),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#3399CC',
      width: 1.25
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({
        color: '#ffcc11'
      })
    })
  })
});
featureOverlay.setMap(map);

var draw;

function addInteraction() {
  draw = new ol.interaction.Draw({
    features: features,
    type: 'Point',
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#d53f38'
        }),
        stroke: new ol.style.Stroke({
          color: '#ffffff',
          width: 1.5
        })
      })
    })
  });

  map.addInteraction(draw);

  draw.on('drawend', function(e) {
    
  });
}
