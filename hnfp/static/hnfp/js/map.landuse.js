$(document).ready(function() {
  var scaleLineControl = new ol.control.ScaleLine();
  map.addControl(scaleLineControl);
  var landuseFullScreen = new ol.control.FullScreen({
    source: 'land-use'
  })
  map.addControl(landuseFullScreen);
  landuseMap.hideAlerts();
  landuseMap.hideObservations();
});

var allFeatures = [];
var landuseMap = {
  layerOpacity: 0.7,
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
  },
  newLayerGeoJSON: function(name, data, styling) {
    return new ol.layer.Vector({
      title: name,
      source: new ol.source.Vector({
        url: data,
        format: new ol.format.GeoJSON(),
      }),
      style: styling,
      opacity: landuseMap.layerOpacity,
      visible: false
    })
  },
  returnStyle: function(lineColor, strokeWidth) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: lineColor,
        width: strokeWidth
      })
    })
  },
  hoonahRoadBrushingPriorities: function() {
    return landuseMap.newLayerGeoJSON(
      'Road Brushing',
      '/static/hnfp/js/data/hoonah_brushing_priority.geojson',
      function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            communityRank = feature.get('Community_'),
            lineColor = '#ccc';
        if (communityRank == 1) {
          lineColor = 'rgb(81,77,201)';
        } else if (communityRank == 2) {
          lineColor = 'rgb(58,201,42)';
        } else if (communityRank == 3) {
          lineColor = 'rgb(201,99,44)';
        }
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: strokeWidth
          })
        })
      }
    )
  },
  hoonahOpenPriority: function() {
    return landuseMap.newLayerGeoJSON(
      'Road Opening Priority',
      '/static/hnfp/js/data/hoonah_open_priority.geojson',
      function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            rank = feature.get('CommunityP'),
            lineColor = '#ffffff';
        if (rank == 1) {
          lineColor = 'rgb(245,174,93)';
        } else if (rank == 2) {
          lineColor = 'rgb(235,101,223)';
        } else if (rank == 3) {
          lineColor = 'rgb(102,145,76)';
        } else if (rank == 4) {
          lineColor = 'rgb(91,83,237)';
        } else if (rank == 5) {
          lineColor = 'rgb(242,94,117)';
        }
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: strokeWidth
          })
        })
      }
    )
  },
  hoonahMinDeer: function() {
    return landuseMap.newLayerGeoJSON(
      'Minimum Deer Per Meter',
      '/static/hnfp/js/data/hoonah_min_deer.geojson',
      function(feature, resolution) {
        let rank = feature.get('gridcode'),
            fill = '#ffffff';
        if (rank <= 4) {
          fill = 'rgb(40,146,199)';
        } else if (rank == 5) {
          fill = 'rgb(160,194,155)';
        } else if (rank == 6) {
          fill = 'rgb(250,250,100)';
        } else if (rank == 7) {
          fill = 'rgb(250,141,52)';
        } else if (rank >= 8) {
          fill = 'rgb(232,16,20)';
        }
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: fill,
          })
        })
      }
    )
  },
  hoonahRoadCrossings: function() {
    return landuseMap.newLayerGeoJSON(
      'Road Crossings',
      '/static/hnfp/js/data/hoonah_road_crossing.geojson',
      function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            symbol = feature.get('Primary__1'),
            fill = '#ffffff';
        if (symbol == 'Bridge') {
          fill = 'rgb(164,168,108)';
        } else if (symbol == 'Culvert') {
          fill = 'rgb(102,85,230)';
        } else if (symbol == 'Waterbar') {
          fill = 'rgb(85,95,128)';
        } else if (symbol == 'Erosion/Landslide/Water On Road') {
          fill = 'rgb(92,242,87)';
        } else if (symbol == 'Non-engineered') {
          fill = 'rgb(245,91,111)';
        }
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: fill
            }),
            stroke: new ol.style.Stroke({
              color: fill,
              width: strokeWidth
            })
          })
        });
      }
    )
  },
  hoonahRoadOpps: function() {
    return landuseMap.newLayerGeoJSON(
      'Road Opportunities',
      '/static/hnfp/js/data/hoonah_road_opportunity.geojson',
      function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            symbol = feature.get('Priority'),
            fill = '#ffffff';
        if (symbol == 'H') {
          fill = 'rgb(255,200,0)';
        } else if (symbol == 'M') {
          fill = 'rgb(0,0,255)';
        } else if (symbol == 'L') {
          fill = 'rgb(255,0,81)';
        }
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: fill
            }),
            stroke: new ol.style.Stroke({
              color: fill,
              width: strokeWidth
            })
          })
        });
      }
    )
  },
  hoonahBridgeOpps: function() {
    return landuseMap.newLayerGeoJSON(
      'Bridge Opportunities',
      '/static/hnfp/js/data/hoonah_bridge_opportunity.geojson',
      function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            symbol = feature.get('Bridge_Typ'),
            fill = '#ffffff';
        if (symbol == 'Log') {
          fill = 'rgb(128,168,47)';
        } else if (symbol == 'Permanent') {
          fill = 'rgb(112,42,173)';
        }
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: fill
            }),
            stroke: new ol.style.Stroke({
              color: fill,
              width: strokeWidth
            })
          })
        });
      }
    )
  },
  streamCondition: function() {
    return landuseMap.newLayerGeoJSON(
      'Stream Condition',
      '/static/hnfp/js/data/hoonah_stream_condition.geojson',
      function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            symbol = feature.get('PFC_1'),
            lineColor = '#000';
        if (symbol == 'FARdownward') {
          lineColor = 'rgb(163,157,42)';
        } else if (symbol == 'NA') {
          lineColor = 'rgb(49,134,158)';
        } else if (symbol == 'PFC') {
          lineColor = 'rgb(173,38,142)';
        }
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: lineColor,
            width: strokeWidth
          })
        })
      }
    )
  },
  hoonahCommunityUse: function() {
    return new ol.layer.Group({
      title: 'Road Use',
      layers: [
        landuseMap.hoonahComUseBerries(),
        landuseMap.hoonahComUseDeer(),
        landuseMap.hoonahComUseFish(),
        landuseMap.hoonahComUseMedicine()
      ],
    });
  },
  hoonahComUseSource: function() {
    return new ol.source.Vector({
      url: '/static/hnfp/js/data/hoonah_community_use.geojson',
      format: new ol.format.GeoJSON(),
    });
  },
  hoonahComUseBerries: function() {
    return new ol.layer.Vector({
      title: 'Berries',
      source: landuseMap.hoonahComUseSource(),
      style: function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            feat = feature.get('berries'),
            lineColor = '#000000';
        if (feat < 1) {
          lineColor = 'rgb(0,0,255)';
        } else if (feat >= 1 && feat <= 7) {
          lineColor = 'rgb(51,194,255)';
        } else if (feat >= 8 && feat <= 14) {
          lineColor = 'rgb(182,255,143)';
        } else if (feat >= 15 && feat <= 26) {
          lineColor = 'rgb(255,200,0)';
        } else if (feat >= 27) {
          lineColor = 'rgb(255,0,0)';
        }
        return landuseMap.returnStyle(lineColor,strokeWidth);
      },
      opacity: landuseMap.layerOpacity,
      visible: false
    });
  },
  hoonahComUseDeer: function() {
    return new ol.layer.Vector({
      title: 'Deer',
      source: landuseMap.hoonahComUseSource(),
      style: function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            feat = feature.get('deer'),
            lineColor = '#000000';
        if (feat == 0) {
          lineColor = 'rgb(0,0,255)';
        } else if (feat >= 1 && feat <= 7) {
          lineColor = 'rgb(51,194,255)';
        } else if (feat >= 8 && feat <= 14) {
          lineColor = 'rgb(182,255,143)';
        } else if (feat >= 15 && feat <= 22) {
          lineColor = 'rgb(255,200,0)';
        } else if (feat >= 23) {
          lineColor = 'rgb(255,0,0)';
        }
        return landuseMap.returnStyle(lineColor,strokeWidth);
      },
      opacity: landuseMap.layerOpacity,
      visible: false
    })
  },
  hoonahComUseFish: function() {
    return new ol.layer.Vector({
      title: 'Fish',
      source: landuseMap.hoonahComUseSource(),
      style: function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            feat = feature.get('fish'),
            lineColor = '#000000';
        if (feat == 0) {
          lineColor = 'rgb(0,0,255)';
        } else if (feat >= 1 && feat <= 2) {
          lineColor = 'rgb(51,194,255)';
        } else if (feat > 2 && feat <= 3) {
          lineColor = 'rgb(182,255,143)';
        } else if (feat >= 4 && feat <= 6) {
          lineColor = 'rgb(255,200,0)';
        } else if (feat >= 7) {
          lineColor = 'rgb(255,0,0)';
        }
        return landuseMap.returnStyle(lineColor,strokeWidth);
      },
      opacity: landuseMap.layerOpacity,
      visible: false
    })
  },
  hoonahComUseMedicine: function() {
    return new ol.layer.Vector({
      title: 'Medicinal',
      source: landuseMap.hoonahComUseSource(),
      style: function(feature, resolution) {
        let strokeWidth = setStroke(resolution),
            feat = feature.get('Medicinal'),
            lineColor = '#000000';
        if (feat == 0) {
          lineColor = 'rgb(0,0,255)';
        } else if (feat >= 1 && feat <= 2) {
          lineColor = 'rgb(51,194,255)';
        } else if (feat > 2 && feat <= 3) {
          lineColor = 'rgb(182,255,143)';
        } else if (feat >= 3.1 && feat <= 4) {
          lineColor = 'rgb(255,200,0)';
        } else if (feat >= 5) {
          lineColor = 'rgb(255,0,0)';
        }
        return landuseMap.returnStyle(lineColor,strokeWidth);
      },
      opacity: landuseMap.layerOpacity,
      visible: false
    })
  },
  harvestTreatment: function() {
    return new ol.layer.Vector({
      title: 'Harvest Treatment',
      source: new ol.source.Vector({
        url: '/static/hnfp/js/data/hoonah_harvest_treatment.geojson',
        format: new ol.format.GeoJSON()
      }),
      style: function(feature, resolution) {
        let feat = feature.get('PCT_YR'),
            fill = '#000000';
        if (feat == 0) {
          fill = 'rgb(255,0,0)';
        } else if (feat >= 1 && feat <= 2001) {
          fill = 'rgb(255,200,0)';
        } else if (feat >= 2002 && feat <= 2006) {
          fill = 'rgb(182,255,143)';
        } else if (feat >= 2007 && feat <= 2011) {
          fill = 'rgb(51,194,255)';
        } else if (feat >= 2012 && feat <= 2015) {
          fill = 'rgb(0,0,255)';
        }
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: fill
          })
        })
      },
      opacity: .6,
      visible: false
    });
  },
  /**
    * map layers with feature based styles
    */
  /* hoonahRoadBrushingPriorities: new ol.layer.Vector({
    title: 'Road Brushing Priority',
    source: new ol.source.Vector({
      url: '/static/hnfp/js/data/hoonah_brushing_priority.geojson',
      format: new ol.format.GeoJSON()
    }),
    style: function(feature, resolution) {
      let strokeWidth = setStroke(resolution),
          communityRank = feature.get('Community_'),
          lineColor = '#ccc';
      if (communityRank == 1) {
        lineColor = 'rgb(81,77,201)';
      } else if (communityRank == 2) {
        lineColor = 'rgb(58,201,42)';
      } else if (communityRank == 3) {
        lineColor = 'rgb(201,99,44)';
      }
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: lineColor,
          width: strokeWidth
        })
      })
    },
    opacity: .85,
    visible: false
  }), */
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
      type: 'MultiPolygon'
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
  allowDragPan(false);
}

function removeProjectInteractions() {
  map.removeInteraction(drawPolygon);
  map.removeInteraction(snapPolygon);
  map.removeInteraction(polygonModify);
  allowDragPan();
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
  newPoly.setGeometry(new ol.geom.MultiPolygon(geo.coordinates));
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
      'username': data.username,
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
if (all_shared_projects !== 'undefined') {
  for (var i = 0; i < all_shared_projects.length; i++) {
    addProjectToMap(all_shared_projects[i]);
  }
}
if (typeof all_public_projects !== 'undefined') {
  for (var i = 0; i < all_public_projects.length; i++) {
    addProjectToMap(all_public_projects[i]);
  }
}

// function styleLegend(feature, color) {
//   console.log(feature.getProperties());
//   console.log(color);
//   $('visible-themes').html(`
//
//   `)
// }

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
    let strokeWidth = 1.75;
    if (resolution < 1) {
      strokeWidth = 6;
    } else if (resolution < 8) {
      strokeWidth = 5;
    } else if (resolution < 16) {
      strokeWidth = 3.5;
    } else if (resolution < 28) {
      strokeWidth = 2.75;
    } else if (resolution < 40) {
      strokeWidth = 2.25;
    } else if (resolution < 50) {
      strokeWidth = 2;
    }
    // styleLegend(feature, lineColor);
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: lineColor,
        width: strokeWidth
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.4)'
      })
    });
  };
}

function stylePoint(pointColor) {
    return function(feature, resolution) {
        let radius = 8;
        if (resolution < 1) {
          radius = 12;
        } else if (resolution < 8) {
          radius = 11
        } else if (resolution < 30) {
          radius = 10
        }
        return new ol.style.Style({
          image: new ol.style.Circle({
          radius: radius,
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
}

function setStroke(resolution) {
  let strokeWidth = 1;
  if (resolution < 1) {
    strokeWidth = 5;
  } else if (resolution < 8) {
    strokeWidth = 4;
  } else if (resolution < 16) {
    strokeWidth = 3;
  } else if (resolution < 28) {
    strokeWidth = 2;
  }
  return strokeWidth;
}

var hoonahCabins = new ol.layer.Vector({
  title: 'Cabins',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_cabins.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#decbe4'),
  opacity: .95,
  visible: false
});

var areaHarvested = new ol.layer.Vector({
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

var hoonahLogTransfer = new ol.layer.Vector({
  title: 'Log Transfer Facilities',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_log_transfer_fac.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#993404'),
  opacity: .95,
  visible: false
});

var hoonahPlaceNamesEng = new ol.layer.Vector({
  title: 'Points of Interest',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_place_names_eng.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#fddaec'),
  opacity: .95,
  visible: false
});

var hoonahProjectBoundary = new ol.layer.Vector({
  title: 'Project Boundary',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_project_boundary.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#f2f2f2'),
  opacity: .5,
  visible: false
});

var hoonahTowns = new ol.layer.Vector({
  title: 'Towns',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_towns.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePoint('#dd3497'),
  opacity: .95,
  visible: false
});

var watersheds = new ol.layer.Vector({
  title: 'Watersheds',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/watersheds.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#6baed6'),
  opacity: .6,
  visible: false
});

var hoonahStreams = new ol.layer.Vector({
  title: 'Streams',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_streams_30.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: styleLine('#96cfe1'),
  opacity: .9,
  visible: false
});

var salmonStreams = new ol.layer.Vector({
  title: 'Probable Anadromous fish',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_anad_fish.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: styleLine('rgb(255,167,127)'),
  opacity: .85,
  visible: false
});

var residentFish = new ol.layer.Vector({
  title: 'Probable Resident fish',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/hoonah_resident_fish.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: styleLine('#df73ff'),
  opacity: .85,
  visible: false
});

var brownBearEnhancementUnits = new ol.layer.Vector({
  title: 'Brown Bear enhancement units',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/bear_enhance.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#5d4824'),
  opacity: .85,
  visible: false
});

var blueberryEnhancementUnits = new ol.layer.Vector({
  title: 'Blueberry enhancement units',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/blueberry_enhance.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#6574ff'),
  opacity: .85,
  visible: false
});

var timberDeerEnhancement = new ol.layer.Vector({
  title: 'Timber/Deer enhancement units',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/deer_timber_enhance.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: stylePolygon('#ff0063'),
  opacity: .85,
  visible: false
});

var streamRestorationHydro = new ol.layer.Vector({
  title: 'Stream restoration - hdyro',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/stream_opportunities.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: styleLine('#4ea3c2'),
  opacity: .85,
  visible: false
});

var streamRestorationFish = new ol.layer.Vector({
  title: 'Stream restoration - fish',
  source: new ol.source.Vector({
    url: '/static/hnfp/js/data/yg_strm_fish.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: styleLine('#01b9fc'),
  opacity: .85,
  visible: false
});

/**
 * GROUPS
 * for map layer switcher
 */
var timberGroup = new ol.layer.Group({
  title: 'Resources',
  layers: [
    areaHarvested,
    landuseMap.harvestTreatment(),
    landuseMap.hoonahMinDeer(),
    brownBearEnhancementUnits,
    blueberryEnhancementUnits,
    timberDeerEnhancement,
  ]
});

var hydroGroup = new ol.layer.Group({
  title: 'Hydrography',
  layers: [
    salmonStreams,
    residentFish,
    hoonahStreams,
    landuseMap.streamCondition(),
    watersheds,
    streamRestorationHydro,
    streamRestorationFish,
  ]
});

var communityGroup = new ol.layer.Group({
  title: 'Community Use & Priorities',
  layers: [
    landuseMap.hoonahCommunityUse(),
    landuseMap.hoonahRoadBrushingPriorities(),
    landuseMap.hoonahOpenPriority(),
  ]
})

var stewardInputGroup = new ol.layer.Group({
  title: 'Stewards Input',
  layers: [
    vectorLayer,
    observationLayer,
  ]
});

var projectsGroup = new ol.layer.Group({
  title: 'Other Projects',
  layers: [
    projectLayer,
  ]
});

/**
 * add cabins and log transfer facilities to infrastructureGroup
 */
infrastructureGroup.getLayers().push(hoonahCabins);
infrastructureGroup.getLayers().push(hoonahLogTransfer);
infrastructureGroup.getLayers().push(landuseMap.hoonahRoadOpps());
infrastructureGroup.getLayers().push(landuseMap.hoonahBridgeOpps());
infrastructureGroup.getLayers().push(landuseMap.hoonahRoadCrossings());


baseLayers.getLayers().push(hoonahTowns);
baseLayers.getLayers().push(hoonahPlaceNamesEng);
baseLayers.getLayers().push(hoonahProjectBoundary);
/**
 * add layers to need to be in switcher menu
 * then add layers to switcher
 * then add the layers that dont need to be in switcher menu
 */
map.getLayers().push(communityGroup);
map.getLayers().push(hydroGroup);
map.getLayers().push(timberGroup);

// Add a layer to a pre-exiting ol.layer.Group after the LayerSwitcher has
// been added to the map. The layer will appear in the list the next time
// the LayerSwitcher is shown or LayerSwitcher#renderPanel is called.
map.getLayers().push(stewardInputGroup);
map.getLayers().push(projectsGroup);

/**
 * map legend
 * aka map key
 */
// function getColor(layer) {
//   var layerSource = layer.getSource();
//   if (layerSource instanceof ol.source.Vector) {
//     layerSource.forEachFeature(function(feature) {
//       styleLegend(feature);
//     });
//   }
// }
//
// map.getLayers().forEach(function(layer) {
//   if (layer instanceof ol.layer.Group) {
//     layer.getLayers().forEach(function(sublayer) {
//       if (sublayer.getVisible()) {
//         var sublayerTitle = sublayer.get('title');
//         addToLegend(sublayer, sublayerTitle);
//       }
//     });
//   } else if (layer instanceof ol.layer.Vector) {
//     getColor(sublayer);
//   }
// });
//
// function addToLegend(layer, title) {
//   $("#visible-themes").append(title);
//   console.log(layer.get('stroke'));
// }
