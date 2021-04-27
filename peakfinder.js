AFRAME.registerComponent('peakfinder', {
  init: function() {
    this.loaded = false;
    window.addEventListener('gps-camera-update-position', e => {
      if(this.loaded === false) {
        this._loadPeaks(e.detail.position.longitude, e.detail.position.latitude);
        // this._loadPeaks("122.4194", "37.7749");
        this.loaded = true;
      }
    });
  },
  _loadPeaks: function(longitude, latitude) {
    console.log({longitude, latitude});
    const scale = 2000;
    fetch(`https://www.hikar.org/fm/ws/bsvr.php?bbox=${longitude-0.1},${latitude-0.1},${longitude+0.1},${latitude+0.1}&outProj=4326&format=json&poi=natural`
    )
      .then ( response => response.json() )
      .then ( json => {
        // json.features.filter ( f => f.properties.natural == 'peak' )
        //   .forEach ( peak => {
        //     const entity = document.createElement('a-text');
        //     entity.setAttribute('look-at', '[gps-projected-camera]');
        //     entity.setAttribute('value', peak.properties.name);
        //     entity.setAttribute('scale', {
        //       x: scale,
        //       y: scale,
        //       z: scale
        //     });
        //     entity.setAttribute('gps-projected-entity-place', {
        //       latitude: peak.geometry.coordinates[1],
        //       longitude: peak.geometry.coordinates[0]
        //     });
        //     this.el.appendChild(entity);
        //   });
        [["122.4394", "37.7949"]].forEach(([longitude, latitude]) => {
          const entity = document.createElement('a-text');
          entity.setAttribute('look-at', '[gps-projected-camera]');
          entity.setAttribute('value', "whatever");
          entity.setAttribute('scale', {
            x: scale,
            y: scale,
            z: scale
          });
          entity.setAttribute('gps-projected-entity-place', {
            latitude,
            longitude
          });
          this.el.appendChild(entity);
        });
      })
      // });
  }
});