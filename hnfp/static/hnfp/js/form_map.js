var stamenWatercolor = new OpenLayers.Layer.XYZ( 'watercolor', [
  'http://a.tile.stamen.com/watercolor/${z}/${x}/${y}.png',
  'http://b.tile.stamen.com/watercolor/${z}/${x}/${y}.png',
  'http://c.tile.stamen.com/watercolor/${z}/${x}/${y}.png',
  'http://d.tile.stamen.com/watercolor/${z}/${x}/${y}.png'
], {
    attributions:'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL',
    sphericalMercator: true,
    wrapDateLine: true,
    numZoomLevels: 18,
    MAX_ZOOM_LEVEL: 17,
});

var hereAerial = new OpenLayers.Layer.XYZ('Aerial', 'http://crossorigin.met/https://crossorigin.me/https://1.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/${z}/${x}/${y}/256/png8?surveyMap_id=p5jWgIultJxoVtXb03Xl&surveyMap_code=Cpj_I6Yx3J3yhVFE7aD12Q', {
  isBaseLayer: true,
  numZoomLevels: 20,
  attribution: "Basemap by Here",
  textColor: "white"
});

var layer = new OpenLayers.Layer.Vector("watersheds", {
  protocol: new OpenLayers.Protocol.HTTP({
    url: "/js/data/watersheds.geojson",
    format: new OpenLayers.Format.JSON()
  })
});

var surveyMap = {
  init: function() {
    new OpenLayers.Map('map', {
      layers: [
        stamenWatercolor,
        hereAerial
      ],
      displayProjection: new OpenLayers.Projection("EPSG:4326"),
      projection: "EPSG:3857",
      zoomBox: new OpenLayers.Control.ZoomBox({})
    });
  }
};
