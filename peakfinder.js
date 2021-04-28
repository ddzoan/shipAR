const DEFAULT_SCALE = 1000;
const ships = [];

AFRAME.registerComponent('peakfinder', {
  init: function() {
    console.log('init peakfinder');
    this.loaded = false;
    window.addEventListener('gps-camera-update-position', e => {
      // console.log('gps-camera-update-position', e);
      if(this.loaded === false) {
        this.loadShips(e.detail.position.longitude, e.detail.position.latitude);
        this.loaded = true;
      }
    });
    this.scene = document.getElementById('#scene');
    this.scene.addEventListener("twofingermove", this.handleScale.bind(this));
  },
  loadShips: function(longitude, latitude) {
    const scale = DEFAULT_SCALE;
    this._peakList.features.filter ( f => f.properties.natural == 'peak' )
      .forEach (peak => {
        const entity = document.createElement('a-text');
        ships.push(entity);
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
    this.scaleFactor = this.scaleFactor || DEFAULT_SCALE;
    this.scaleFactor *=
      1 + event.detail.spreadChange / event.detail.startSpread;

    this.scaleFactor = Math.min(
      Math.max(this.scaleFactor, DEFAULT_SCALE/2),
      DEFAULT_SCALE*2
    );

    console.log("scaling of some sort", this.scaleFactor)
    ships.forEach(node => {
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
    ],
    "type": "FeatureCollection"
  }
});
