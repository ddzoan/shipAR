AFRAME.registerComponent("drawusercoordinates", {
  init: function () {
    console.log(this);
    var reporterIds = ["lat", "lng", "alt"];
    for (var x = 0; x < reporterIds.length; x++) {
      var elem = document.createElement("div");
      elem.id = "report" + reporterIds[x];
      elem.style.color = "white";
      elem.style.textShadow = "0px 0px 2px black";
      elem.style.position = "fixed";
      elem.style.bottom = 8 + 14 * x + "px";
      document.body.appendChild(elem);
    }
    window.addEventListener("gps-camera-update-position", (e) => {
      var pos = {
        lat: e.detail.position?.latitude?.toFixed(8),
        lng: e.detail.position?.longitude?.toFixed(8),
        alt: e.detail.position?.altitude?.toFixed(8),
      };
      for (var x = 0; x < reporterIds.length; x++) {
        document.getElementById(reporterIds[x]).innerText = pos[reporterIds[x]];
      }
    });
  },
});
