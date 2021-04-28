const DEFAULT_SCALE = 1000;
const ships = [];
const MAXY = 5000;
const MINY = -2000; // don't know why, my ship text is getting cut off a little below this

const shipList = {
  "MATSONIA": {
    "properties":
      {
        "name": "MATSONIA",
        "featuretype": "vessel",
        "flex_ids": ["FLEX-2116397"],
        "coordinates_created_at": "2020-04-06 20:26:39 UTC"
      },
    "geometry": {"type": "Point", "coordinates": [-122.303163, 37.771927]}
  },
  "HORIZON SPIRIT": {
    "properties":
      {
        "name": "HORIZON SPIRIT",
        "featuretype": "vessel",
        "flex_ids": ["FLEX-2955952"],
        "coordinates_created_at": "2021-04-28 21:51:36 UTC"
      },
    "geometry": {"type": "Point", "coordinates": [-122.309135, 37.794527]}
  },
  "HYUNDAI MARS": {
    "properties":
      {
        "name": "HYUNDAI MARS",
        "featuretype": "vessel",
        "flex_ids":
          ["FLEX-2688450", "FLEX-2226946", "FLEX-2192919", "FLEX-2638504"],
        "coordinates_created_at": "2021-04-28 21:51:37 UTC"
      },
    "geometry": {"type": "Point", "coordinates": [-122.319997, 37.81328]}
  },
  "EVER LOYAL": {
    "properties":
      {
        "name": "EVER LOYAL",
        "featuretype": "vessel",
        "flex_ids": ["FLEX-2728285", "SUPERFLEX-123", "FLEX-1B13"],
        "coordinates_created_at": "2021-04-28 21:51:39 UTC"
      },
    "geometry": {"type": "Point", "coordinates": [-122.338878, 37.808062]}
  },
  "MSC CAMILLE": {
    "properties":
      {
        "name": "MSC CAMILLE",
        "featuretype": "vessel",
        "flex_ids":
          ["FLEX-2165217",
            "FLEX-2394763",
            "FLEX-2987096",
            "FLEX-2145898",
            "FLEX-2531357"],
        "coordinates_created_at": "2021-04-28 21:51:43 UTC"
      },
    "geometry": {"type": "Point", "coordinates": [-122.314917, 37.79589]}
  },
  "CAP SAN JUAN": {
    "properties":
      {
        "name": "CAP SAN JUAN",
        "featuretype": "vessel",
        "flex_ids": ["FLEX-2636550"],
        "coordinates_created_at": "2021-04-28 21:51:49 UTC"
      },
    "geometry": {"type": "Point", "coordinates": [-122.32, 37.796667]}
  },
  "NYK CONSTELLATION": {
    "properties":
      {
        "name": "NYK CONSTELLATION",
        "featuretype": "vessel",
        "flex_ids": ["FLEX-2573853", "FLEX-2081899"],
        "coordinates_created_at": "2021-04-28 21:52:10 UTC"
      },
    "geometry": {"type": "Point", "coordinates": [-122.322928, 37.798278]}
  },
  "Hello\nThere": {
    "properties": {
      "flex_ids": ["hello-flex"]
    }
  }
};

AFRAME.registerComponent('shipfinder', {
  init: function() {
    // console.log('init shipfinder');
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

    const toggle = document.createElement('button');
    toggle.innerText = 'Ships';
    toggle.style.position = 'fixed';
    toggle.style.bottom = '8px';
    toggle.style.left = '150px';
    toggle.onclick = this.toggleData.bind(this);
    document.body.appendChild(toggle);
  },
  loadShips: function(longitude, latitude) {
    const scale = DEFAULT_SCALE;
    Object.values(shipList).slice(0,-1)
      .forEach (ship => {
        const entity = document.createElement('a-text');
        ships.push(entity);
        entity.setAttribute('look-at', '[gps-projected-camera]');
        entity.setAttribute('value', ship.properties.name);
        entity.setAttribute('id', ship.properties.name);
        entity.setAttribute('align', 'center');
        entity.setAttribute('color', 'red');
        entity.setAttribute('scale', {
          x: scale,
          y: scale,
          z: scale
        });
        entity.setAttribute('gps-projected-entity-place', {
          latitude: ship.geometry.coordinates[1],
          longitude: ship.geometry.coordinates[0]
        });
        this.el.appendChild(entity);
      });

    // for local demo only
    const text = document.createElement('a-text');
    ships.push(text);
    text.setAttribute('look-at', '[gps-projected-camera]');
    text.setAttribute('value', 'Hello\nThere');
    text.setAttribute('id', 'Hello\nThere');
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
    // console.log('trying to scale', this.scaleFactor, event.detail.spreadChange, event.detail.startSpread)
    this.scaleFactor = this.scaleFactor || DEFAULT_SCALE;
    this.scaleFactor *=
      1 + event.detail.spreadChange / event.detail.startSpread;

    this.scaleFactor = Math.min(
      Math.max(this.scaleFactor, DEFAULT_SCALE/2),
      DEFAULT_SCALE*2
    );

    // console.log("scaling of some sort", this.scaleFactor)
    ships.forEach(node => {
      node.object3D.scale.set(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    });
  },
  handleScroll(event) {
    // console.log('y position', ships[0].object3D.position.y);
    // console.log(event.detail.positionChange.y)
    ships.forEach(ship => {
      const offset = event.detail.positionChange.y * 10000; // arbitrary to scale movement large enough
      const newPosition = ship.object3D.position.y - offset;
      ship.object3D.position.y = Math.min(
        Math.max(MINY, newPosition),
        MAXY
      );
    })
  },
  toggleData(event) {
    const wasShipmentsMode = event.target.innerText === 'Shipments';
    event.target.innerText = wasShipmentsMode ? 'Ships' : 'Shipments';
    ships.forEach(ship => {
      const shipName = ship.getAttribute('id');
      const text = wasShipmentsMode ? shipName : shipmentsText(shipName);
      ship.setAttribute('value', text);
    })
  }
});

const shipmentsText = (name) => {
  return shipList[name].properties.flex_ids.join('\n')
};

// function addDemoElements(pos, parentNode) {
//   const demoPos = {
//     latitude: pos.latitude - 0.00119,
//     longitude: pos.longitude - 0.0005
//   };
//
//
//   const entity = document.createElement('a-sphere');
//   entity.setAttribute('material', 'color: red');
//   entity.setAttribute('position', '0 30 0');
//   entity.setAttribute('scale', '10 10 10');
//   entity.setAttribute('gps-projected-entity-place', {
//     latitude: demoPos.latitude,
//     longitude: demoPos.longitude
//   });
  // console.log('sphere demo is', entity, entity.getAttribute('gps-projected-entity-place'), entity.getAttribute('scale'), entity.getAttribute('position'), entity.getAttribute('material'));
  // parentNode.appendChild(entity);


  // console.log('text demo is', text, text.getAttribute('gps-projected-entity-place'), text.getAttribute('scale'), text.getAttribute('position'), text.getAttribute('material'));
  // parentNode.appendChild(text);

    // <a-sphere gps-projected-entity-place='latitude: 21.28476974419701; longitude: -157.8382203975755;'
    //   material='color: red' scale='10 10 10' position='0 30 0'>
    // </a-sphere>
    // <a-text value="Hello There" look-at="[gps-projected-camera]" side="double" scale="50 50 50" position='30 0 0'
    //   gps-projected-entity-place="latitude: 21.28476974419701; longitude: -157.8382203975755;"></a-text>
// }


// AFRAME.registerComponent('demo', {
//     init: function() {
//         // console.log('init demo');
//         this.loaded = false;
//         window.addEventListener('gps-camera-update-position', e => {
//           const pos = e.detail.position;
//           // console.log('gps-camera-update-position', e, 'latlong', pos.latitude, pos.longitude);
//           if(this.loaded === false) {
//               addDemoElements(pos, this.el);
//               this.loaded = true;
//           }
//         });
//     }
// });