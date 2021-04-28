const DEFAULT_SCALE = 1000;
const ships = [];
const MAXY = 5000;
const MINY = -2000; // don't know why, my ship text is getting cut off a little below this

const shipList = [
  {
    "properties":
      {
        "name": "MATSONIA",
        "natural": "peak",
        "featuretype": "vessel"
      },
    "geometry": {"type": "Point", "coordinates": [-122.303163, 37.771927]}
  },
  {
    "properties":
      {
        "name": "HORIZON SPIRIT",
        "natural": "peak",
        "featuretype": "vessel"
      },
    "geometry": {"type": "Point", "coordinates": [-122.309125, 37.794537]}
  },
  {
    "properties":
      {
        "name": "HYUNDAI MARS",
        "natural": "peak",
        "featuretype": "vessel"
      },
    "geometry": {"type": "Point", "coordinates": [-122.320028, 37.813298]}
  },
  {
    "properties":
      {
        "name": "EVER LOYAL",
        "natural": "peak",
        "featuretype": "vessel"
      },
    "geometry": {"type": "Point", "coordinates": [-122.338888, 37.80809]}
  },
  {
    "properties":
      {
        "name": "MSC CAMILLE",
        "natural": "peak",
        "featuretype": "vessel"
      },
    "geometry": {"type": "Point", "coordinates": [-122.314907, 37.79589]}
  },
  {
    "properties":
      {
        "name": "CAP SAN JUAN",
        "natural": "peak",
        "featuretype": "vessel"
      },
    "geometry": {"type": "Point", "coordinates": [-122.32005, 37.797217]}
  },
  {
    "properties":
      {
        "name": "NYK CONSTELLATION",
        "natural": "peak",
        "featuretype": "vessel"
      },
    "geometry": {"type": "Point", "coordinates": [-122.322752, 37.798085]}
  },
];

AFRAME.registerComponent('shipfinder', {
  init: function() {
    console.log('init shipfinder');
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
    this.scene.addEventListener("onefingermove", this.handleScroll.bind(this));
  },
  loadShips: function(longitude, latitude) {
    const scale = DEFAULT_SCALE;
    shipList
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
        this.el.appendChild(entity);
      });

    // for local demo only
    const text = document.createElement('a-text');
    ships.push(text);
    text.setAttribute('look-at', '[gps-projected-camera]');
    text.setAttribute('value', 'Hello\nThere');
    text.setAttribute('align', 'center');
    text.setAttribute('color', 'red');
    text.setAttribute('scale', {x: scale, y: scale, z: scale});
    text.setAttribute('gps-projected-entity-place', {
      latitude: latitude - 0.0209221,
      longitude: longitude - 0.025173
    });
    this.el.appendChild(text);
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
  handleScroll(event) {
    console.log('y position', ships[0].object3D.position.y);
    console.log(event.detail.positionChange.y)
    ships.forEach(ship => {
      const offset = event.detail.positionChange.y * 10000; // arbitrary to scale movement large enough
      const newPosition = ship.object3D.position.y - offset;
      ship.object3D.position.y = Math.min(
        Math.max(MINY, newPosition),
        MAXY
      );
    })
  },
});


function addDemoElements(pos, parentNode) {
  const demoPos = {
    latitude: pos.latitude - 0.00119,
    longitude: pos.longitude - 0.0005
  };


  const entity = document.createElement('a-sphere');
  entity.setAttribute('material', 'color: red');
  entity.setAttribute('position', '0 30 0');
  entity.setAttribute('scale', '10 10 10');
  entity.setAttribute('gps-projected-entity-place', {
    latitude: demoPos.latitude,
    longitude: demoPos.longitude
  });
  console.log('sphere demo is', entity, entity.getAttribute('gps-projected-entity-place'), entity.getAttribute('scale'), entity.getAttribute('position'), entity.getAttribute('material'));
  parentNode.appendChild(entity);


  // console.log('text demo is', text, text.getAttribute('gps-projected-entity-place'), text.getAttribute('scale'), text.getAttribute('position'), text.getAttribute('material'));
  // parentNode.appendChild(text);

    // <a-sphere gps-projected-entity-place='latitude: 21.28476974419701; longitude: -157.8382203975755;'
    //   material='color: red' scale='10 10 10' position='0 30 0'>
    // </a-sphere>
    // <a-text value="Hello There" look-at="[gps-projected-camera]" side="double" scale="50 50 50" position='30 0 0'
    //   gps-projected-entity-place="latitude: 21.28476974419701; longitude: -157.8382203975755;"></a-text>
}


AFRAME.registerComponent('demo', {
    init: function() {
        console.log('init demo');
        this.loaded = false;
        window.addEventListener('gps-camera-update-position', e => {
          const pos = e.detail.position;
          console.log('gps-camera-update-position', e, 'latlong', pos.latitude, pos.longitude);
          if(this.loaded === false) {
              addDemoElements(pos, this.el);
              this.loaded = true;
          }
        });
    }
});