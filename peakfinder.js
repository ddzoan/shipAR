
AFRAME.registerComponent('peakfinder', {
  init: function() {
    console.log('init peakfinder');
    this.loaded = false;
    window.addEventListener('gps-camera-update-position', e => {
      console.log('gps-camera-update-position', e);
      if(this.loaded === false) {
        this._loadPeaks(e.detail.position.longitude, e.detail.position.latitude);
        this.loaded = true;
      }
    });
  },
  _loadPeaks: function(longitude, latitude) {
    const scale = 3000;
    this._peakList.features.filter ( f => f.properties.natural == 'peak' )
      .forEach (peak => {
        const entity = document.createElement('a-text');
        entity.setAttribute('look-at', '[gps-projected-camera]');
        entity.setAttribute('value', peak.properties.name);
        entity.setAttribute('scale', {
          x: scale,
          y: scale,
          z: scale
        });
        entity.setAttribute('gps-projected-entity-place', {
          latitude: peak.geometry.coordinates[1],
          longitude: peak.geometry.coordinates[0]
        });
        console.log('entity is', entity, entity.getAttribute('gps-projected-entity-place'), entity.getAttribute('scale'), entity.getAttribute('look-at'));
        this.el.appendChild(entity);
      });
  },
  _peakList: {
    "features": [
      {
        "type": "Feature",
        "properties": {
          "osm_id": "345xxxxxx",
          "name": "Twin Peaks",
          "natural": "peak",
          "featuretype": "hill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.4474,
            37.7529
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "osm_id": "346xxxxxx",
          "name": "Baby Peak",
          "natural": "peak",
          "featuretype": "hill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -157.79,
            21.27
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "osm_id": "347xxxxxx",
          "name": "Konahuanui",
          "natural": "peak",
          "featuretype": "hill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -157.7887,
            21.35320
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "osm_id": "348xxxxxx",
          "name": "Kaala",
          "natural": "peak",
          "featuretype": "hill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            // -158.142552,
            -157.7887,
            // 21.50788
            21.365
          ]
        }
      }
    ],
    "type": "FeatureCollection"
  }
});
