
AFRAME.registerComponent('peakfinder', {
  init: function() {
    console.log('init peakfinder');
    this.loaded = false;
    window.addEventListener('gps-camera-update-position', e => {
      // console.log('gps-camera-update-position', e);
      if(this.loaded === false) {
        this._loadPeaks(e.detail.position.longitude, e.detail.position.latitude);
        this.loaded = true;
      }
    });
    this.scene = document.getElementById('#scene');
    this.scene.addEventListener("twofingermove", this.handleScale.bind(this));
  },
  _loadPeaks: function(longitude, latitude) {
    const scale = 3000;
    this._peakList.features.filter ( f => f.properties.natural == 'peak' )
      .forEach (peak => {
        const entity = document.createElement('a-text');
        entity.setAttribute('look-at', '[gps-projected-camera]');
        entity.setAttribute('value', peak.properties.name);
        entity.setAttribute('align', 'center');
        entity.setAttribute('color', 'red');
        entity.setAttribute('scale', {
          x: scale,
          y: scale,
          z: scale
        });
        entity.setAttribute('gps-projected-entity-place', {
          latitude: peak.geometry.coordinates[1],
          longitude: peak.geometry.coordinates[0]
        });
        // console.log('entity is', entity, entity.getAttribute('gps-projected-entity-place'), entity.getAttribute('scale'), entity.getAttribute('look-at'));
        this.el.appendChild(entity);
      });
  },
  handleScale(event) {
    console.log('trying to scale', this.scaleFactor, event.detail.spreadChange, event.detail.startSpread)
    this.scaleFactor = this.scaleFactor || 3000;
    this.scaleFactor *=
      1 + event.detail.spreadChange / event.detail.startSpread;

    this.scaleFactor = Math.min(
      Math.max(this.scaleFactor, 1500),
      6000
    );

    console.log("scaling of some sort", this.scaleFactor)
    this.el.childNodes.forEach(node => {
      node.object3D.scale.set(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    });
  },
  _peakList: {
    "features": [
      {
        "type": "Feature",
        "properties":
          {
            "osm_id": 2209,
            "name": "MATSONIA",
            "natural": "peak",
            "featuretype": "vessel"
          },
        "geometry": {"type": "Point", "coordinates": [-122.303163, 37.771927]}
      },
      {
        "type": "Feature",
        "properties":
          {
            "osm_id": 34717,
            "name": "HORIZON SPIRIT",
            "natural": "peak",
            "featuretype": "vessel"
          },
        "geometry": {"type": "Point", "coordinates": [-122.309125, 37.794537]}
      },
      {
        "type": "Feature",
        "properties":
          {
            "osm_id": 553,
            "name": "HYUNDAI MARS",
            "natural": "peak",
            "featuretype": "vessel"
          },
        "geometry": {"type": "Point", "coordinates": [-122.320028, 37.813298]}
      },
      {
        "type": "Feature",
        "properties":
          {
            "osm_id": 764,
            "name": "EVER LOYAL",
            "natural": "peak",
            "featuretype": "vessel"
          },
        "geometry": {"type": "Point", "coordinates": [-122.338888, 37.80809]}
      },
      {
        "type": "Feature",
        "properties":
          {
            "osm_id": 1040,
            "name": "MSC CAMILLE",
            "natural": "peak",
            "featuretype": "vessel"
          },
        "geometry": {"type": "Point", "coordinates": [-122.314907, 37.79589]}
      },
      {
        "type": "Feature",
        "properties":
          {
            "osm_id": 1780,
            "name": "CAP SAN JUAN",
            "natural": "peak",
            "featuretype": "vessel"
          },
        "geometry": {"type": "Point", "coordinates": [-122.32005, 37.797217]}
      },
      {
        "type": "Feature",
        "properties":
          {
            "osm_id": 745,
            "name": "NYK CONSTELLATION",
            "natural": "peak",
            "featuretype": "vessel"
          },
        "geometry": {"type": "Point", "coordinates": [-122.322752, 37.798085]}
      },
      {
        "type": "Feature",
        "properties": {
          "osm_id": "345xxxxxx",
          "name": "Twin\nPeaks",
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
          "osm_id": "344xxxxxx",
          "name": "Mt. Diablo",
          "natural": "peak",
          "featuretype": "hill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -121.49142,
            37.8816
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "osm_id": "344xxxxxx",
          "name": "8.5 km Point",
          "natural": "peak",
          "featuretype": "hill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -122.348388,
            37.788838
            // -122.332721,
            // 37.803124
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "osm_id": "346xxxxxx",
          "name": "Mission Point",
          "natural": "peak",
          "featuretype": "hill"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [34.311713, -118.533824]
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
